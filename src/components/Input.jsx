import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { id, placeholder, type, value, testId, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        <input
          id={ id }
          placeholder={ placeholder }
          type={ type }
          value={ value }
          data-testid={ testId }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
