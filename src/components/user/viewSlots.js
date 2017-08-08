import React from 'react';
import * as firebase from 'firebase';
import NavBar from '../navBar/navBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, browserHistory } from 'react-router';
import queryString from 'query-string';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Slot from './slot';



export default class ViewSlots extends React.Component {
    constructor() {
        super();
        this.state = {
            array: [],
            users: '',
            date: new Date(),
            startingTime: '',
            endingTime: '',
            open: false
        }
    }




    handleDate(event, date) {
        this.setState({
            date: date
        })
        console.log(date)
    }
    handleStartTime(event, time) {
        this.setState({
            startingTime: time
        })
    }
    handleEndTime(event, time) {
        this.setState({
            endingTime: time
        })
    }
 

    componentDidMount() {
        var a = this;
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log(user)
                var currentUser = firebase.auth().currentUser.uid;
                console.log(currentUser)
                firebase.database().ref('users').child(currentUser).on('value', snap => {
                    var type = snap.val().typeOfUser;
                    console.log(type);
                    a.setState({ users: type })
                })
            }
            else {
                alert('user Signout')
            }
        })
        var key = queryString.parse(window.location.search).key;
        firebase.database().ref('addLocations/' + key).on('value', snap => {
            let locData = snap.val();
            console.log(locData);
            this.setState({ obj: locData });
        });
    }
    render() {
        return (
            <div>
                <NavBar />
                <center><h1>{this.state.obj ? this.state.obj.location : 'location'}</h1></center>
                {this.state.users == 'admin' ?
                    this.state.obj && this.state.obj.slots.map((data, index) => {
                        return (
                            <div>
                                <RaisedButton key={index} label={data.label} primary={true} />
                            </div>
                        )
                    }) :
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {/* <Paper style={style} zDepth={2} > */}
                        <h2>Booking Slot</h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <DatePicker hintText="yyyy-mm-dd"
                                defaultDate={this.state.date}
                                onChange={this.handleDate.bind(this)}
                            />
                            <TimePicker
                                hintText="Starting Time"
                                onChange={this.handleStartTime.bind(this)}
                            />
                            <TimePicker
                                hintText="Ending Time"
                                onChange={this.handleEndTime.bind(this)}
                            />
                        </div>
                        <br />
                        {this.state.obj && this.state.obj.slots.map((data, index) => (
                                <Slot key={index} date={this.state.date} startingTime={this.state.startingTime} endingTime={this.state.endingTime} label={data.label}/>

                        ))}
                            {/* <span key={index}>
                                    <RaisedButton onClick={this.addBooking.bind(this)} label={data.label} primary={true} />
                                </span> */}
                    </div>
                }
            </div>
        );
    }
}



//https://parking-booking-system-16683.firebaseapp.com/user/sendfeedback