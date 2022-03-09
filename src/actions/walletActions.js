import currencyQuotesAPI from '../services/currencyQuotesAPI';

// setar informações sobre os gastos na carteira.
export const ADD_NEW_EXPENSE_TO_WALLET = 'ADD_NEW_EXPENSE_TO_WALLET';

export const addNewExpenseToWallet = (state) => (
  { type: ADD_NEW_EXPENSE_TO_WALLET, payload: state }
);

// fetch all currencies
export const SAVE_ALL_CURRENCIES_SUCESS = 'SAVE_ALL_CURRENCIES_SUCESS';

const saveAllCurrenciesSucess = (state) => (
  { type: SAVE_ALL_CURRENCIES_SUCESS, payload: state }
);

export const SAVE_ALL_CURRENCIES_FAIL = 'SAVE_ALL_CURRENCIES_FAIL';

const saveAllCurrenciesFail = (error) => (
  { type: SAVE_ALL_CURRENCIES_FAIL, payload: error }
);

export function getAllCurrenciesOptions() {
  return (dispatch) => currencyQuotesAPI()
    .then((response) => {
      const currenciesList = Object.keys(response);
      dispatch(saveAllCurrenciesSucess(currenciesList));
    })
    .catch((error) => dispatch(saveAllCurrenciesFail(error)));
}

export const CREATE_NEW_EXPENSE_ID = 'CREATE_NEW_EXPENSE_ID';

const createNewExpenseId = () => ({ type: CREATE_NEW_EXPENSE_ID });

export function addNewExpenseWithCurrentExchangeRates(expense) {
  return (dispatch) => currencyQuotesAPI()
    .then((response) => {
      const exchangeRates = response;
      const expenseWithExchangeRates = { ...expense, exchangeRates };
      dispatch(createNewExpenseId());
      dispatch(addNewExpenseToWallet(expenseWithExchangeRates));
    });
}

export const DELETE_EXPENSE_FROM_WALLET = 'DELETE_EXPENSE_FROM_WALLET';

export const deleteExpenseFromWallet = (id) => (
  { type: DELETE_EXPENSE_FROM_WALLET, payload: id }
);

// TURN ON EDIT MODE

export const TURN_ON_EXPENSE_EDIT_MODE = 'TURN_ON_EXPENSE_EDIT_MODE';

export const turnOnExpenseEditMode = (id) => (
  { type: TURN_ON_EXPENSE_EDIT_MODE, payload: id }
);

// salvar alterações da despesa editada
export const SAVE_EXPENSE_CHANGES_IN_EDIT_MODE = 'SAVE_EXPENSE_CHANGES_IN_EDIT_MODE';

export const saveExpenseChangesInEditMode = (expenseChanged) => (
  { type: SAVE_EXPENSE_CHANGES_IN_EDIT_MODE, payload: expenseChanged }
);

// TURN OFF EDIT MODE

export const TURN_OFF_EXPENSE_EDIT_MODE = 'TURN_OFF_EXPENSE_EDIT_MODE';

export const turnOffExpenseEditMode = (id) => (
  { type: TURN_OFF_EXPENSE_EDIT_MODE, payload: id }
);
