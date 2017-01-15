import React, { Component, PropTypes } from 'react';

class UserList extends Component {

    static propTypes() {
        return {
            sortIco: PropTypes.bool.isRequired,
            title: PropTypes.string.isRequired,
            onSort: PropTypes.func.isRequired
        };
    }

    render() {
        let className = 'glyphicon glyphicon-triangle-bottom sort-ico';
        if (!this.props.sortIco) {
            className += ' invisible';
        }
        return (
            <td className="user-table-sort-cell" onClick={() => this.props.onSort(this.props.field)}>
                <span className={className}></span>
                {this.props.title}
            </td>
        );
    }


}

export default UserList;
