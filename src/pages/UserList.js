import React, { Component } from 'react';
import '../App.scss';

class UserList extends Component {
    render() {
        return (
            <div className="Container">
                <h1>User list</h1>
            {
                ["Tania Solovey", "Evgenii Demin", "Kirill Grevtsov"].map((user, index) =>
                <p key={ index }>{ user }</p>)
            }
            </div>
        );
    };
};

export default UserList;