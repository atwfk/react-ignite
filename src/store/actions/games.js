import axios from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL,
} from "../../api";
import * as actionTypes from "./actionTypes";

const fetchGamesStart = () => {
  return {
    type: actionTypes.FETCH_GAMES_START,
  };
};

const fetchGamesSuccess = (popularData, upcomingData, newGamesData) => {
  return {
    type: actionTypes.FETCH_GAMES_SUCCESS,
    popular: popularData,
    upcoming: upcomingData,
    newGames: newGamesData,
  };
};

const fetchGamesError = () => {
  return {
    type: actionTypes.FETCH_GAMES_ERROR,
  };
};

const fetchSearchedStart = () => {
  return {
    type: actionTypes.FETCH_SEARCHED_START,
  };
};

const fetchSearchedSuccess = (searchedGames) => {
  return {
    type: actionTypes.FETCH_SEARCHED_SUCCESS,
    searched: searchedGames,
  };
};

const fetchSearchedFail = () => {
  return {
    type: actionTypes.FETCH_SEARCHED_FAIL,
  };
};

export const clearSearchedGames = () => {
  return {
    type: actionTypes.CLEAR_SEARCHED_GAMES,
  };
};

export const fetchGames = () => async (dispatch) => {
  dispatch(fetchGamesStart());
  const popularData = await axios.get(popularGamesURL());
  const newGamesData = await axios.get(newGamesURL());
  const upcomingData = await axios.get(upcomingGamesURL());
  dispatch(
    fetchGamesSuccess(
      popularData.data.results,
      newGamesData.data.results,
      upcomingData.data.results
    )
  );
  if (!popularData || !newGamesData || !upcomingData) {
    dispatch(fetchGamesError());
  }
};

export const fetchSearched = (game_name) => async (dispatch) => {
  dispatch(fetchSearchedStart());
  const searchGames = await axios.get(searchGameURL(game_name));
  dispatch(fetchSearchedSuccess(searchGames.data.results));
  if (!searchGames) {
    dispatch(fetchSearchedFail());
  }
};
