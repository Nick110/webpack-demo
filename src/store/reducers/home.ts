/** @format */

const initialState = {
    keywords: '',
    searchResult: {
        songs: [],
    },
};

interface State {
    keywords: string;
    searchResult: object;
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
