export const randomKey = '019438ac-0522-4b0e-';
 
export const getPlayersKeys = names => {
    return names.map((item, ind) => {
        const id = randomKey + (ind + 1);
        return {
            id: id,
            name: item,
        };
    });
};
 
export const initialGameObject = (players, game, url, rounds = 21) => {
    const playersKeys = getPlayersKeys(players);
 
    return {
        url: url,
        game: game,
        round: 0,
        maxRound: playersKeys.length * 3 * rounds,
        players: playersKeys,
        scorer: {
            userId: playersKeys[0].id,
            board: playersKeys.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    turn: 1,
                    score: 0,
                    valid_points: {
                        15: 0,
                        16: 0,
                        17: 0,
                        18: 0,
                        19: 0,
                        20: 0,
                        25: 0,
                    },
                    throws: [],
                };
            }),
        },
        currentUser: playersKeys[0],
        isThereWinner: false,
        winner: {},
        finished: false,
    };
};
 
// ─── helpers ────────────────────────────────────────────────────────────────
 
const CRICKET_NUMBERS = [15, 16, 17, 18, 19, 20, 25];
 
/** Czy dany numer jest zamknięty przez konkretnego gracza (>= 3 trafienia) */
const isNumberClosedFor = (player, number) => {
    return (player.valid_points[number] ?? 0) >= 3;
};
 
/** Czy dany numer jest zamknięty przez WSZYSTKICH graczy */
const isNumberClosedForEveryone = (board, number) => {
    return board.every(player => isNumberClosedFor(player, number));
};
 
/** Czy gracz zamknął WSZYSTKIE numery */
const isEveryValidPointClosedFor = player => {
    return CRICKET_NUMBERS.every(n => (player.valid_points[n] ?? 0) >= 3);
};
 
const setNextPlayer = game => {
    const currentIndex = game.players.findIndex(item => item.id === game.currentUser.id);
    const nextUser = game.players[currentIndex + 1] || game.players[0];
    game.currentUser = nextUser;
    game.scorer.userId = nextUser.id;
};
 
// ─── winner logic ────────────────────────────────────────────────────────────
 
/**
 * Zwycięzca w Cricket:
 * - zamknął wszystkie numery
 * - ma najniższy (lub równy 0) wynik punktowy
 */
const calculateWinner = game => {
    const board = game.scorer.board;
 
    // Znajdź graczy, którzy zamknęli wszystkie numery
    const closedAll = board.filter(isEveryValidPointClosedFor);
 
    const candidates = closedAll.length > 0 ? closedAll : board;
 
    const minScore = Math.min(...candidates.map(p => p.score));
    const winners = candidates.filter(p => p.score === minScore);
 
    return winners.length === 1 ? winners[0] : winners;
};
 
const checkWinner = game => {
    const board = game.scorer.board;
 
    // Wygrywa ten, kto zamknął wszystkie numery i ma najniższy lub zerowy wynik
    const winner = board.find(player => {
        if (!isEveryValidPointClosedFor(player)) return false;
        // Sprawdź czy żaden inny gracz nie ma niższego wyniku
        const othersMinScore = board
            .filter(p => p.id !== player.id)
            .reduce((min, p) => Math.min(min, p.score), Infinity);
        return player.score <= othersMinScore;
    });
 
    return winner || null;
};
 
// ─── scoring logic ───────────────────────────────────────────────────────────
 
/**
 * Obsługuje pojedyncze trafienie w dany numer.
 * Zwraca liczbę "nadmiarowych" trafień, które mogą generować punkty.
 */
const registerHit = (player, number) => {
    const current = player.valid_points[number] ?? 0;
    const newValue = current + 1;
    player.valid_points[number] = Math.min(newValue, 3); // max 3 zapamiętujemy
 
    // Nadmiarowe trafienia (powyżej 3) generują punkty
    const overflow = Math.max(0, newValue - 3);
    return overflow;
};
 
/**
 * Przetwarza jedno trafienie gracza.
 * score     – wartość pola (15–20 lub 25)
 * multiplier – 1 (single), 2 (double), 3 (triple)
 */
const processSingleThrow = (game, playingUser, score, multiplier = 1) => {
    if (!CRICKET_NUMBERS.includes(score)) return; // ignoruj numery spoza Cricket
 
    const board = game.scorer.board;
 
    for (let i = 0; i < multiplier; i++) {
        const overflow = registerHit(playingUser, score);
 
        // Jeśli numer jest już zamknięty przez WSZYSTKICH – brak punktów dla kogokolwiek
        if (isNumberClosedForEveryone(board, score)) continue;
 
        // Nadmiarowe trafienia = punkty dla gracza (jeśli numer nie jest zamknięty przez wszystkich)
        if (overflow > 0) {
            playingUser.score += score;
        }
    }
};
 
// ─── main export ─────────────────────────────────────────────────────────────
 
/**
 * Wykonuje turę gracza.
 *
 * score     – trafiony numer (15, 16, 17, 18, 19, 20, 25) lub 0 (pudło)
 * multiplier – krotność trafienia: 1 (single), 2 (double), 3 (triple)
 * realValue  – opcjonalna etykieta do zapisu w historii rzutów
 */
export function playCricketTurn(game, score, multiplier = 1, realValue = false) {
    if (game.finished) return game;
 
    // Koniec rund – wyłaniamy zwycięzcę
    if (game.round >= game.maxRound) {
        game.isThereWinner = true;
        game.winner = calculateWinner(game);
        game.finished = true;
        return game;
    }
 
    const playingUser = game.scorer.board.find(item => item.id === game.currentUser.id);
 
    // Zapisz rzut w historii
    if (realValue) {
        playingUser.throws = [...playingUser.throws, realValue];
    }
 
    // Obsłuż trafienie (score === 0 to pudło – nic nie robimy poza zapisem tury)
    if (score !== 0) {
        processSingleThrow(game, playingUser, score, multiplier);
    }
 
    // Sprawdź wygranego po każdym rzucie
    const winner = checkWinner(game);
    if (winner) {
        game.isThereWinner = true;
        game.winner = winner;
        game.finished = true;
        return game;
    }
 
    // Przejdź do następnego rzutu / gracza
    playingUser.turn += 1;
 
    if (playingUser.turn > 3) {
        playingUser.turn = 1;
        setNextPlayer(game);
        game.round += 1;
    }
 
    return game;
}