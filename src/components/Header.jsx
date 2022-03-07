import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumTotalAmountOfExpenses(expenses = []) {
    const expensesAmount = expenses.reduce((acc, { currency, exchangeRates, value }) => {
      const currencyConvertedToBRL = exchangeRates[currency].ask;
      const expenseValueInBRL = value * currencyConvertedToBRL;
      return acc + expenseValueInBRL;
    }, 0);
    return expensesAmount;
  }

  render() {
    const { userEmail, expenses } = this.props;
    const totalAmountOfExpenses = this.sumTotalAmountOfExpenses(expenses).toFixed(2);

    return (
      <header>
        <p data-testid="email-field">
          {userEmail}
        </p>

        <p data-testid="total-field">
          {
            expenses.length > 0
              ? totalAmountOfExpenses : '0,00'
          }
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
