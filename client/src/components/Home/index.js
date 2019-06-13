import React, { Component } from 'react';
import SearchHeader from '../../hoc/search_header'

class Home extends Component {

    componentDidMount() {
        document.title = "FNS Researcher Profiles"
    }

    render() {
        return (
           <>
            <SearchHeader >
            
            </SearchHeader>
           </>
        );
    }
}

export default Home;