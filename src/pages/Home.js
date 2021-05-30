import styled from 'styled-components';
import PlayerCard from '../components/PlayerCard';

export default function Home({ players, onAddToShoppingCart }) {
  return (
    <Players>
      {players.map((player, index) => (
        <PlayerCard
          key={index}
          player={player}
          onAddToShoppingCart={onAddToShoppingCart}
        />
      ))}
    </Players>
  );
}

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
