import { ADD_EXPENSES_DATA_TO_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (walletState = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES_DATA_TO_WALLET:
    return { ...walletState, wallet: action.payload };
  default:
    return walletState;
  }
};

export default wallet;
