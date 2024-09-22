import React from 'react';
import { Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { Category, Game } from '@shared/types';

const BACKGROUND_FALLBACK = "https://img.freepik.com/premium-photo/casino-games-dark-golden-backdrop-with-copy-space_1426-5061.jpg";

interface GameCardProps {
    game: Game;
    selectCategory: (categoryId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, selectCategory }) => {
    return (
        <Card>
            <CardMedia
                component="div"
                sx={{
                    height: 140,
                    backgroundImage: `url(${game.background || BACKGROUND_FALLBACK})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {game.name}
                </Typography>
                {game.categories.map((category: Category) => (
                    <Chip
                        key={category.id}
                        label={category.name}
                        size="small"
                        style={{ marginRight: '8px' }}
                        onClick={() => selectCategory(category.id)}
                    />
                ))}
            </CardContent>
        </Card>
    )
}

export default GameCard