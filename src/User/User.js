import React, { Component, PropTypes } from 'react';

class User extends Component {

    static propTypes() {
        return {
            user: PropTypes.object.isRequired,
            actions: PropTypes.func.isRequired,
        };
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>
                    <img className="user-image" src={this.props.user.image} />
                </td>
                <td>{this.props.user.first_name}</td>
                <td>{this.props.user.last_name}</td>
                <td>{this.props.user.email}</td>
                <td
                    onClick={() => this.remove()}
                >delete</td>
            </tr>
        );
    }

    remove() {
        this.props.actions.deleteUser(this.props.user.id);
    }
}

export default User;
