import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import ScoreBoard from "./components/ScoreCard.jsx";
import CardGrid from "./components/CardGrid.jsx";

function shuffleCards(cardArray) {

    const shuffled = [...cardArray];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const randomIndex =
            Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] =
            [shuffled[randomIndex], shuffled[i]];
    }

    return shuffled;
}

async function fetchPokemon() {

    const pokemonIds = [
        1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,
        39, 52, 54, 133
    ];

    const requests = pokemonIds.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(response => response.json())
    );

    const data = await Promise.all(requests);

    return data.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        image:
            pokemon.sprites.other["official-artwork"]
                .front_default
    }));
}

export default function App() {

    const [cards, setCards] = useState([]);

    const [score, setScore] = useState(0);

    const [bestScore, setBestScore] = useState(0);

    const [clickedCards, setClickedCards] = useState([]);

    const [loading, setLoading] = useState(true);

    const [gameOver, setGameOver] = useState(false);


    useEffect(() => {

        async function loadCards() {

            try {

                setLoading(true);

                const data = await fetchPokemon();

                setCards(shuffleCards(data));

            } catch (error) {

                console.error(
                    "Failed to fetch Pokémon:",
                    error
                );

            } finally {

                setLoading(false);
            }
        }

        loadCards();

    }, []);


    function handleCardClick(card) {

        if (gameOver) {
            return;
        }

        const alreadyClicked =
            clickedCards.includes(card.id);

        if (alreadyClicked) {

            setGameOver(true);

            return;
        }

        const newClickedCards = [
            ...clickedCards,
            card.id
        ];

        setClickedCards(newClickedCards);

        const newScore = score + 1;

        setScore(newScore);

        if (newScore > bestScore) {
            setBestScore(newScore);
        }

        setCards(prevCards =>
            shuffleCards(prevCards)
        );
    }


    function restartGame() {

        setScore(0);

        setClickedCards([]);

        setGameOver(false);

        setCards(prevCards =>
            shuffleCards(prevCards)
        );
    }


    if (loading) {

        return (
            <div className="loading">
                <h2>Loading Pokémon...</h2>
            </div>
        );
    }


    return (
        <main>

            <Header />

            <ScoreBoard
                score={score}
                bestScore={bestScore}
            />

            {gameOver && (
                <div className="game-message">

                    <h2>Game Over!</h2>

                    <p>
                        You scored {score}
                    </p>

                    <button onClick={restartGame}>
                        New Game
                    </button>

                </div>
            )}

            {!gameOver && (
                <CardGrid
                    cards={cards}
                    onCardClick={handleCardClick}
                />
            )}

        </main>
    );
}