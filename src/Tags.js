import { useState } from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function Tags({
  headline = 'Tags',
  tags,
  onUpdateTags,
  onDeleteTag,
}) {
  const [tagInput, setTagInput] = useState('');

  const handleChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onUpdateTags(tagInput.toUpperCase());
      setTagInput('');
    }
  };

  return (
    <div>
      <label htmlFor="tags">{headline}</label>
      <TagsContainer>
        {tags?.map((tag, index) => (
          <Tag key={index + tag}>
            {tag}
            <span onClick={() => onDeleteTag(tag)}>&times;</span>
          </Tag>
        ))}
        <Input
          type="text"
          name="tags"
          value={tagInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Write here"
        />
      </TagsContainer>
    </div>
  );
}

Tags.propTypes = {
  headline: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onUpdateTags: PropTypes.func.isRequired,
  onDeleteTag: PropTypes.func.isRequired,
};

const Input = styled.input`
  border: none;
  display: inline;
  margin: 0.2rem;
  padding: 0.4rem;
  width: 35%;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: white;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 0.5rem;
  padding: 0.4rem;
`;

const Tag = styled.span`
  background: #aeffd8;
  color: #183642;
  margin: 0.2rem;
  padding: 0.2rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  span {
    cursor: pointer;
    margin: 0rem 0.3rem;
  }
`;
