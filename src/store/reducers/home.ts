const initialState = {
  keywords: '',
  searchResult: {
    songs: [],
  },
};

interface SearchResult {
  songs: Array<string>;
}

interface State {
  keywords: string;
  searchResult: SearchResult;
}

export default function (state = initialState, action): State {
  switch (action.type) {
    case 'RESET':
      return {
        ...initialState,
      };
    case 'CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_SEARCH_RESULT':
      return {
        ...state,
        searchResult: {
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
