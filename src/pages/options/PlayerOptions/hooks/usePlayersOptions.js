import { APP_ROUTES, AppSettings } from 'AppSetting';
import useDarts from 'hooks/useDarts';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInitialGameStateByGame } from 'services/game.chooser.service';
import playerService from '../services/players.service';

export default function usePlayersOptions() {
    const { num, game } = useParams();
    const navigate = useNavigate();
    const { updateDartsGameData } = useDarts();
    const initialPlayersState = playerService.getPlayersInitialState(num);

    const [players, setPlayers] = useState(initialPlayersState);

    const MAX_NAME_LENGTH = 20;

    const curriedOnChange = playerIndex => event => {
        const value = event.target.value.slice(0, MAX_NAME_LENGTH);

        setPlayers(prevPlayers => ({
            ...prevPlayers,
            [playerIndex]: value,
        }));
    };

    const validatePlayers = playersValues => {
        return playersValues.every(player => player.length > 0);
    };

    const getGameRoute = game => { 
        if (game !== 'cricket' && game !== AppSettings.CRICKET_ALL_NUMBERS) {
            return APP_ROUTES.GAMES.X01.replace(':game', game);
        }

        if (game === AppSettings.CRICKET_ALL_NUMBERS) {
            return APP_ROUTES.GAMES.CRICKET_ALL_NUMBERS.replace(':game', 'cricket');
        }
        
        return APP_ROUTES.GAMES.CRICKET.replace(':game', game);
    };

    const onSubmit = e => {
        e.preventDefault();
        const playersValues = Object.values(players).map(player => player.trim());
        if (!validatePlayers(playersValues)) return;

        const gameRoute = getGameRoute(game);
        const gameStep = APP_ROUTES.GAMES.PARENT.replace('/*', gameRoute);
        const gameChooser = getInitialGameStateByGame(game);

        const initialObject = gameChooser(playersValues, game, gameStep);
        updateDartsGameData(initialObject);
        navigate(gameStep);
    };

    return {
        players: Object.entries(players).map(([key, value]) => ({
            index: key,
            name: value,
        })),
        curriedOnChange,
        validatePlayers,
        onSubmit,
    };
}
