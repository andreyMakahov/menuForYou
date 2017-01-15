import React, { Component, PropTypes } from 'react';

class Search extends Component {

    static propTypes() {
        return {
            actions: PropTypes.func.isRequired,
        };
    };

    render() {
        return (
            <div className="row">
                <div className="col-xs-6 col-md-6 col-lg-6 col-sm-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        onChange={(e) => this.handleChange(e)} />
                </div>
            </div>
        );
    }

    handleChange(e) {
        let query = e.target.value.trim();
        this.props.actions.filterUsers(query);
    }
}

export default Search;
