import types from "../types";

const initial_state = {
  loading: false,
  moreLoading: false,
  error: null,
  moreError: null,
  isListEnd: false,
  data: []
};

export default function (state = initial_state, action: any) {
  switch (action.type) {
    case types.API_REQUEST: {
      let { page } = action.payload || {};
      if (page == 1) {
        return { ...state, loading: true };
      } else {
        return { ...state, moreLoading: true };
      }
    }

    case types.API_SUCCESS: {
      return {
        ...state,
        data: [...state.data, ...action.payload],
        error: '',
        loading: false,
        moreLoading: false
      }
    }

    case types.API_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false,
        moreLoading: false
      }
    }

    case types.API_LIST_END: {
      return {
        ...state,
        isListEnd: true,
        loading: false,
        moreLoading: false
      }
    }

    default: {
      return { ...state };
    }
  }
}
