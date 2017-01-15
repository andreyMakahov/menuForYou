import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import * as reducers from '../reducers';
import UserListApp from '../User/UserListApp';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <UserListApp />
                </Provider>
            </div>
        );
    }
}

export default App;
