import React, { Component } from 'react'

const regForEmail = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const regForName = RegExp(/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/);
const regForPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

export class Validation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            name: null,
            errors: {
                email:'',
                password:'',
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
            case 'password':
                errors.password = regForPassword.test(value) ? '' : 
                'password must follow the specified format';

                //Logic for firstname || lastname
                errors.password = (value.toUpperCase().includes(this.state.name.toUpperCase()) ? 
                'password must not contain your name'
                : '');

                //logic for 3 sequential characters
                if(errors.password === "") {
                    let data = this.state.password;
                    let flag = false;
                    let flag2 = false;
                    if(data !== null && data.length >= 8) {
                        console.log(parseInt(data[0]));
                        for(let loop = 0; loop < (data.length - 2); loop++) {
                            console.log(data[loop]);
                            if(data[loop] !== NaN) {
                               flag = (parseInt(data[loop]) === parseInt(data[loop + 1] - 1)) ? 
                               true : false;

                               if(flag) {
                                   flag2 = (parseInt(data[loop + 1]) === parseInt(data[loop + 2] - 1)) ? 
                                   true : false;
                               }

                               errors.password = ((flag && flag2)) ? "password must not contain sequential numbers" : ""; 
                            } else {

                            }
                        }
                    }
                }
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
            console.log(this.state.password);
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
                    Password:&nbsp; <input type="password" name="password" id="password" onChange={this.handler}/><br/> {errors.password.length>0 && 
                    <span style={{color:'orange'}}>{errors.password}</span>}<br/>
                    <input type="submit" value="submit" id="submit"/>
                </form>
            </div>
        )
    }
}

export default Validation;
