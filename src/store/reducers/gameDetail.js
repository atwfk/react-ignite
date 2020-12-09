import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  game: {
    platforms: [],
  },
  screen: {
    results: [],
  },
  loading: true,
  error: false,
};

const gameDetailStart = (state, action) => {
  return updateObject(state, { loading: true, error: false });
};

const gameDetailSuccess = (state, action) => {
  return updateObject(state, {
    game: action.game,
    screen: action.screenshot,
    loading: false,
    error: false,
  });
};

const gameDetailError = (state, action) => {
  return updateObject(state, { loading: false, error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAME_DETAIL_START:
      return gameDetailStart(state, action);
    case actionTypes.GAME_DETAIL_SUCCESS:
      return gameDetailSuccess(state, action);
    case actionTypes.GAME_DETAIL_ERROR:
      return gameDetailError(state, action);
    default:
      return state;
  }
};

export default reducer;
