import { useContext } from 'react';

import { GameContext } from '../views/View';

export function useGame() {
    return useContext(GameContext);
}
