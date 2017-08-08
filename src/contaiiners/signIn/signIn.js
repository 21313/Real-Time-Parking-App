import React from 'react';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory , Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const style = {
    height: 300,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};


class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: null,
            password: null
        }
    }
    signIn(ev) {
        ev.preventDefault();
        var email = this.state.email;
        var password = this.state.password;
        console.log(email, password);
        // const refRoot = firebase.database().ref();
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            alert(error);
            browserHistory.push('/')
            // ...
        }).then(() => {
            var user = firebase.auth().currentUser;
            console.log(user)
            if (user) {
                return firebase.database().ref('users/' + user.uid).once('value', snap => {
                    let userType = snap.val().typeOfUser;
                    console.log(userType)
                    if (userType === 'user') {
                        browserHistory.push('/main');
                        <MenuItem><Link to='/viewLocation'>View Location</Link></MenuItem>

                    }
                    else {
                        browserHistory.push('/admin');
                        <div>
                        <MenuItem><Link to='/addLocation'>Add Location</Link></MenuItem>
                        <MenuItem><Link to='/viewLocation'>View Location</Link></MenuItem>                          
                        </div>
                        
                    }
                })
            }
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.signIn.bind(this)}>
                    <center> <Paper style={style} zDepth={3}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <TextField
                            hintText="Email "
                            onChange={(e) => (this.setState({ email: e.target.value }))}
                        /><br />
                        <TextField
                            hintText="*******"
                            onChange={(e) => (this.setState({ password: e.target.value }))}

                        /><br />
                        <RaisedButton label="Login" type="submit" />
                    </Paper>
                    </center>
                </form>
            </div>
        );
    }
}

export default SignIn;