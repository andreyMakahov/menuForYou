import { ADD_USER_ACTION, DELETE_USER_ACTION, FILTER_USER_ACTION, SORT_USER_ACTION } from './UserConstants';

export function addUser(user) {
    return {
        type: ADD_USER_ACTION,
        user
    };
}

export function deleteUser(id) {
    return {
        type: DELETE_USER_ACTION,
        id,
    };
}

export function filterUsers(query) {
    return {
        type: FILTER_USER_ACTION,
        query,
    };
}

export function sortUsers(field) {
    return {
        type: SORT_USER_ACTION,
        field,
    };
}