import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, isDisabled, onClick } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ isDisabled }
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
