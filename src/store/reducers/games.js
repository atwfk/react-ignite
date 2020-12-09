import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  popular: [],
  newGames: [],
  upcoming: [],
  searched: [],
  loading: true,
  error: false,
};

const fetchGamesStart = (state, action) => {
  return updateObject(state, { loading: true, error: false });
};

const fetchGamesSuccess = (state, action) => {
  return updateObject(state, {
    popular: action.popular,
    upcoming: action.upcoming,
    newGames: action.newGames,
    loading: false,
    error: false,
  });
};

const fetchGamesError = (state, action) => {
  return updateObject(state, { loading: false, error: true });
};

const fetchSearchedStart = (state, action) => {
  return updateObject(state, { loading: true, error: false });
};

const fetchSearchedSuccess = (state, action) => {
  return updateObject(state, {
    searched: action.searched,
    loading: false,
    error: false,
  });
};

const fetchSearchedFail = (state, action) => {
  return updateObject(state, { loading: false, error: true });
};

const clearSearchedGames = (state, action) => {
  return updateObject(state, { searched: [] });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GAMES_START:
      return fetchGamesStart(state, action);
    case actionTypes.FETCH_GAMES_SUCCESS:
      return fetchGamesSuccess(state, action);
    case actionTypes.FETCH_GAMES_ERROR:
      return fetchGamesError(state, action);
    case actionTypes.FETCH_SEARCHED_START:
      return fetchSearchedStart(state, action);
    case actionTypes.FETCH_SEARCHED_SUCCESS:
      return fetchSearchedSuccess(state, action);
    case actionTypes.FETCH_SEARCHED_FAIL:
      return fetchSearchedFail(state, action);
    case actionTypes.CLEAR_SEARCHED_GAMES:
      return clearSearchedGames(state, action);
    default:
      return state;
  }
};

export default reducer;
