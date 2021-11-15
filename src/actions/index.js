import ACTIONS from './actions';

const getPayload = (collectionName, data) => {
  switch (collectionName) {
    case 'boardgames':
      return {
        boardgames: data.boardgames,
      };
    case 'players':
      return {
        players: data.players,
      };
    case 'gameRecords':
      return {
        gameRecords: data.gameRecords,
      };
    default:
      return {};
  }
};

export const getData = (dispatch, collectionName) => {
  dispatch({
    type: ACTIONS.FETCH_DATA,
    payload: {},
  });
  fetch(`http://localhost:5000/api/v1/scoreboard/${collectionName}`)
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: getPayload(collectionName, data),
      });
    });
};

export const postData = (dispatch, collectionName, data) => {
  dispatch({
    type: ACTIONS.FETCH_DATA,
    payload: {},
  });
  fetch(`http://localhost:5000/api/v1/scoreboard/${collectionName}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: ACTIONS.SUCCESS,
        payload: getPayload(collectionName, data),
      });
    });
};
