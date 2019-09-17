// Foods Reducer
const defaultState = {
    items: [],
    item: ""
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case "GET_ITEMS":
            return {
                ...state,
                items: action.items
            };
        case "DELETE_ITEM":
            const items = state.items.filter(item => {
                return item._id !== action.id ? item : null;
            });
            return {
                ...state,
                items
            };
        case "SET_ITEM":
            return {
                ...state,
                item: action.item
            };
        default:
            return state;
    }
};
