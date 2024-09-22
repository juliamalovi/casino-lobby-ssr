import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import express from 'express';
import { GameState, setInitialGames } from '../src/store/gameSlice';
import { ExternalGame } from './types';
import store from '../src/store';
import { Feature, GameProvider, GameTheme, Category, GamesRequest, GamesResponse } from '../shared/types';
import App from '../src/App';
import generateClient from './GenerateClient';
import { Provider } from 'react-redux';
import React from 'react';
import { filterData, LIMIT_GAMES_PER_PAGE, mapGameFromDbForFrontend } from './utils';

dotenv.config();

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./public', {
    index: false,
}));

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use('/server-build', express.static('./server-build'));

app.get('/', async (req, res) => {
    const gamesParams = {
        TableName: 'Games',
        Limit: 12,
    };

    const totalCountParams = {
        TableName: 'Games',
        Select: 'COUNT',
    };

    const categoriesParams = {
        TableName: 'Categories',
    };

    const providersParams = {
        TableName: 'Providers',
    };

    const themesParams = {
        TableName: 'Themes',
    };

    const featuresParams = {
        TableName: 'Features',
    };

    try {
        const gamesData = await dynamoDB.scan(gamesParams).promise();
        const categoriesData = await dynamoDB.scan(categoriesParams).promise();
        const providersData = await dynamoDB.scan(providersParams).promise();
        const themesData = await dynamoDB.scan(themesParams).promise();
        const featuresData = await dynamoDB.scan(featuresParams).promise();
        const totalCountData = await dynamoDB.scan(totalCountParams).promise();
        const totalGames = totalCountData.Count || 0;
        const totalPagesInitial = Math.ceil(totalGames / LIMIT_GAMES_PER_PAGE);

        const categoriesInitial = (categoriesData.Items || []) as Category[];
        const providersInitial = (providersData.Items || []) as GameProvider[];
        const themesInitial = (themesData.Items || []) as GameTheme[];
        const featuresInitial = (featuresData.Items || []) as Feature[];
        const initialPayload: GameState = {
            gamesInitial: mapGameFromDbForFrontend((gamesData.Items || []) as ExternalGame[]),
            categoriesInitial,
            providersInitial,
            themesInitial,
            featuresInitial,
            totalPagesInitial
        };

        store.dispatch(setInitialGames(initialPayload));

        const clientString = await generateClient(<Provider store={store}>
            <App />
        </Provider>,
            initialPayload
        )
        return res.send(clientString);
    } catch (error) {
        console.error('Error fetching initial data:', error);
        res.status(500).json({ error: 'Could not fetch initial data' });
    }
});

const joinFilterExpressions = (expressions: string[]) => {
    return expressions.length > 0 ? expressions.join(' AND ') : undefined;
  };

app.get('/api/games', async (req: express.Request<{}, {}, {}, GamesRequest>, res: express.Response<GamesResponse | { error: string }>) => {
    const { page = 1, search, providers, category } = req.query;
    const offset = (page - 1) * LIMIT_GAMES_PER_PAGE;

    const filterExpressions: string[] = [];
    const expressionAttributeValues: { [key: string]: any } = {};
    const expressionAttributeNames: { [key: string]: string } = {};

    if (search) {
        filterExpressions.push('contains(#name, :searchTerm)');
        expressionAttributeValues[':searchTerm'] = search.toLowerCase();
        expressionAttributeNames['#name'] = 'nameLower';
    }

    if (category) {
        filterExpressions.push('contains(#categories, :categoryId)');
        expressionAttributeValues[':categoryId'] = category;
        expressionAttributeNames['#categories'] = 'categories';
    }

    if (providers && providers.length > 0) {
        const providersArray = Array.isArray(providers) ? providers : [providers];
        const placeholders = providersArray.map((_, index) => `:providerId${index}`).join(', ');
        const expression = `#provider IN (${placeholders})`;
        filterExpressions.push(expression);
        
        providersArray.forEach((providerId, index) => {
          expressionAttributeValues[`:providerId${index}`] = providerId;
        });
        
        expressionAttributeNames['#provider'] = 'provider';
      }

    const params = {
        TableName: 'Games',
        FilterExpression: joinFilterExpressions(filterExpressions),
        ExpressionAttributeNames: Object.keys(expressionAttributeNames).length ? expressionAttributeNames : undefined,
        ExpressionAttributeValues: Object.keys(expressionAttributeValues).length ? expressionAttributeValues : undefined,
    };

    try {
        const gamesData = await dynamoDB.scan(params).promise();
        const filteredData = filterData(gamesData, req.query);
        const games = mapGameFromDbForFrontend(filteredData, offset);

        const totalGames = filteredData.length || 0;
        const totalPages = Math.ceil(totalGames / LIMIT_GAMES_PER_PAGE);
        res.status(200).json({
            games: games,
            totalPages,
        });
    } catch (error) {
        const err = error as NodeJS.ErrnoException;
        console.error('Error fetching games:', err);
        return res.status(500).send({ error: 'Could not fetch games, please try again!' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
