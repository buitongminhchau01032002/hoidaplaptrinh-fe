import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

export const notisSlice = createSlice({
    name: 'notis',
    initialState,
    reducers: {
        setNoti: (state, action) => {
            return action.payload;
        },
        addNoti: (state, action) => {
            state.push(action.payload);
        },
        clearNoti: (state, action) => {
            return [];
        },
    },
});

// Action creators are generated for each case reducer function
const notisReducer = notisSlice.reducer;
const notisActions = notisSlice.actions;

export default notisReducer;
export { notisActions };
