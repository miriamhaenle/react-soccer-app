import styled from 'styled-components';
import { ReactComponent as Football } from './assets/football.svg';

export default function PlayerCard({ player, onAddToShoppingCart }) {
  return (
    <Card>
      <Football onClick={() => onAddToShoppingCart(player)} />
      <h3>{player.name}</h3>
      <p>{player.price}</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
      <a href={`mailto:${player.email}`}>{player.email}</a>
    </Card>
  );
}
// are you though?

const Card = styled.article`
  background: hsl(160, 60%, 50%);
  border-radius: 0.4rem;
  color: hsl(160, 96%, 96%);
  padding: 1.2rem 1rem;
  height: 12rem;
  min-width: calc((100% - 2rem) / 3);
  position: relative;

  svg {
    width: 2.4rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  h3 {
    margin-top: 0;
  }

  p {
    margin: 0.3rem 0;
  }

  a {
    color: hsl(160, 10%, 20%);
  }
`;
