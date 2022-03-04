// setar informações pessoais do usuario.
export const SAVE_USER_PERSONAL_DATA = 'SAVE_USER_PERSONAL_DATA';

export const saveUserPersonalData = (state) => (
  { type: SAVE_USER_PERSONAL_DATA, payload: state }
);

// setar informações sobre os gastos na carteira.
export const ADD_EXPENSES_DATA_TO_WALLET = 'ADD_EXPENSES_DATA_TO_WALLET';

export const addExpensesDataToWallet = (state) => (
  { type: ADD_EXPENSES_DATA_TO_WALLET, payload: state }
);
