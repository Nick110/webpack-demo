const initialState = {
    test: '我是redux里的第二个值'
};

interface State {
    test: string
}

export default function(state: State = initialState, action): State {
    switch (action.type) {
        case 'ADD_SECOND':
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}