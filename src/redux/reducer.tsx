import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER
} from "./actionTypes";


// Helper function to initialize state as an array, even if localStorage is empty
const getInitialUsersState = () => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
};

const initialState = typeof window !== 'undefined' ? getInitialUsersState() : [];

const userReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case ADD_USER:
            const updatedStateAdd = [...state, action.payload];
            localStorage.setItem('users', JSON.stringify(updatedStateAdd));
            return updatedStateAdd;

        case DELETE_USER:
            const filteredUsers = state.filter((user: any) => user.id !== action.payload.id);
            localStorage.setItem('users', JSON.stringify(filteredUsers));
            return filteredUsers;


        case UPDATE_USER:
            const { id, updatedUser } = action.payload;
            const updatedUsers = state.map((user: any) =>
                user.id === id ? { ...user, ...updatedUser } : user
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            return updatedUsers;

        default:
            return state;
    }
};

export default userReducer;

