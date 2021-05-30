import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PlayerForm from './components/PlayerForm';
import ShoppingCart from './pages/ShoppingCart';
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
    <>
      <Header numberOfShoppingCartItems={shoppingCart.length} />
      <main>
        <Switch>
          <Route exact path="/">
            <Home players={players} onAddToShoppingCart={addToShoppingCart} />
          </Route>
          <Route path="/addplayer">
            <PlayerForm onAddPlayer={addPlayer} />
          </Route>
          <Route path="/cart">
            <ShoppingCart shoppingItems={shoppingCart} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
