import { ADD_FLAG } from '../action/action';

export const intialState = {
  flag: 'Init'
};

export const reducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_FLAG:
      return Object.assign({}, state, { flag: action.flag });
    default:
      return state;
  }
};
