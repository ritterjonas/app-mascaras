import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  location: null
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/SET_USER_LOCATION': {
        draft.location = action.payload.location;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        draft.location = null;
        break;
      }
      default:
    }
  })
}
