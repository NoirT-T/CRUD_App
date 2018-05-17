export default function adList(state = [], action: any) {
    switch (action.type) {
        case 'SET_AD':
            return [...state, action.payload];
        case 'REMOVE_AD':
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
}