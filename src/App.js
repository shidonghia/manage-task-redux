import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Manipulation from './components/manipulation';
import TaskList from './components/taskList';
import {findIndex} from 'lodash';
import {connect} from 'react-redux';
import * as actions from './training/actions/index';

class App extends Component {
    constructor(props){
        super(props);   
    }

    onToggleForm = () => {
        var {editTask} = this.props;
        if(editTask && editTask.id !== ''){
            this.props.openForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
    }

    render() {
        var {isDisplayForm} = this.props;

        return (
            <div className="container">
                <div className="text-center">
                    <h1> Manage Task </h1> <hr />
                </div>

                <div className="row">
                    <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                       {/*Form*/}
                        <TaskForm />
                    </div>

                    <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick = {this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span> Add task
                        </button>&nbsp;

                        {/*Search - Sort*/}
                        <Manipulation />

                        {/*List*/}
                        <TaskList />
                    </div>
                </div>  
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        editTask: state.editTask
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm())
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task))
        },
        openForm(){
            dispatch(actions.openForm())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
