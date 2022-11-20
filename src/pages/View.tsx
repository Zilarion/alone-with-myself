import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { createContext } from 'react';

import { HeaderNavigation } from '../components/HeaderNavigation';
import { NavigationRail } from '../components/NavigationRail';
import { Game } from '../models/Game';
import { ApplicationRoutes } from './ApplicationRoutes';

const game = new Game();
export const GameContext = createContext(game);

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 100%;
    box-sizing: border-box;
    height: 100%;
`;

const Content = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const ContentCard = styled(Card)`
    height: 100%;
    border-radius: 4px 0 0 4px;
    flex: 1;
`;

export const View = () => {
    return <GameContext.Provider value={game}>
        <Wrapper>
            <NavigationRail />
            <Content>
                <HeaderNavigation />
                <ContentCard>
                    <ApplicationRoutes />
                </ContentCard>
            </Content>
        </Wrapper>
    </GameContext.Provider>;
};
