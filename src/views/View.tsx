import styled from '@emotion/styled';
import { createContext } from 'react';

import { Card } from '../components/Card';
import { NavBar } from '../components/NavBar';
import { Sidebar } from '../components/Sidebar';
import { Game } from '../models/Game';
import { Routes } from './Routes';

const game = new Game();
export const GameContext = createContext(game);

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: ${p => p.theme.spacing(4)}px;
    padding: ${p => p.theme.spacing(4)}px;
    box-sizing: border-box;
`;

const Content = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: ${p => p.theme.spacing(4)}px;
`;

export const View = () => {
    return <GameContext.Provider value={game}>
        <Wrapper>
            <Sidebar />
            <Content>
                <NavBar />
                <Card>
                    <Routes />
                </Card>
            </Content>
        </Wrapper>
    </GameContext.Provider>;
};
