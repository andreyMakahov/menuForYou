import React, { Component, PropTypes } from 'react';
import User from './User';
import UserTableHeadCell from './UserTableHeadCell';
import Storage from '../Storage/Starage';
import {
    USER_LIST_SORT_BY_STORAGE_KEY
} from '../User/UserConstants';

class UserList extends Component {

    constructor (props, context) {
        super(props, context);

        this.state = {
            sort: Storage.getItem(USER_LIST_SORT_BY_STORAGE_KEY)
        };
    }

    static propTypes() {
        return {
            users: PropTypes.array.isRequired,
            actions: PropTypes.object.isRequired
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-7 col-md-7 col-lg-7 col-sm-7">
                    <table className="table table-striped user-table">
                        <thead>
                            <tr>
                                <UserTableHeadCell
                                    field="id"
                                    title="ID"
                                    sortIco={this.state.sort === 'id'}
                                    onSort={(filed) => this.sortByField(filed)}/>
                                <td>Image</td>
                                <UserTableHeadCell
                                    field="first_name"
                                    title="First Name"
                                    sortIco={this.state.sort === 'first_name'}
                                    onSort={(filed) => this.sortByField(filed)}/>
                                <UserTableHeadCell
                                    field="last_name"
                                    title="Last Name"
                                    sortIco={this.state.sort === 'last_name'}
                                    onSort={(filed) => this.sortByField(filed)}/>
                                <UserTableHeadCell
                                    field="email"
                                    title="Email"
                                    sortIco={this.state.sort === 'email'}
                                    onSort={(filed) => this.sortByField(filed)}/>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map((user) => {
                                if (!user.filtered) {
                                    return (<User key={user.id} user={user} actions={this.props.actions} />)
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    sortByField(field) {
        this.props.actions.sortUsers(field);
        this.setState({
            sort: field
        })
    }
}

export default UserList;
