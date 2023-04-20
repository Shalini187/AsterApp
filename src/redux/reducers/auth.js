import types from "../types";

const initial_state = {
  userData: {},
  theme: "dark",
  token: ""
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case types.LOGIN: {
      const data = action.payload;
      return { ...state, userData: data };
    }

    case types.CHANGE_THEME: {
      return { ...state, theme: action.payload }
    }

    case types.TOKEN: {
      return { ...state, token: action.payload }
    }

    default: {
      return { ...state };
    }
  }
}
