import { useState } from 'react';
import styled from 'styled-components/macro';

function App() {
  const initialPlayerState = {
    name: '',
    price: '',
    free_transfer: false,
    club: '',
    position: '',
    email: '',
  };

  const [player, setPlayer] = useState(initialPlayerState);

  console.log(player);

  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    }

    setPlayer({ ...player, [fieldName]: fieldValue });
  }

  function addPlayer(event) {
    event.preventDefault();
    console.log(player, 'State');
  }

  return (
    <div>
      <h1>Add a new player</h1>
      <Form onSubmit={addPlayer}>
        <label htmlFor="playerName">Player Name</label>
        <input
          type="text"
          name="name"
          onChange={updatePlayer}
          value={player.name}
        />
        <label htmlFor="price">Transfer Price in ($)</label>
        <input
          type="name"
          name="price"
          onChange={updatePlayer}
          value={player.price}
        />
        <label htmlFor="free_transfer">On a free transfer</label>
        <input
          type="checkbox"
          name="free_transfer"
          onChange={updatePlayer}
          value={player.free_transfer}
        />
        <label htmlFor="club">Club</label>
        <select
          name="club"
          id="club"
          onChange={updatePlayer}
          value={player.club}
        >
          <option value="">---Please select ---</option>
          <option value="fc_bayern">FC Bayern</option>
          <option value="sv_werder">SV Werder Bremen</option>
          <option value="vfb_stuttgart">VFB Stuttgart</option>
          <option value="rb_leipzeig">RB Leipzig</option>
          <option value="hansa_rostock">Hansa Rostock</option>
          <option value="eintract_frankfurt">Eintract Frankfurt</option>
          <option value="fc_st_pauli">FC St. Pauli</option>
        </select>

        <label htmlFor="position">Position</label>
        <fieldset>
          <input
            type="radio"
            name="position"
            value="striker"
            onChange={updatePlayer}
            checked={player.position === 'striker'}
          />
          Striker
          <input
            type="radio"
            name="position"
            value="midfield"
            onChange={updatePlayer}
            checked={player.position === 'midfield'}
          />
          Midfield
          <input
            type="radio"
            name="position"
            value="defence"
            onChange={updatePlayer}
            checked={player.position === 'defence'}
          />
          Defence
          <input
            type="radio"
            name="position"
            value="goalie"
            onChange={updatePlayer}
            checked={player.position === 'goalie'}
          />
          Goalie
        </fieldset>

        <label htmlFor="email">Contact Email</label>
        <input
          type="text"
          name="email"
          onChange={updatePlayer}
          value={player.email}
        />
        <Button isPrimary>Add player</Button>
        <Button>Cancel</Button>
      </Form>
    </div>
  );
}

export default App;

const Form = styled.form`
  display: grid;
  gap: 0.5rem;

  margin: 0 auto;
  max-width: 25rem;

  label {
    font-weight: bold;
  }

  input,
  select {
    padding: 0.5rem;
  }

  fieldset {
    border: none;
    display: flex;
    gap: 0.4rem;
  }

  input[type='radio'],
  input[type='checkbox'] {
    transform: scale(1.5);
  }
`;

const Button = styled.button`
  padding: 1.5rem;
  border-radius: 0.4rem;
  border: none;
  background: ${(props) =>
    props.isPrimary ? 'hsl(222, 90%, 90%)' : 'hsla(222,90%,90%, 0.3)'};
`;
