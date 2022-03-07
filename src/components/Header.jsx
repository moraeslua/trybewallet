import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTotalAmountOfExpenses(expenses = []) {
    const expensesAmount = expenses.reduce((acc, { currency, exchangeRates, value }) => {
      console.log(currency);
      const currencyConvertedToBRL = exchangeRates[currency].ask;
      console.log(currencyConvertedToBRL);
      const expenseValueInBRL = value * currencyConvertedToBRL;
      console.log(expenseValueInBRL);
      return acc + expenseValueInBRL;
    }, 0);
    return expensesAmount;
  }

  render() {
    const { userEmail, expenses } = this.props;

    console.log(this.sumTotalAmountOfExpenses(expenses));

    return (
      <header>
        <p data-testid="email-field">
          {userEmail}
        </p>

        <p data-testid="total-field">
          {expenses.length > 0 ? parseInt(this.sumTotalAmountOfExpenses(), 10) : '0,00'}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Header);
