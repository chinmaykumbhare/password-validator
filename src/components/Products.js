import data from '../Products.json';

import React, { Component } from 'react'

export class Products extends Component {

    constructor(props) {
        super(props);
        this.state = ({proData: [], id: 0});
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({proData: data.products});
            // console.log(this.state.proData);
        }, 2000);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.id !== this.state.id) {
            alert("id's state has been changed!");
        }
    }

    componentWillUnmount() {
        alert("unloading component now!");
    }

    addID = () => {
        let id = this.state.id;
        id++;
        this.setState({id});
        console.log(this.state.id);
    }

    render() {
        return (
            <div>
                <h2>Products:</h2>
                <ul>
                    {this.state.proData.map((item, index) => {
                        // console.log(item.name);
                        return (
                            <li key={index}>{item.name}</li>
                        )
                    })}
                </ul>
                <button onClick={this.addID}>Add</button>
            </div>
        )
    }
}

export default Products;
