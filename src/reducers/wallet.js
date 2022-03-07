import {
  ADD_NEW_EXPENSE_TO_WALLET,
  SAVE_ALL_CURRENCIES_SUCESS,
  SAVE_ALL_CURRENCIES_FAIL,
} from '../actions/walletActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (walletState = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NEW_EXPENSE_TO_WALLET:
    return { ...walletState, expenses: [...walletState.expenses, action.payload] };
  case SAVE_ALL_CURRENCIES_SUCESS:
    return { ...walletState, currencies: action.payload };
  case SAVE_ALL_CURRENCIES_FAIL:
    return { ...walletState, error: action.payload };
  default:
    return walletState;
  }
};

export default wallet;
