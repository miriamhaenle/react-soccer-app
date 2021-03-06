import { useState } from 'react';
import styled from 'styled-components/macro';
import Tags from './Tags';

import validatePlayer from './lib/validation';

export default function PlayerForm({ onAddPlayer }) {
  const initialPlayerState = {
    name: '',
    price: '',
    free_transfer: false,
    club: '',
    position: '',
    skills: [],
    email: '',
  };
  const [player, setPlayer] = useState(initialPlayerState);
  const [isError, setIsError] = useState(false);

  function updateSkills(skillToAdd) {
    const playerSkills = [...player.skills, skillToAdd];
    setPlayer({ ...player, skills: playerSkills });
  }

  function deleteSkill(skillToDelete) {
    const playerSkills = player.skills.filter(
      (skill) => skill !== skillToDelete
    );
    setPlayer({ ...player, skills: playerSkills });
  }

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

    if (validatePlayer(player)) {
      onAddPlayer(player);
      setPlayer(initialPlayerState);
      setIsError(false);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <h2>Add new player</h2>
      <ErrorBox isError={isError}>
        <p>You have an error in your form.</p>
      </ErrorBox>
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
          checked={player.free_transfer}
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

      <Tags
        headline="Player skills"
        tags={player.skills}
        onUpdateTags={updateSkills}
        onDeleteTag={deleteSkill}
      />

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

const ErrorBox = styled.div`
  background: hsl(340, 60%, 50%);
  color: hsl(340, 95%, 95%);
  padding: ${(props) => (props.isError ? '1.2rem' : 0)};
  border-radius: 0.5rem;
  opacity: ${(props) => (props.isError ? 1 : 0)};
  max-height: ${(props) => (props.isError ? '100%' : '1px')};
  transition: all 1s ease-in-out;
  font-size: ${(props) => (props.isError ? '1rem' : '1px')};
  font-weight: bold;
`;
