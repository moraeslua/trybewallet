// setar informações pessoais do usuario.
export const SAVE_USER_PERSONAL_DATA = 'SAVE_USER_PERSONAL_DATA';

export const saveUserPersonalData = (state) => (
  { type: SAVE_USER_PERSONAL_DATA, payload: state }
);
