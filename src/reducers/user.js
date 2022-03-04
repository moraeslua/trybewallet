// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER_PERSONAL_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (userState = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_PERSONAL_DATA:
    return { ...userState, email: action.payload };
  default:
    return userState;
  }
};

export default user;
