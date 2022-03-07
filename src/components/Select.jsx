import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { label, id, value, testId, options, onChange } = this.props;
    return (
      <label htmlFor={ id }>
        { label }
        <select
          id={ id }
          value={ value }
          data-testid={ testId }
          onChange={ onChange }
        >
          {options.map((option) => (
            <option
              key={ option }
              value={ option }
              data-testid={ option }
            >
              {option}
            </option>))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
