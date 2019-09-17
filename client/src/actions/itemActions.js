export const setItem = item => dispatch => {
    dispatch({
        type: "SET_ITEM",
        item
    });
};

export const getItems = items => dispatch => {
    dispatch({
        type: "GET_ITEMS",
        items
    });
};

export const deleteItem = id => dispatch => {
    dispatch({
        type: "DELETE_ITEM",
        id
    });
};
