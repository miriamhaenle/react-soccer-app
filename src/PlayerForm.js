import { useState } from 'react';
import styled from 'styled-components/macro';

export default function PlayerForm({ onAddPlayer }) {
  const initialPlayerState = {
    name: '',
    price: '',
    free_transfer: false,
    club: '',
    position: '',
    email: '',
  };
  const [player, setPlayer] = useState(initialPlayerState);

  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    }

    setPlayer({ ...player, [fieldName]: fieldValue });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    onAddPlayer(player);
    setPlayer(initialPlayerState);
    event.target.name.focus();
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h2>Add new player</h2>
      <label htmlFor="playerName">Player Name</label>
      <input
        type="text"
        name="name"
        onChange={updatePlayer}
        value={player.name}
      />
      <label htmlFor="price">Transfer Price (in €)</label>
      <input
        type="name"
        name="price"
        onChange={updatePlayer}
        value={player.price}
        disabled={player.free_transfer}
      />
      <label>
        <input
          type="checkbox"
          name="free_transfer"
          onChange={updatePlayer}
          value={player.free_transfer}
          disabled={player.price.length >= 1}
        />
        <span>On a free transfer</span>
      </label>
      <label htmlFor="club">Club</label>
      <select name="club" id="club" onChange={updatePlayer} value={player.club}>
        <option value="">---Please select ---</option>
        <option value="fc_bayern">FC Bayern</option>
        <option value="sv_werder">SV Werder Bremen</option>
        <option value="vfb_stuttgart">VFB Stuttgart</option>
        <option value="rb_leipzeig">RB Leipzig</option>
        <option value="hansa_rostock">Hansa Rostock</option>
        <option value="eintracht_frankfurt">Eintracht Frankfurt</option>
        <option value="fc_st_pauli">FC St. Pauli</option>
      </select>

      <fieldset>
        <legend>Position</legend>
        <label>
          <input
            type="radio"
            name="position"
            value="striker"
            onChange={updatePlayer}
            checked={player.position === 'striker'}
          />
          Striker
        </label>
        <label>
          <input
            type="radio"
            name="position"
            value="midfield"
            onChange={updatePlayer}
            checked={player.position === 'midfield'}
          />
          Midfield
        </label>
        <label>
          <input
            type="radio"
            name="position"
            value="defence"
            onChange={updatePlayer}
            checked={player.position === 'defence'}
          />
          Defence
        </label>
        <label>
          <input
            type="radio"
            name="position"
            value="goalie"
            onChange={updatePlayer}
            checked={player.position === 'goalie'}
          />
          Goalie
        </label>
      </fieldset>

      <label htmlFor="email">Contact Email</label>
      <input
        type="text"
        name="email"
        onChange={updatePlayer}
        value={player.email}
      />
      <Button isPrimary>Add player</Button>
      <Button type="reset" onClick={() => setPlayer(initialPlayerState)}>
        Cancel
      </Button>
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  gap: 0.5rem;

  margin: 0 auto;
  max-width: 25rem;

  label,
  legend {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }

  legend {
    margin-bottom: 0.5rem;
    padding: 0;
  }

  input,
  select {
    padding: 0.5rem;
    margin-bottom: 0.3rem;
  }

  fieldset {
    border: none;
    display: flex;
    gap: 0.4rem;
    padding: 0;
    margin: 0;
  }

  fieldset > label {
    font-weight: normal;
  }

  input[type='radio'],
  input[type='checkbox'] {
    transform: scale(1.5);
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 1.5rem;
  border-radius: 0.4rem;
  border: none;
  background: ${(props) =>
    props.isPrimary ? 'hsl(160, 60%, 50%)' : 'hsla(160, 60%, 80%, 0.3)'};
  cursor: pointer;
  font-weight: ${(props) => (props.isPrimary ? '600' : '100')};
  font-size: 1.2rem;
`;
