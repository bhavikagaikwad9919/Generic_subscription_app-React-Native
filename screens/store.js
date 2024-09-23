import { legacy_createStore } from "redux";
const initialState = {
  };

  const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case "token":
        return { ...state, ...rest };
      default:
        return state;
    }
  };
  const store = legacy_createStore(changeState);
  export default store;