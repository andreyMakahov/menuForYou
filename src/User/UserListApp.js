import React, { Component, PropTypes } from 'react';
import Search from '../Search/Search';
import UserList from '../User/UserList';
import Addition from '../Addition/Addition';
import * as UserActions from './UserActions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@connect(state => ({
        userList: state.userList
}))
class UserListApp extends Component {

    static propTypes() {
        return {
            userList: PropTypes.object.isRequired,
            dispatch: PropTypes.func.isRequired
        };
    }

    render() {
        const { userList: { users },  dispatch } = this.props;
        let actions = bindActionCreators(UserActions, dispatch);

        return (
            <div>
                <Search actions={actions} />
                <UserList users={users} actions={actions} />
                <Addition users={users} actions={actions} />
            </div>
        );
    }
}

export default UserListApp;
