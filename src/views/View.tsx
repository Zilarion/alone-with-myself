import styled from '@emotion/styled';
import { createContext } from 'react';

import { NavBar } from '../components/NavBar';
import { Game } from '../models/Game';
import { Routes } from './Routes';

const Content = styled.div`
    position: relative;
`;

const game = new Game();
export const GameContext = createContext(game);

export const View = () => {
    return <div>
        <GameContext.Provider value={game}>
            <NavBar />
            <Content>
                <Routes />
            </Content>
        </GameContext.Provider>
    </div>;
};
