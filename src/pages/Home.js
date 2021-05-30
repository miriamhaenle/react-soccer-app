import styled from 'styled-components';
import { useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import PlayerForm from '../components/PlayerForm';

export default function Home({
  players,
  onAddToShoppingCart,
  onDeletePlayer,
  clubs,
  onAddPlayer,
  openEditModal,
  isShowingEditModal,
}) {
  const [playerToEdit, setPlayerToEdit] = useState({});

  function openModal(player) {
    setPlayerToEdit(player);
    openEditModal(true);
  }

  return (
    <>
      <Players>
        {players.map((player, index) => (
          <PlayerCard
            key={index}
            player={player}
            onAddToShoppingCart={onAddToShoppingCart}
            onDeletePlayer={onDeletePlayer}
            onOpenEditModal={openModal}
          />
        ))}
      </Players>
      {isShowingEditModal && (
        <PlayerForm
          clubs={clubs}
          playerToEdit={playerToEdit}
          onAddPlayer={onAddPlayer}
        />
      )}
    </>
  );
}

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
