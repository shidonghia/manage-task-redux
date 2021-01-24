import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../training/actions/index';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteTask(this.props.task.id); 
        this.props.closeForm();
    }

    onModifyItem = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

    render() {
        var {task, index} = this.props; // ~ var task = this.props.task; var index = this.props.index;
        return (
            <tr>
                <td>{index+1}</td>  

                <td>{task.name}</td>

                <td className="text-center">
                    <span 
                        className={task.status === false ? "label label-danger" : "label label-success"}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? "Active" : "Hide"}
                    </span>                                                                              
                </td>

                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={this.onModifyItem}
                    >
                        <span className="fa fa-pencil mr-5"></span>Modify                                        
                    </button>&nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.onDeleteItem}
                    >
                        <span className="fa fa-trash mr-5"></span>Delete                                       
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        closeForm: () => {
            dispatch(actions.closeForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
