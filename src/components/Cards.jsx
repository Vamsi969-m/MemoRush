export default function Cards({ card, onClick }) {
    return (
        <button type="button" className="card" onClick={() => onClick(card)}>
            <img src={card.image} alt={card.name} />
            <h3>{card.name}</h3>
        </button>
    );
}