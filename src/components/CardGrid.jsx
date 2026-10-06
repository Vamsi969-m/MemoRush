import Cards from "./Cards.jsx";

export default function CardGrid({ cards, onCardClick }) {
    return (
        <div className="card-grid">
            {cards.map((card) => (
                <Cards key={card.id} card={card} onClick={onCardClick} />
            ))}
        </div>
    );
}