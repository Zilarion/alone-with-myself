import { Game } from '../models/Game';

const game = new Game();

export function useGame() {
    return game;
}
