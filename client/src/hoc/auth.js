import React, { Component } from 'react';
import {connect} from 'react-redux'

import {auth} from '../actions/user_actions'
import { CircularProgress, LinearProgress } from '@material-ui/core'

export default function(ComposedClass, reload, adminRoute) {
    class AuthenticationCheck extends Component {

        state ={
            loading: true
        }

        componentDidMount(){
            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.userData
                
                if (!user.isAuth) {
                    
                    if (reload) {
                        if (this.props.location.pathname === '/') {
                            this.props.history.push('/home')
                        } else {
                            this.props.history.push('/login')
                        }
                        
                    }
                } else {
                    if (adminRoute && !user.isAdmin) {
                        this.props.history.push('/')
                    } else {
                        if (reload === false) {
                            this.props.history.push('/')
                        }
                    }
                }
                
                this.setState({loading: false})
            })
        }

        render() {
            if(this.state.loading) {
                return (
                    <div className="progress">
                        <CircularProgress thickness={5}  size={40} variant="indeterminate"/>
                    </div>
                );
            }
            return (
                <div>
                    <ComposedClass {...this.props} user={this.props.user}/>
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}



