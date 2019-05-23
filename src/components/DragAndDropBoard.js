import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import { TASKS_NEED_TO_DO, TASKS_IN_PROGRESS } from '../fixtures/tasks';

const styles = theme => ({
    container: {
        width: '100%',
        display: 'flex'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        padding: '26px',
        margin: '0 10px',
        backgroundColor: '#ffffff',
        borderRadius: '3px',
        fontFamily: "'Rubik', sans-serif",
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
    },
    title: {
        fontSize: '16px',
        fontWeight: '500',
        margin: '10px 0 10px 26px',
        textAlign: 'left'
    },
    card: {
        backgroundColor: '#ffffff',
        color: '#1c1e24',
        padding: '16px 26px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '5px',
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        textAlign: 'left',
        '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)'
        } 
    },
    selectedCard: {
        '-o-transform': 'skew(-20deg, 20deg)',
        '-ms-transform': 'skew(-20deg, 20deg)',
        '-moz-transform': 'skew(-20deg, 20deg)',
        '-webkit-transform': 'skew(-20deg, 20deg)',
        'transform': 'skew(-20deg, 20deg)'
    }
});

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
        items: TASKS_NEED_TO_DO,
        selected: TASKS_IN_PROGRESS,
        thirdColumn: []
    };

    id2List = {
        droppable: 'items',
        droppable2: 'selected',
        droppable3: 'thirdColumn'
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable2') {
                state = { selected: items };
            }

            if (source.droppableId === 'droppable3') {
                state = { thirdColumn: items };
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
                                {this.state.items.map((item, index) => (
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
                                                <Typography variant="body1" color="primary">{ item.text }</Typography>
                                                <Typography variant="subtitle2">{ item.date }</Typography>
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
                                {this.state.selected.map((item, index) => (
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
                                                <Typography variant="body1" color="primary">{ item.text }</Typography>
                                                <Typography variant="subtitle2">{ item.date }</Typography>
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
                                {this.state.thirdColumn.map((item, index) => (
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
                                                <Typography variant="body1" color="primary">{ item.text }</Typography>
                                                <Typography variant="subtitle2">{ item.date }</Typography>
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

export default withStyles(styles)(DragAndDropBoard);
