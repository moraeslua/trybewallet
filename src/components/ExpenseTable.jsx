import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import { deleteExpenseFromWallet } from '../actions/walletActions';

class ExpenseTable extends Component {
  calculateExpensedValueInBRL = ({ value, currency, exchangeRates }) => {
    const currencyConvertedToBRL = exchangeRates[currency].ask;
    const expensedValueInBRL = value * currencyConvertedToBRL;
    return expensedValueInBRL.toFixed(2);
  }

  handleOnClickDeleteButton = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenseFromWallet(id));
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
                    label="excluir"
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

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(ExpenseTable);
