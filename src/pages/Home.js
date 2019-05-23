import React, { Component } from 'react';
import DragAndDropBoard from '../components/DragAndDropBoard';
import '../App.scss';

class Home extends Component {
    render() {
        return (
            <div className="Container">
                <h1>Home</h1>
                <DragAndDropBoard />
            </div>
        );
    };
};

export default Home;