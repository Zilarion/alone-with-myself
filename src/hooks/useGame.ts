import { useContext } from 'react';

import { GameContext } from '../pages/View';

export function useGame() {
    return useContext(GameContext);
}
