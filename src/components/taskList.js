import React, { Component } from 'react';
import TaskItem from './taskItem';
import * as actions from './../training/actions/index';
import {connect} from 'react-redux'

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value; 
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }

    render() {
        var {tasks, filterTable, keyword, sort} = this.props; // ~ var tasks = this.props.tasks;
        if(filterTable.name){
            tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
            })
        }
        tasks = tasks.filter((task)=>{
            if(filterTable.status === -1){
                return task;
            } else {
                return task.status === (filterTable.status === 1 ? true : false);
            }
        })

        if(keyword){
            console.log(keyword);
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
            })
        }

        if(sort.by === 'name'){
            tasks.sort((a, b) => {
                var eleNameA = a.name.toLowerCase();
                var eleNameB = b.name.toLowerCase();
                if(eleNameA>eleNameB) return sort.value;
                else if(eleNameA<eleNameB) return -sort.value;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if(a.status<b.status) return sort.value;
                else if(a.status>b.status) return -sort.value;
                else return 0;
            })
        }
        
        var { filterName, filterStatus } = this.state;
        var eleTasks = tasks.map((task, index) => {
            return <TaskItem 
                key={task.id} 
                index={index} 
                task={task} 
                onModifyItem = {this.props.onModifyItem}
            />
        })
        return (
            <table className="table table-bordered table-hover mt-15">
                <thead>
                    <tr>
                        <th className="text-center">No</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                name="filterName" 
                                className="form-control" 
                                value={filterName}
                                onChange={this.onChange}
                            />
                        </td>

                        <td>
                            <select 
                                name="filterStatus" 
                                className="form-control"
                                value={filterStatus}
                                onChange={this.onChange}
                            >
                                <option value={-1}>All</option>
                                <option value={0}>Hide</option>
                                <option value={1}>Active</option>
                            </select>
                        </td>

                        <td></td>
                    </tr>

                    {eleTasks}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
