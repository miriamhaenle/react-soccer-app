import { useState } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as Football } from './assets/football.svg';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';

function App() {
  const [players, setPlayers] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  console.log(shoppingCart);

  function addPlayer(player) {
    setPlayers([...players, player]);
  }

  function addToShoppingCart(playerToAdd) {
    setShoppingCart([...shoppingCart, playerToAdd]);
  }

  return (
    <div>
      <Header>
        <h1>German Fußball Transfer Market</h1>
        <Football />
      </Header>
      <Grid>
        <PlayerForm onAddPlayer={addPlayer} />
        <Players>
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              player={player}
              onAddToShoppingCart={addToShoppingCart}
            />
          ))}
        </Players>
      </Grid>
    </div>
  );
}

export default App;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  svg {
    width: 3rem;
    margin-right: 0.7rem;
  }

  svg:hover {
    transform: rotate(45deg);
  }

  svg path.st25 {
    fill: hsl(340, 60%, 50%);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  gap: 1rem;
  justify-content: center;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
