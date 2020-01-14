const initialState = {
    test: '我是redux里的初始值'
};

interface State {
    test: string
}

export default function(state: State = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state
    }
}