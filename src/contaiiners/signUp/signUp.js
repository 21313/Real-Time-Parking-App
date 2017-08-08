import React from 'react';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';


const style = {
    height: 300,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            fName: null,
            lName: null,
            email: null,
            password: null
        }
    }
    signUp(ev) {
        ev.preventDefault();
        var fName = this.state.fName;
        var lName = this.state.lName;
        var email = this.state.email;
        var password = this.state.password;
        console.log(fName, lName, email, password)
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (err) {
            alert(err);
        }).then(
            () => {firebase.auth().currentUser.updateProfile({ fName: fName, lName: lName })
             browserHistory.push('main')
        const user = firebase.auth().currentUser;
        console.log(user);
        if (user) {
            firebase.database().ref('users' + '/' + user.uid).set({
                fName: fName,
                lName: lName,
                email: email,
                password: password,
                typeOfUser: 'user'
            })
        }
            })

    }
    render() {
        return (
            <div>
                <form onSubmit={this.signUp.bind(this)}>
                    <center> <Paper style={style} zDepth={3}>
                        <br />
                        <TextField
                            hintText="First Name "
                            onChange={(e) => (
                                this.setState({
                                    fName: e.target.value
                                })
                            )}
                            required
                        /><br />
                        <TextField
                            hintText="Last Name "
                            onChange={(e) => (
                                this.setState({
                                    lName: e.target.value
                                })
                            )}
                            required
                        /><br />
                        <TextField
                            hintText="Email "
                            onChange={(e) => (
                                this.setState({
                                    email: e.target.value
                                })
                            )}
                            type='email'
                            required
                        /><br />
                        <TextField
                            hintText="*******"
                            onChange={(e) => (
                                this.setState({
                                    password: e.target.value
                                })
                            )}
                            type='password'
                            required
                        /><br />
                        <RaisedButton label="Sign Up" type="submit" />
                    </Paper>
                    </center>
                </form>
            </div>
        );
    }
}