import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Storage from '../Storage/Starage';
import { USER_LIST_SORT_BY_STORAGE_KEY } from '../User/UserConstants';

class Addition extends Component {

    constructor (props, context) {
        super(props, context);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            image: null,
        };

        this._maxId = this._getMaxId();
    }

    static propTypes() {
        return {
            actions: PropTypes.func.isRequired,
            users: PropTypes.array.isRequired,
        };
    };

    render() {
        return (
            <div className="additional-form">
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            onChange={(e) => this.firstNameChanged(e)} />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={(e) => this.lastNameChanged(e)} />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Email Address"
                            onChange={(e) => this.emailChanged(e)} />
                    </div>

                    <div className="form-group">
                        <input type="file"
                               onChange={(e) => this.imageChanged(e)} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" onClick={(e) => this.addUser(e)}>submit</button>
                    </div>
                </form>
            </div>
        );
    }

    firstNameChanged(e) {
        let value = e.target.value.trim();
        this.setState({
            first_name: value
        });
    }

    lastNameChanged(e) {
        let value = e.target.value.trim();
        this.setState({
            last_name: value
        });
    }

    emailChanged(e) {
        let value = e.target.value.trim();
        this.setState({
            email: value
        });
    }

    imageChanged(e) {
        let image = e.target.files[0];
        this._getBase64(image).then((base64String) => {
            this.setState({
                image: base64String
            });
        });
    }

    addUser(e) {
        e.preventDefault();
        if (this._isUserUnique(this.state)) {
            let newId = ++this._maxId;
            this.props.actions.addUser(_.extend({}, this.state, {
                id: newId
            }));

            let currentSort = Storage.getItem(USER_LIST_SORT_BY_STORAGE_KEY);
            if (currentSort) {
                this.props.actions.sortUsers(currentSort);
            }
        }
    }

    _getBase64(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onloadend = function () {
                resolve(reader.result);
            };

            reader.onerror = function (e) {
                reject(e);
            };

            reader.readAsDataURL(file);
        });
    }

    _isUserUnique(user) {
        let unique = true;

        let users = this.props.users;

        for(let index = 0; index < users.length; index++) {
            if (users[index].first_name === user.first_name && users[index].last_name === user.last_name) {
                unique = false;
                break;
            }
        }

        return unique;
    }

    _getMaxId() {
        let max = 0;
        for (let i = 0; i < this.props.users.length; i++) {
            max = Math.max(max, this.props.users[i].id);
        }
        return max;
    }
}

export default Addition;
