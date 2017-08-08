import React from 'react';
import * as firebase from 'firebase';
import NavBar from '../navBar/navBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';


const style = {
    height: 300,
    width: 400,
    margin: 20,
    textAlign: 'left',
    display: 'inline-block',
    paddingLeft: 40
};



export default class AddBooking extends React.Component {
    constructor() {
        super();
        this.state = {
            date : new Date(),
            startingTime : '',
            endingTime : ''
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
    addLoc(ev) {
        ev.preventDefault();
        let date = this.state.date;
        let startingTime = this.state.startingTime;
        startingTime.setDate(date.getDate());
        startingTime.setMonth(date.getMonth());
        startingTime.setFullYear(date.getFullYear());
        let endingTime = new Date(this.state.endingTime);
        endingTime.setDate(date.getDate());
        endingTime.setMonth(date.getMonth());
        console.log(endingTime.setFullYear(date.getFullYear()));

        // let getDate = date.getDate();
        // console.log("DAte" + getDate);
        // let getMonth = date.getMonth() + 1;
        // console.log('Month' + getMonth)
        // let getFullYear = date.getFullYear();
        // console.log('year' + getFullYear)
        // let startHours = startingTime.getHours();
        // let startMinutes = startingTime.getMinutes();
        // let endHours = endingTime.getHours();
        // let endMinutes = endingTime.getMinutes();

        let userId = firebase.auth().currentUser.uid;
        console.log(userId)
        firebase.database().ref('bookings').push({
            startTime: String(startingTime) ,
            endTime: String(endingTime),
            uid: userId
        })

    }
    render() {
        return (
            <div>
                <NavBar />
                <center>
                    <Paper style={style} zDepth={2} >
                    <h2>Booking Slot</h2>
                    <form onSubmit={this.addLoc.bind(this)}>
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
                        <RaisedButton type='submit' label="Reserve Slot" primary={true} />
                    </form>
                </Paper> </center>
            </div>
        );
    }
}