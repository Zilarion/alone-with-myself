

import { NavBar } from '../components/NavBar';
import { Game } from '../models';
import styled from '../themed-components';
import { Routes } from './Routes';

const Content = styled.div`
    position: relative;
`;

export function View() {
    const game = new Game();
    return <div>
        <NavBar />
        <Content>
            <Routes game={game} />
        </Content>
    </div>;
}
