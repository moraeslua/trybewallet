import {
  ADD_NEW_EXPENSE_TO_WALLET,
  SAVE_ALL_CURRENCIES_SUCESS,
  SAVE_ALL_CURRENCIES_FAIL,
  DELETE_EXPENSE_FROM_WALLET,
  CREATE_NEW_EXPENSE_ID,
  TURN_ON_EXPENSE_EDIT_MODE,
  SAVE_EXPENSE_CHANGES_IN_EDIT_MODE,
  TURN_OFF_EXPENSE_EDIT_MODE,
} from '../actions/walletActions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  lastExpenseId: 0,
  isExpenseEditModeDisabled: true,
  expenseIdInEditMode: null,
};

const wallet = (walletState = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_NEW_EXPENSE_ID: {
    const lastExpenseId = walletState.expenses.length === 0
      ? 0 : walletState.lastExpenseId + 1;

    return { ...walletState, lastExpenseId };
  }

  case ADD_NEW_EXPENSE_TO_WALLET: {
    const expenseWithId = { ...action.payload, id: walletState.lastExpenseId };
    return { ...walletState, expenses: [...walletState.expenses, expenseWithId] };
  }

  case SAVE_ALL_CURRENCIES_SUCESS:
    return { ...walletState, currencies: action.payload };

  case SAVE_ALL_CURRENCIES_FAIL:
    return { ...walletState, error: action.payload };

  case DELETE_EXPENSE_FROM_WALLET: {
    const newExpensesList = walletState.expenses.filter((expense) => (
      expense.id !== action.payload));
    return { ...walletState, expenses: newExpensesList };
  }

  case TURN_ON_EXPENSE_EDIT_MODE:
    return {
      ...walletState,
      isExpenseEditModeDisabled: false,
      expenseIdInEditMode: action.payload,
    };

  case SAVE_EXPENSE_CHANGES_IN_EDIT_MODE: {
    const newExpenseStateWithExpenseChanged = walletState.expenses.map((expense) => (
      expense.id === walletState.expenseIdInEditMode
        ? { ...expense, ...action.payload }
        : expense
    ));
    return { ...walletState, expenses: newExpenseStateWithExpenseChanged };
  }

  case TURN_OFF_EXPENSE_EDIT_MODE:
    return { ...walletState, isExpenseEditModeDisabled: true, expenseIdInEditMode: null };

  default:
    return walletState;
  }
};

export default wallet;
