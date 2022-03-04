// Coloque aqui suas actions

// setar informações do usuario como email e senha.
export const SET_USER_INFO = 'SET_USER_INFO';

export const userAction = (state) => ({ type: SET_USER_INFO, payload: state });

// setar informações da carteira
export const SET_WALLET_INFO = 'SET_WALLET_INFO';

export const walletAction = (state) => ({ type: SET_WALLET_INFO, payload: state });
