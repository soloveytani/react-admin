import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import PriorityIcon from '@material-ui/icons/Report';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { auth }  from '../actions';
import { ISSUE_TOPICS_NAME } from '../fixtures/tasks';

const styles = theme => ({
    container: {
        width: '100%',
        display: 'flex'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        width: '33%',
        padding: '26px',
        margin: '0 10px',
        backgroundColor: '#5B7DEB',
        borderRadius: '8px',
        fontFamily: "'Rubik', sans-serif",
    },
    title: {
        fontSize: '16px',
        fontWeight: '500',
        margin: '0 0 10px 0',
        textAlign: 'left',
        color: '#ffffff'
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '16px 26px',
        borderRadius: '5px',
        margin: '10px 0',
        flexDirection: 'column',
        fontSize: '14px',
        textAlign: 'left',
        boxShadow: '0 4px 16px rgba(0,0,0,.3)',
        '&:hover': {
            backgroundColor: '#ecf0f6',
            '& $date':
            {
                color: '#03a9f4'
            }
        } 
    },
    cardTitle: {
        color: '#273eae',
        fontWeight: '500'
    },
    date: {
        color: '#03a9f4'
    },
    selectedCard: {
        '-o-transform': 'skew(-20deg, 20deg)',
        '-ms-transform': 'skew(-20deg, 20deg)',
        '-moz-transform': 'skew(-20deg, 20deg)',
        '-webkit-transform': 'skew(-20deg, 20deg)',
        'transform': 'skew(-20deg, 20deg)'
    },
    low: {
        float: 'right',
        marginRight: '-10px',
        '& path':{
            color: '#99cc33'
        }
    },
    normal: {
        float: 'right',
        marginRight: '-10px',
        '& path':{
            color: '#ffd31a'
        }
    },
    high: {
        float: 'right',
        marginRight: '-10px',
        '& path':{
            color: '#d33939'
        }
    }
});

const mapStateToProps = ({ auth: {token}}) => {
    return { token }
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

class DragAndDropBoard extends Component {
    state = {
        issues: [],
        needToDo: [],
        inProgress: [],
        done: []
    };

    id2List = {
        droppable: 'needToDo',
        droppable2: 'inProgress',
        droppable3: 'done'
    };

    getIssues = () => {
        fetch(`https://tatiana-backend.herokuapp.com/issues`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(result => result.json())
        .then((result) => {
            this.setLists(result);
        }).catch(err => console.error(err));
    };

    updateIssue = ( issue ) => {
        console.log(issue);
        let url = `https://tatiana-backend.herokuapp.com/issues/` + issue.id;
        fetch(url,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({
                issue: issue
            })
        }).then(result => result.json())
        .then( () => {}).catch(err => console.error(err));
    };

    componentDidMount = () => {
        this.getIssues();
    };

    componentWillUnmount = () => {
        const { needToDo, inProgress, done } = this.state;
        needToDo.forEach((issue) => { if (issue.status !== 'needToDo'){
            let newIssue = { ...issue, status: 'needToDo'};
            this.updateIssue(newIssue);
        }});
        inProgress.forEach((issue) => { if (issue.status !== 'inProgress'){
            let newIssue = { ...issue, status: 'inProgress'};
            this.updateIssue(newIssue);
        }});
        done.forEach((issue) => { if (issue.status !== 'done'){
            let newIssue = { ...issue, status: 'done'};
            this.updateIssue(newIssue);
        }});
    };

    setLists = (result) => {
        let needToDo = result.filter((issue) => issue.status === 'needToDo');
        let inProgress = result.filter((issue) => issue.status === 'inProgress');
        let done = result.filter((issue) => issue.status === 'done');
        this.setState({issues: result, needToDo: needToDo, inProgress: inProgress, done: done});
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const needToDo = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { needToDo };

            if (source.droppableId === 'droppable2') {
                state = { inProgress: needToDo };
            }

            if (source.droppableId === 'droppable3') {
                state = { done: needToDo };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                [this.id2List[source.droppableId]]: result[source.droppableId],
                [this.id2List[destination.droppableId]]: result[destination.droppableId],
            });
        }
    };

    render() {

        const { classes } = this.props;

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className={ classes.container }>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={ classes.list }
                            >
                                <p className={ classes.title }>Нужно сделать</p>
                                {this.state.needToDo.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={ classNames(classes.card,
                                                snapshot.isDragging ? classes.selectedCard : '')}
                                            >
                                                <PriorityIcon className={ classes[item.priority] } />
                                                <Typography variant="body1" className={ classes.cardTitle }>{ ISSUE_TOPICS_NAME[item.related_to] }</Typography>
                                                <Typography variant="subtitle2" className={ classes.date }>{ item.commentary }</Typography>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable2">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={ classes.list }
                            >
                                <p className={ classes.title }>В процессе</p>
                                {this.state.inProgress.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={ classNames(classes.card,
                                                snapshot.isDragging ? classes.selectedCard : '')}
                                            >
                                                <PriorityIcon className={ classes[item.priority] } />
                                                <Typography variant="body1" className={ classes.cardTitle }>{ ISSUE_TOPICS_NAME[item.related_to] }</Typography>
                                                <Typography variant="subtitle2" className={ classes.date }>{ item.commentary }</Typography>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="droppable3">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className={ classes.list }
                            >
                                <p className={ classes.title }>Готово</p>
                                {this.state.done.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={ classNames(classes.card,
                                                snapshot.isDragging ? classes.selectedCard : '')}
                                            >
                                                <PriorityIcon className={ classes[item.priority] } />
                                                <Typography variant="body1" className={ classes.cardTitle }>{ ISSUE_TOPICS_NAME[item.related_to] }</Typography>
                                                <Typography variant="subtitle2" className={ classes.date }>{ item.commentary }</Typography>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                
            </DragDropContext>
        );
    }
}

export default withStyles(styles)(connect(mapStateToProps, { auth })(DragAndDropBoard));
