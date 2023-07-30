import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER
} from "./actionTypes";


export const addUser = (user: any) => ({
    type: ADD_USER,
    payload: { ...user, id: Date.now() },
});

export const deleteUser = (id: any) => ({
    type: DELETE_USER,
    payload: { id }
});

export const updateUser = (id: any, updatedUser: any) => ({
    type: UPDATE_USER,
    payload: { id, updatedUser },
});