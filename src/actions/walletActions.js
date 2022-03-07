import currencyQuotesAPI from '../services/currencyQuotesAPI';

// setar informações sobre os gastos na carteira.
export const ADD_NEW_EXPENSE_TO_WALLET = 'ADD_NEW_EXPENSE_TO_WALLET';

export const addNewExpenseToWallet = (state) => (
  { type: ADD_NEW_EXPENSE_TO_WALLET, payload: state }
);

// fetch all currencies
export const SAVE_ALL_CURRENCIES_SUCESS = 'SAVE_ALL_CURRENCIES_SUCESS';

const saveAllCurrenciesSucess = (state) => {
  console.log('chegou na action', state);
  return { type: SAVE_ALL_CURRENCIES_SUCESS, payload: state };
};

export const SAVE_ALL_CURRENCIES_FAIL = 'SAVE_ALL_CURRENCIES_FAIL';

const saveAllCurrenciesFail = (error) => (
  { type: SAVE_ALL_CURRENCIES_FAIL, payload: error }
);

export function getAllCurrenciesOptions() {
  console.log('ta batendo aqui');
  return (dispatch) => currencyQuotesAPI()
    .then((response) => {
      const currenciesList = Object.keys(response);
      console.log(currenciesList);
      dispatch(saveAllCurrenciesSucess(currenciesList));
    })
    .catch((error) => dispatch(saveAllCurrenciesFail(error)));
}

export function addCurrentExchangeRatesToNewExpense(expense) {
  return (dispatch) => currencyQuotesAPI()
    .then((response) => {
      const exchangeRates = response;
      const expenseWithExchangeRates = { ...expense, exchangeRates };
      dispatch(addNewExpenseToWallet(expenseWithExchangeRates));
    });
}
