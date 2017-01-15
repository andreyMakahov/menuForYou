import users from '../../users.json';
import Storage from '../Storage/Starage';
import {
    ADD_USER_ACTION,
    DELETE_USER_ACTION,
    FILTER_USER_ACTION,
    SORT_USER_ACTION,
    USER_LIST_STORAGE_KEY,
    USER_LIST_SORT_BY_STORAGE_KEY
} from '../User/UserConstants';

import userConfig from '../User/userConfig';

const initialState = getInitialState();

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER_ACTION:
            return addUserAction(state, action, userConfig);
            break;
        case DELETE_USER_ACTION:
            return deleteUserAction(state, action, userConfig);
            break;
        case SORT_USER_ACTION:
            return sortUserAction(state, action, userConfig);
            break;
        case FILTER_USER_ACTION:
            return filterUserAction(state, action, userConfig);
            break;

        default:
            return state;
    }
}

function addUserAction(state, action, { saveList } = {}) {
    let newState = {
        ...state,
        users: state.users.concat(action.user),
    };

    if (saveList) {
        Storage.setItem(USER_LIST_STORAGE_KEY, JSON.stringify(newState.users));
    }

    return newState;
}

function deleteUserAction(state, action, { saveList } = {}) {
    let newState = {
        ...state,
        users: state.users.filter((user) => {
            return user.id !== action.id;
        }),
    };

    if (saveList) {
        Storage.setItem(USER_LIST_STORAGE_KEY, JSON.stringify(newState.users));
    }

    return newState;
}

function sortUserAction(state, action, { saveList } = {}) {
    let sorted = state.users.sort((a, b) => {
        let aValue = a[action.field].toString().toLowerCase();
        let bValue = b[action.field].toString().toLowerCase();

        if (aValue > bValue) {
            return 1;
        } else if (aValue < bValue) {
            return -1;
        } else {
            return 0;
        }
    });

    let newState = {
        ...state,
        users: sorted,
    };

    if (saveList) {
        Storage.setItem(USER_LIST_STORAGE_KEY, JSON.stringify(newState.users));
        Storage.setItem(USER_LIST_SORT_BY_STORAGE_KEY, action.field);
    }

    return newState;
}

function filterUserAction(state, action) {
    const fields = ['id', 'first_name', 'last_name', 'email'];

    return {
        ...state,
        users: state.users.map((user) => {
            if (action.query.length) {
                let shouldDelete = true;
                for(let property in user) {
                    if (!user.hasOwnProperty(property) || fields.indexOf(property) === -1) continue;

                    if (user[property].toString().indexOf(action.query) !== -1) {
                        shouldDelete = false;
                        break;
                    }
                }
                user.filtered = shouldDelete;
            } else {
                user.filtered = false;
            }
            return user;
        }),
    };
}

function getInitialState() {
    let result = {};

    let storageList = Storage.getItem(USER_LIST_STORAGE_KEY);
    if (storageList !== null) {
        result.users = JSON.parse(storageList);
    } else {
        result.users = users;
    }

    return result;
}