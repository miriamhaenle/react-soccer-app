import styled from 'styled-components';
import { ReactComponent as Football } from '../assets/football.svg';
import { ReactComponent as Pen } from '../assets/pencil.svg';

export default function PlayerCard({
  player,
  onAddToShoppingCart,
  onDeletePlayer,
  onOpenEditModal,
}) {
  return (
    <Card>
      <DeleteFunction onClick={() => onDeletePlayer(player)}>
        &times;
      </DeleteFunction>
      <ShoppingCart onClick={() => onAddToShoppingCart(player)}>
        <Football />
      </ShoppingCart>
      <h3>
        {player.name}
        <span onClick={() => onOpenEditModal(player)}>
          <StyledPen />
        </span>
      </h3>
      <p>{player.price}</p>
      <p>{player.club}</p>
      <p>{player.position}</p>
      <a href={`mailto:${player.email}`}>{player.email}</a>
    </Card>
  );
}

const Card = styled.article`
  background: hsl(160, 60%, 50%);
  border-radius: 0.4rem;
  color: hsl(160, 96%, 96%);
  padding: 1.2rem 1rem;
  height: 12rem;
  min-width: calc((100% - 2rem) / 3);
  position: relative;

  h3 {
    margin-top: 0;
    position: relative;
  }

  p {
    margin: 0.3rem 0;
  }

  a {
    color: hsl(160, 10%, 20%);
  }
`;

const DeleteFunction = styled.span`
  position: absolute;
  top: 0.7rem;
  right: 3.3rem;
  color: hsl(340, 60%, 50%);
  font-size: 1.3rem;
  cursor: pointer;
`;

const StyledPen = styled(Pen)`
  transform: scale(0.5);
  position: absolute;
  top: -1rem;
`;

const ShoppingCart = styled(Football)`
  width: 2.4rem;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;
