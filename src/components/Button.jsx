import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, isDisabled, testId, onClick } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ isDisabled }
        data-testid={ testId }
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  testId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  testId: '',
};

export default Button;
