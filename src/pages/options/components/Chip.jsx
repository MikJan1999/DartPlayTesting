export default function Chip({ value, current, onClick, type }) {
    const isActive = current === value;

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isActive}
            className={`chip number ${isActive ? 'active' : ''}`}
            onClick={() => onClick(type, value)}
        >
            {value}
        </button>
    );
}
