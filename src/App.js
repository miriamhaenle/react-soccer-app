import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Switch, Route, NavLink } from 'react-router-dom';
import { ReactComponent as Football } from './assets/football.svg';
import PlayerForm from './PlayerForm';
import PlayerCard from './PlayerCard';
import ShopingCart from './ShoppingCart';
import { saveToLocal, loadFromLocal } from './lib/localStorage';

function App() {
  const [players, setPlayers] = useState(
    loadFromLocal('footballPlayers') ?? []
  );
  const [shoppingCart, setShoppingCart] = useState(
    loadFromLocal('shoppingCart') ?? []
  );

  useEffect(() => {
    saveToLocal('footballPlayers', players);
  }, [players]);

  useEffect(() => {
    saveToLocal('shoppingCart', shoppingCart);
  }, [shoppingCart]);

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
        <NavLink to="/">
          <h1>German Fußball Transfer Market</h1>
        </NavLink>
        <NavLink to="/cart">
          <Football /> {shoppingCart.length} items
        </NavLink>
      </Header>

      <Switch>
        <Route exact path="/">
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
        </Route>
        <Route path="/cart">
          <ShopingCart shoppingItems={shoppingCart} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const Header = styled.header`
  display: flex;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: hsl(340, 10%, 5%);
  }

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
