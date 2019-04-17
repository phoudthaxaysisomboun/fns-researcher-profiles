import React, { Component } from 'react';
import PrimarySearchAppBar from '../components/Header_footer/Header/index'

class Layout extends Component {
    render() {
        return (
            <div>
                <PrimarySearchAppBar/>
                <div className="page_container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;