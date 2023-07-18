'use client';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import notisReducer from './slices/notiSlice';

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    // Save to localStorage
    const state = store.getState();
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(state.user));
    }

    return result;
};

const reHydrateStore = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('user') !== null) {
            return {
                user: JSON.parse(localStorage.getItem('user')),
            };
        }
    }

    return {
        user: null,
    };
};

const store = configureStore({
    reducer: { user: userReducer, notis: notisReducer },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
