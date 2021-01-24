import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../training/actions/index';
class Sort extends Component {
    constructor(props){
        super(props);
        this.state = {
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

    onSort = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }
    render() {
        var {sort} = this.props;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button 
                        type="button" 
                        className="btn btn-primary dropdown-toggle"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                    >
                        Sort<span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onSort('name', 1)}>
                            <a 
                                className={(sort.by === 'name' && sort.value === 1) ? "sort_selected" : ''}
                                role="button"
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Name A-Z
                                </span>
                            </a>
                        </li>

                        <li onClick={() => this.onSort('name', -1)}>
                            <a
                                className={(sort.by === 'name' && sort.value === -1) ? "sort_selected" : ''} 
                                role="button"
                            >
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Name Z-A
                                </span>
                            </a>
                        </li>

                        <li className="divider" role="separator"></li>

                        <li onClick={() => this.onSort('status', 1)} >
                            <a
                                role="button"
                                className={(sort.by === 'status' && sort.value === 1) ? "sort_selected" : ''}
                            >
                                Status Active
                            </a>
                        </li>

                        <li onClick={() => this.onSort('status', -1)}>
                            <a 
                                role="button"
                                className={(sort.by === 'status' && sort.value === -1) ? "sort_selected" : ''}
                            >
                                Status Hide
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Sort);

