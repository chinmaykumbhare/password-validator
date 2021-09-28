import React, { Component } from 'react'

const regForPassword = new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$');

let nameObj = "";
let emailObj = "";
let data;

export class Password extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: null,
            errors: {
                password:''
            }
        };
    }

    componentDidUpdate() {
        const {name, email} = this.props;
        nameObj = name;
        emailObj = email;
        //console.log(nameObj);
        //console.log(emailObj);
    }

    handler = (event) => {
        const {name, value} = event.target;
        data = value;
        // console.log("data[0]: " +data[0]);
        // console.log(data.charCodeAt(0));
        let errors = this.state.errors;

        switch(name) {
            case 'password':
                errors.password = regForPassword.test(value) ? '' : 
                'password must follow the specified format';

                //Logic for firstname || lastname
                errors.password = (value.toUpperCase().includes(nameObj.toUpperCase()) ? 
                'password must not contain your name'
                : "");

                //logic for 3 sequential characters
                if(errors.password === "") {
                    // let data = this.state.password;
                    let flag = false;
                    let flag2 = false;
                    if(data !== null) {
                        for(let loop = 0; loop < (data.length) - 2; loop++) {
                            //logic for sequential characters
                            /*
                            flag = (data.charCodeAt(loop) === (data.charCodeAt(loop+1) - 1));
                            flag2 = (data.charCodeAt(loop+1) === (data.charCodeAt(loop+2) - 1));
                            errors.password = ((flag && flag2)) ? "password must not contain sequential letters" : "";
                            */
                            if(data[loop] !== NaN) {
                               flag = (parseInt(data[loop]) === parseInt(data[loop + 1] - 1));

                               if(flag) {
                                   flag2 = (parseInt(data[loop + 1]) === parseInt(data[loop + 2] - 1));
                               }

                               errors.password = ((flag && flag2)) ? "password must not contain sequential numbers" : "";
                            }
                        }
                    }
                }
                break;
            default:
                break;

        }

        this.setState({errors,[name]: value}, () => {
            // console.log(errors);
        })
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                Password:&nbsp; <input type="password" name="password" id="password" onChange={this.handler}/><br/> {errors.password.length>0 && 
                <span style={{color:'orange'}}>{errors.password}</span>}<br/>
            </div>
        )
    }
}

export default Password;
