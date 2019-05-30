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
        display: 'flex',
        flexDirection: 'column',
        fontSize: '14px',
        textAlign: 'left',
        boxShadow: '0 4px 16px rgba(0,0,0,.3)',
        '&:hover': {
            backgroundColor: '#e6e6e6',
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
                                                <Typography variant="body1" className={ classes.cardTitle }>{ item.text }</Typography>
                                                <Typography variant="subtitle2" className={ classes.date }>{ item.date }</Typography>
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
                                                <Typography variant="body1" className={ classes.cardTitle }>{ item.text }</Typography>
                                                <Typography variant="subtitle2" className={ classes.date }>{ item.date }</Typography>
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
                                                <Typography variant="body1" className={ classes.cardTitle }>{ item.text }</Typography>
                                                <Typography variant="subtitle2" className={ classes.date }>{ item.date }</Typography>
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
