import useDarts from 'hooks/useDarts';
import { useCallback, useMemo } from 'react';
import { CricketService } from '../services/class.games.cricket.service';

export default function useCricket() {
    const { darts, updateDartsGameData, deleteGame } = useDarts();

    const cricketService = useMemo(() => new CricketService(darts), [darts]);

    const onButtonClick = useCallback(
        (score, realValue) => {
            const newPlayed = cricketService.playCricketTurn(darts, score, realValue);
            updateDartsGameData({ ...darts, ...newPlayed });
        },
        [darts, updateDartsGameData, cricketService],
    );

    return {
        darts,
        onButtonClick,
        deleteGame,
    };
}
