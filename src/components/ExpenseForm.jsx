import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import {
  addNewExpenseWithCurrentExchangeRates as addExpense,
  saveExpenseChangesInEditMode as saveExpenseChanged,
  turnOffExpenseEditMode as turnOffEditMode,
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
    const { addNewExpenseWithCurrentExchangeRates } = this.props;
    const newExpense = {
      value,
      description,
      currency,
      method,
      tag,
    };
    addNewExpenseWithCurrentExchangeRates(newExpense);
    this.setState({ value: 0 });
  }

  handleSaveEditedExpense = () => {
    const { saveExpenseChangesInEditMode, turnOffExpenseEditMode } = this.props;
    const expenseChanged = this.state;
    saveExpenseChangesInEditMode(expenseChanged);
    turnOffExpenseEditMode();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, isExpenseEditModeDisabled } = this.props;

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
        {isExpenseEditModeDisabled
          ? (
            <Button
              label="Adicionar despesa"
              isDisabled={ false }
              testId="add-exchange"
              onClick={ this.handleSaveNewExpense }
            />
          )
          : (
            <Button
              label="Editar despesa"
              isDisabled={ false }
              testId="edit-exchange"
              onClick={ this.handleSaveEditedExpense }
            />
          )}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isExpenseEditModeDisabled: state.wallet.isExpenseEditModeDisabled,
});

const mapDispatchToProps = (dispatch) => ({
  addNewExpenseWithCurrentExchangeRates: (expense) => dispatch(addExpense(expense)),
  saveExpenseChangesInEditMode: (expenseChanged) => (
    dispatch(saveExpenseChanged(expenseChanged))
  ),
  turnOffExpenseEditMode: () => dispatch(turnOffEditMode()),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addNewExpenseWithCurrentExchangeRates: PropTypes.func.isRequired,
  isExpenseEditModeDisabled: PropTypes.bool,
  saveExpenseChangesInEditMode: PropTypes.func.isRequired,
  turnOffExpenseEditMode: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  isExpenseEditModeDisabled: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
