import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link, browserHistory } from 'react-router';
import * as mat from 'material-ui';
import * as firebase from 'firebase';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
injectTapEventPlugin();

let style = {
    button: {
        color: '#fafbfc',
        fontFamly: 'Verdana'
    },
};

export default class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            showMenuIconButton: false,
            email: null,
            name: null,
            open: false,
            userId: null
        }
    }
    handleToggle = () => this.setState({ open: !this.state.open });

    handleClose = () => this.setState({ open: false });

    handleFunc = () => {browserHistory.push('addLocation')};

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', snap => {
                    let obj = snap.val();
                    console.log(obj.fName);
                    this.setState({ name: obj.fName + " " + obj.lName, typeOfUser: obj.typeOfUser, showMenuIconButton: true, email: firebase.auth().currentUser.email, userId: firebase.auth().currentUser.uid })
                })
            }
            else {
                this.setState({ showMenuIconButton: false })
            }
        })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        onLeftIconButtonTouchTap={this.handleToggle}
                        title="Real Time Car Booking App"
                        iconElementRight={
                            <span>
                                {!this.state.email ?
                                    <Link to="/signup">
                                        <mat.FlatButton style={style.button} label="Sign Up" />
                                    </Link>
                                    :
                                    <span>
                                        <mat.FlatButton style={style.button} label={"Welcome " + this.state.name} />
                                        <Link to="/" onClick={() => firebase.auth().signOut()}>
                                            <mat.FlatButton style={style.button} label="Sign Out" />
                                        </Link>
                                    </span>
                                }
                            </span>
                        }
                        showMenuIconButton = {this.state.showMenuIconButton}
                    />
                </MuiThemeProvider>
                {this.props.children}
                <div>
                    {(this.state.typeOfUser === 'user') ?
                        <Drawer
                            docked={false}
                            width={200}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({ open })}
                        >
                           <Link to='/viewlocation'> <MenuItem onTouchTap={this.handleClose}>View Location</MenuItem> </Link>
                        </Drawer>
                        : <Drawer
                            docked={false}
                            width={200}
                            open={this.state.open}
                            onRequestChange={(open) => this.setState({ open })}
                        >
                          <Link to='/addLocation'>  <MenuItem  onTouchTap={this.handleClose}>Add Location</MenuItem> </Link>
                          <Link to='/viewLocation'>  <MenuItem  onTouchTap={this.handleClose}>View Location</MenuItem> </Link>
                          
                        </Drawer>

                    }
                </div>
            </div>

        );
    }
}









