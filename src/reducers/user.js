// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_USER_INFO } from '../actions';

const USER_INITIAL_STATE = {
  email: '',
};

const user = (userState = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER_INFO:
    return { ...userState, user: action.payload };
  default:
    return userState;
  }
};

export default user;
