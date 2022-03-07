import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import { getAllCurrenciesOptions } from '../actions/walletActions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllCurrenciesOptions());
  }

  render() {
    return (
      <div>
        <Header />
        <div>TrybeWallet</div>
        <ExpenseForm />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
