import React, { createContext, useReducer } from 'react';
import ACTIONS from '../actions/actions';

const initialState = {
  isLoading: false,
  scoreboard: {
    boardgames: [],
    players: [],
    gameRecords: [],
  },
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTIONS.FETCH_DATA:
        return {
          ...state,
          isLoading: true,
        };
      case ACTIONS.SUCCESS:
        return {
          ...state,
          scoreboard: {
            boardgames: action.payload.boardgames || state.scoreboard.boardgames,
            players: action.payload.players || state.scoreboard.players,
            gameRecords: action.payload.gameRecords || state.scoreboard.gameRecords,
          },
          isLoading: false,
        };
      case ACTIONS.ERROR:
        return {
          ...state,
          isLoading: false,
        };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
