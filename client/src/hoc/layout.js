import React, { Component } from 'react';
import Header from '../components/Header_footer/Header/index'

class Layout extends Component {

    state = {
        headerclass: ""
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        let scroll = window.pageYOffset
            if (scroll > 0) {
            
                this.setState({headerclass: "active"})
            }
            else {
                this.setState({headerclass: ""})
            }
            
    }
    

    render() {
        return (
            <div>
                <Header headerclass={this.state.headerclass}/>
                <div className="page_container" style={
                    {marginLeft: 240}
                }>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;