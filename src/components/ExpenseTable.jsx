import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ExpenseTable.css';

class ExpenseTable extends Component {
  calculateExpenseInBRL({ value, currency, exchangeRates }) {
    console.log(exchangeRates);
    console.log(exchangeRates[currency].ask);
    const currencyConvertedToBRL = exchangeRates[currency].ask;
    const expenseValueInBRL = value * currencyConvertedToBRL;
    return expenseValueInBRL.toFixed(2);
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
                  <td>{this.calculateExpenseInBRL(data)}</td>
                  <td>Real</td>
                </tr>
              </tbody>
            );
          })}
        </thead>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(ExpenseTable);
