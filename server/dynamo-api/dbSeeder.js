require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { mapGamesData } = require('./mappers');

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

async function insertValues(tableName, values) {
  for (const value of values) {
    const params = {
      TableName: tableName,
      Item: {...value, nameLower: value.name.toLowerCase()}
    };

    try {
      await dynamoDB.put(params).promise();
      console.log(`Successfully inserted in ${tableName} with id: ${value.id}`);
    } catch (err) {
      console.error(`Error inserting in ${tableName} with id: ${value.id}`, err);
    }
  }
}

// Function to seed data
const seedDatabase = async () => {
  const filePath = path.join(__dirname, 'games.json');
  const games = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  await insertValues('Games', games);

  const {categories, features, providers, themes} = mapGamesData(games);

  await insertValues('Categories', categories);
  await insertValues('Features', features);
  await insertValues('Providers', providers);
  await insertValues('Themes', themes);

};

seedDatabase().then(() => {
  console.log('Database seeding completed.');
}).catch((err) => {
  console.error('Error during seeding:', err);
});


