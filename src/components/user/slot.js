
import React from 'react';
import * as firebase from 'firebase';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';





export default class Slot extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    addBooking(ev) {
        ev.preventDefault();
        console.log(this.props);
        
        let date = this.props.date;
        let startingTime = this.props.startingTime;
        startingTime.setDate(date.getDate());
        startingTime.setMonth(date.getMonth());
        startingTime.setFullYear(date.getFullYear());
        let endingTime = this.props.endingTime;
        endingTime.setDate(date.getDate());
        endingTime.setMonth(date.getMonth());
        console.log(endingTime.setFullYear(date.getFullYear()));
        let userId = firebase.auth().currentUser.uid;
        console.log(userId);
        firebase.database().ref('bookings').push({
            startTime: String(startingTime),
            endTime: String(endingTime),
            uid: userId
        })
    }
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.addBooking.bind(this)}
            />,
        ];
        return (
            <div>
                <RaisedButton label={this.props.label} onTouchTap={this.handleOpen} >
                    <Dialog
                        title="Dialog With Actions"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        Are You Sure ?
                                </Dialog>
                </RaisedButton>
            </div>
        );
    }
}