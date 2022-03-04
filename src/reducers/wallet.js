// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SET_USER_INFO } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (walletState = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_INFO:
    return { ...walletState, wallet: action.payload };
  default:
    return walletState;
  }
};

export default wallet;
