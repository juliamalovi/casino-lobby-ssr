import React from 'react';
import { Container, styled, Typography } from '@mui/material';
import { Category, Feature, Game, GameProvider, GameTheme } from '@shared/types';
import Carousel from './components/Carousel';
import GamesWrapper from './components/GamesWrapper';

const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(4),
  fontWeight: 'bold',
}));

export interface AppProps {
  gamesInitial: Game[];
  totalPagesInitial: number;
  categoriesInitial: Category[];
  featuresInitial: Feature[];
  themesInitial: GameTheme[];
  providersInitial: GameProvider[];
}

const App: React.FC = () => {
  return (
    <>
      <StyledTitle variant="h3">
        Casino Games Lobby
      </StyledTitle>
      <Carousel />
      <Container>
        <GamesWrapper />
      </Container>
    </>
  );
};

export default App;