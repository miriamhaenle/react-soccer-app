import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PlayerForm from './components/PlayerForm';
import PlayerCard from './components/PlayerCard';
import ShopingCart from './pages/ShoppingCart';
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
      <Header numberOfShoppingCartItems={shoppingCart.length} />
      <Switch>
        <Route exact path="/">
          <Home players={players} onAddToShoppingCart={addToShoppingCart} />
        </Route>
        <Route path="/addplayer">
          <PlayerForm onAddPlayer={addPlayer} />
        </Route>
        <Route path="/cart">
          <ShopingCart shoppingItems={shoppingCart} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
