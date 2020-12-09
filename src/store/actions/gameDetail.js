import axios from "axios";
import { gameDetailsURL, gameScreenshotURL } from "../../api";
import * as actionTypes from "./actionTypes";

const gameDetailStart = () => {
  return {
    type: actionTypes.GAME_DETAIL_START,
  };
};

const gameDetailSuccess = (detailData, screenshot) => {
  return {
    type: actionTypes.GAME_DETAIL_SUCCESS,
    game: detailData,
    screenshot: screenshot,
  };
};

const gameDetailError = () => {
  return {
    type: actionTypes.GAME_DETAIL_ERROR,
  };
};

export const gameDetail = (id) => async (dispatch) => {
  dispatch(gameDetailStart());
  const detailData = await axios.get(gameDetailsURL(id));
  const screenshotData = await axios.get(gameScreenshotURL(id));
  dispatch(gameDetailSuccess(detailData.data, screenshotData.data));
  if (!detailData || !screenshotData) {
    dispatch(gameDetailError());
  }
};
