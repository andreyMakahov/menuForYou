import React, { Component, PropTypes } from 'react';
import User from './User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class UserList extends Component {

    static propTypes() {
        return {
            users: PropTypes.array.isRequired,
            actions: PropTypes.object.isRequired
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-6 col-md-6 col-lg-6 col-sm-6">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td onClick={() => this.sortByField('id')}>ID</td>
                                <td>Image</td>
                                <td onClick={() => this.sortByField('first_name')}>First name</td>
                                <td onClick={() => this.sortByField('last_name')}>Last name</td>
                                <td onClick={() => this.sortByField('email')}>Email</td>
                            </tr>
                        </thead>
                        <ReactCSSTransitionGroup
                            transitionName="user"
                            component="tbody"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            {this.props.users.map((user) => {
                                if (!user.deleted && !user.filtered) {
                                    return (
                                        <User key={user.id} user={user} actions={this.props.actions} />
                                    )
                                }
                            })}
                        </ReactCSSTransitionGroup>
                    </table>
                </div>
            </div>
        );
    }

    sortByField(field) {
        this.props.actions.sortUsers(field);
    }
}

export default UserList;
