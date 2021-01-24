import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../training/actions/index';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    closeForm = () => {
        this.props.closeForm();
    }

    componentWillMount(){
        if(this.props.taskModify){
            this.setState({
                id: this.props.taskModify.id,
                name: this.props.taskModify.name,
                status: this.props.taskModify.status
            })
        }else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.taskModify && nextProps){
            this.setState({
                id: nextProps.taskModify.id,
                name: nextProps.taskModify.name,
                status: nextProps.taskModify.status
            })
        } else if(nextProps && nextProps.taskModify === null){
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onClear =() => {
        this.setState({
            id: '',
            name: '',
            status: false
        })
    }

    onChangeInfo = (event) => {
        var target =  event.target;
        var name = target.name;
        var value = target.value;
        if(name ==='status'){
            value = target.value;
        }
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onResetForm();
        this.props.closeForm();
    }

    onResetForm = () => {
        this.setState({
            name: '',
            status: false
        })
    }
    render() {
        if(!this.props.isDisplayForm) return '';
        var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !==  '' ? 'Update Task' : 'Add Task'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.closeForm}
                        ></span>
                    </h3>
                </div>

                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeInfo}
                            />
                        </div>
                        <label>Status: </label>
                        <select 
                            name="status" 
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChangeInfo}
                        >
                            <option value={true}>Active</option>
                            <option value={false}>Hide</option>
                        </select><br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick={this.onResetForm}
                            >
                                <span className="fa fa-close mr-5"></span>Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        taskModify: state.editTask
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        closeForm: () => {
            dispatch(actions.closeForm());
        },
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
