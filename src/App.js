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
  const [clubs, setClubs] = useState(loadFromLocal('footballClubs') ?? []);
  const [isShowingEditModal, setIsShowingEditModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/clubs')
      .then((result) => result.json())
      .then((clubs) => setClubs(clubs))
      .catch((error) => console.error(error.message));

    fetch('http://localhost:4000/players')
      .then((result) => result.json())
      .then((apiPlayers) => setPlayers(apiPlayers))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    saveToLocal('footballPlayers', players);
  }, [players]);

  useEffect(() => {
    saveToLocal('shoppingCart', shoppingCart);
  }, [shoppingCart]);

  useEffect(() => {
    saveToLocal('footballClubs', clubs);
  }, [clubs]);

  function addPlayer(player) {
    fetch('http://localhost:4000/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: player.name,
        price: player.price,
        free_transfer: player.free_transfer,
        club: player.club,
        position: player.position,
        skills: player.skills,
        email: player.email,
      }),
    })
      .then((result) => result.json())
      .then((player) => setPlayers([...players, player])) // TODO: Add a success note on top of the form
      .catch((error) => console.log(error.message)); // reicht ausloggen?
  }

  function addToShoppingCart(playerToAdd) {
    setShoppingCart([...shoppingCart, playerToAdd]);
  }

  function deletePlayer(playerToDelete) {
    console.log(playerToDelete);
    const remainingPlayers = players.filter(
      (player) => player._id !== playerToDelete._id
    );
    setPlayers(remainingPlayers);

    fetch(`http://localhost:4000/players/${playerToDelete._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    /*  .then((result) => result.json())
      .then(setPlayers(remainingPlayers)) */ //wie stell ich sicher, dass die remainingplayers erst dann gesetzt werden, wenn der fetch geklappt hat?
    /*    .catch((error) => console.log(error.message)); */
  }

  function updatePlayer(playerToEdit) {
    const upToDatePlayers = players.filter(
      (player) => player._id !== playerToEdit._id
    );

    fetch(`http://localhost:4000/players/${playerToEdit._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: playerToEdit.name,
        price: playerToEdit.price,
        free_transfer: playerToEdit.free_transfer,
        club: playerToEdit.club,
        position: playerToEdit.position,
        skills: playerToEdit.skills,
        email: playerToEdit.email,
      }),
    })
      .then((result) => result.json())
      .then((playerToUpdate) =>
        setPlayers([...upToDatePlayers, playerToUpdate])
      )
      .catch((error) => console.log(error.message));

    setIsShowingEditModal(false);
  }

  return (
    <>
      <Header numberOfShoppingCartItems={shoppingCart.length} />
      <main>
        <Switch>
          <Route exact path="/">
            <Home
              players={players}
              onAddToShoppingCart={addToShoppingCart}
              onDeletePlayer={deletePlayer}
              clubs={clubs}
              onAddPlayer={updatePlayer}
              openEditModal={() => setIsShowingEditModal(true)}
              isShowingEditModal={isShowingEditModal}
            />
          </Route>
          <Route path="/addplayer">
            <PlayerForm
              headlineText={'Add a new player'}
              onAddPlayer={addPlayer}
              clubs={clubs}
            />
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
