const initialState = {
    keywords: ''
};

interface State {
    keywords: string;
}

export default function(state: State = initialState, action): State {
    switch (action.type) {
        case 'ADD_SECOND':
            return {
                ...state,
                ...action.payload
            }
        case 'CHANGE':
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}