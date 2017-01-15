import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class Addition extends Component {

    constructor (props, context) {
        super(props, context);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            image: null,
        };

        this._lastId = props.users[props.users.length - 1].id;
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
                        <button onClick={(e) => this.addUser(e)}>submit</button>
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
            let newId = ++this._lastId;
            this.props.actions.addUser(_.extend({}, this.state, {
                id: newId
            }));
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
            if (users[index].deleted) continue;

            if (users[index].firs_name === user.first_name || users[index].last_name === user.last_name) {
                unique = false;
                break;
            }
        }

        return unique;
    }
}

export default Addition;
