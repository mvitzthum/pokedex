import React, { useState, useEffect } from "react";

const initialState = {
  data: null,
  state: "idle"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START_FETCH": {
      return {
        data: null,
        state: "loading",
        error: null
      };
    }
    case "DATA_FETCHED": {
      return {
        data: action.data,
        state: "idle",
        error: null
      };
    }
    case "ERROR": {
      return {
        data: null,
        state: "error",
        error: action.error
      };
    }
    default: {
      return initialState;
    }
  }
};

const useAsync = (asyncFn, dependencies) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "START_FETCH"
    });

    asyncFn()
      .then(data => {
        dispatch({
          type: "DATA_FETCHED",
          data: data
        });
      })
      .catch(err => {
        dispatch({
          type: "ERROR",
          error: err
        });
      });

    // eslint-disable-next-line
  }, dependencies);

  return [state.data, state.state];
};

export default useAsync;
