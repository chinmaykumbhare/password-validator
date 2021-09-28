import React, { Component } from 'react'
import Password from './Password';

const regForEmail = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const regForName = RegExp(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/);

export class Validation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            // password: null,
            name: null,
            errors: {
                email:'',
                // password:'',
                name:''
            }
        };
    }

    handler = (event) => {
        const {name, value} = event.target;
        let errors = this.state.errors;

        switch(name) {
            case 'email':
                errors.email = regForEmail.test(value) ? '' : 'email is not valid';
                break;
            case 'name':
                errors.name = regForName.test(value) ? '' : 'name is not valid';
                if(errors.name === "") {
                    this.setState({name: value});
                }
                break;
            default:
                break;

        }

        this.setState({errors,[name]: value}, () => {
            // console.log(errors);
        })
    }

    formSubmit = (event) => {
        event.preventDefault();
        if(this.validate(this.state.errors)) {
            alert("Valid Form");
            console.log(this.state.name);
            console.log(this.state.email);
            // console.log(this.state.password);
        } else alert("Invalid Form");
    }

    validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        return valid;
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <h2>Validation</h2>
                <form onSubmit={this.formSubmit}>
                    Name: <input type="text" name="name" id="name" onChange={this.handler}/><br/> {errors.name.length>0 &&
                    <span style={{color:'oranged'}}>{errors.name}</span>}<br/>
                    Email: <input type="text" name="email" id="email" onChange={this.handler}/><br/> {errors.email.length>0 &&
                    <span style={{color:'orange'}}>{errors.email}</span>}<br/>
                    <Password email={this.state.email} name={this.state.name}/>
                    <input type="submit" value="submit" id="submit"/>
                </form>
            </div>
        )
    }
}

export default Validation;
