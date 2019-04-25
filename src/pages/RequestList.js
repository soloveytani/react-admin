import React, { Component } from 'react';

class RequestList extends Component {
    render() {
        return (
            <div className="Container">
                <h1>Request list</h1>
            {
                ["Check internet", "Check printer", "Add programm"].map((request, index) =>
                <p key={ index }>{ request }</p>)
            }
            </div>
        );
    };
};

export default RequestList;