import React from 'react';
import * as firebase from 'firebase';
import NavBar from '../navBar/navBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    height: 300,
    width: 400,
    margin: 20,
    textAlign: 'left',
    display: 'inline-block',
    paddingLeft : 40
};

export default class AddLocation extends React.Component {
    constructor() {
        super();
        this.state = {
            location: '',
            slots: ''
        }
    }
    addLoc(ev) {
        ev.preventDefault();
        let array = [];
        let noOfSlots = parseInt(this.state.slots);
        for(var i = 1; i < noOfSlots; i++){
            array.push({label : 'slot '+ i});
        }
        firebase.database().ref('addLocations/').push({
            location : this.state.location,
            slots : array
        });

    }
    render() {
        return (
            <div>
                <NavBar />
                <center><Paper style={style} zDepth={2} >
                    <h2>Add Location</h2>
                    <form onSubmit={this.addLoc.bind(this)}>
                        <TextField
                            floatingLabelText = "Location"
                            onChange={(e) => (
                                this.setState({
                                    location: e.target.value
                                })
                            )}
                            required
                        /><br />
                        <TextField
                            floatingLabelText = "No Of Slots"
                            onChange={(e) => (
                                this.setState({
                                    slots: e.target.value
                                })
                            )}
                            required
                        /><br />
                        <RaisedButton type='submit' label="Submit" primary={true} />
                    </form>
                </Paper> </center>
            </div>
        );
    }
}