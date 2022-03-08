import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import {
  addCurrentExchangeRatesToNewExpense as addExpense,
} from '../actions/walletActions';

class ExpenseForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: '',
    method: '',
    tag: '',
  }

  componentDidMount() {
    this.setState({
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleOnChangeInputsField = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleSaveNewExpense = () => {
    const { value, description, currency, method, tag } = this.state;
    const { addCurrentExchangeRatesToNewExpense } = this.props;
    const newExpense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    addCurrentExchangeRatesToNewExpense(newExpense);
    this.setState({ value: 0 });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;

    const paymentMethodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <Input
          id="value"
          placeholder="0"
          type="number"
          value={ value }
          testId="value-input"
          onChange={ this.handleOnChangeInputsField }
        />
        <Input
          id="description"
          placeholder="descrição"
          type="text"
          value={ description }
          testId="description-input"
          onChange={ this.handleOnChangeInputsField }
        />
        <Select
          id="currency"
          label="Moeda: "
          value={ currency }
          testId="currency-input"
          options={ currencies }
          onChange={ this.handleOnChangeInputsField }
        />
        <Select
          id="method"
          label="Método de Pagamento: "
          value={ method }
          testId="method-input"
          options={ paymentMethodOptions }
          onChange={ this.handleOnChangeInputsField }
        />
        <Select
          id="tag"
          label="Tag: "
          value={ tag }
          testId="tag-input"
          options={ tagOptions }
          onChange={ this.handleOnChangeInputsField }
        />
        <Button
          label="Adicionar despesa"
          isDisabled={ false }
          testId="add-exchange"
          onClick={ this.handleSaveNewExpense }
        />
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addCurrentExchangeRatesToNewExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrentExchangeRatesToNewExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
