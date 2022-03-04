import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import { saveUserPersonalData } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    enterButtonIsDisabled: true,
    shouldRedirect: false,
  }

  // regex from: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validateUserData = () => {
    const { email, password } = this.state;

    const SIX = 6;
    const isValidEmail = this.validateEmail(email);
    const isValidPassword = password.length >= SIX;

    const validationArray = [isValidEmail, isValidPassword];

    this.setState({
      enterButtonIsDisabled: !validationArray.every((elem) => elem === true),
    });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({ [id]: value }, () => this.validateUserData());
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch } = this.props;
    dispatch(saveUserPersonalData(email));
    this.setState({ shouldRedirect: true });
  };

  render() {
    const { email, password, enterButtonIsDisabled, shouldRedirect } = this.state;

    if (shouldRedirect) {
      return <Redirect push to="/carteira" />;
    }

    return (
      <section>
        <Input
          id="email"
          placeholder="Digite seu email:"
          type="text"
          value={ email }
          testId="email-input"
          onChange={ this.handleChange }
        />
        <Input
          id="password"
          placeholder="Digite seu senha:"
          type="password"
          value={ password }
          testId="password-input"
          onChange={ this.handleChange }
        />
        <Button
          label="Entrar"
          isDisabled={ enterButtonIsDisabled }
          onClick={ this.handleClick }
        />
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
