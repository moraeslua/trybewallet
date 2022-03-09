import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { deleteExpenseFromWallet as deleteExpense,
  turnOnExpenseEditMode as turnOnEditMode,
} from '../actions/walletActions';

class ExpenseTable extends Component {
  calculateExpensedValueInBRL = ({ value, currency, exchangeRates }) => {
    const currencyConvertedToBRL = exchangeRates[currency].ask;
    const expensedValueInBRL = value * currencyConvertedToBRL;
    return expensedValueInBRL.toFixed(2);
  }

  handleOnClickDeleteButton = (id) => {
    const { deleteExpenseFromWallet } = this.props;
    deleteExpenseFromWallet(id);
  }

  handleOnClickEditButton = (id) => {
    const { turnOnExpenseEditMode } = this.props;
    turnOnExpenseEditMode(id);
  }

  render() {
    const expenseTableFields = [
      'Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir',
    ];

    const { expenses } = this.props;

    return (
      <table>
        <thead>
          <tr className="table">
            {expenseTableFields.map((field) => <th key={ field }>{field}</th>)}
          </tr>
        </thead>
        {expenses.map((data) => {
          const exchangeUsed = parseFloat(data.exchangeRates[data.currency].ask);
          const currencyName = data.exchangeRates[data.currency].name;
          const expensedValue = Number(data.value);
          return (
            <tbody key={ data.id }>
              <tr>
                <td>{data.description}</td>
                <td>{data.tag}</td>
                <td>{data.method}</td>
                <td>{expensedValue.toFixed(2)}</td>
                <td>{currencyName}</td>
                <td>{exchangeUsed.toFixed(2)}</td>
                <td>{this.calculateExpensedValueInBRL(data)}</td>
                <td>Real</td>
                <td>
                  <Button
                    label="Editar"
                    onClick={ () => this.handleOnClickEditButton(data.id) }
                    isDisabled={ false }
                    testId="edit-btn"
                  />
                  <Button
                    label="Excluir"
                    onClick={ () => this.handleOnClickDeleteButton(data.id) }
                    isDisabled={ false }
                    testId="delete-btn"
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  turnOnExpenseEditMode: (id) => dispatch(turnOnEditMode(id)),
  deleteExpenseFromWallet: (id) => dispatch(deleteExpense(id)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  turnOnExpenseEditMode: PropTypes.func.isRequired,
  deleteExpenseFromWallet: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
