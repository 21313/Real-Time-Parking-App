import React from 'react';
import * as firebase from 'firebase';
import NavBar from '../navBar/navBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';


export default class ViewLocation extends React.Component{
    constructor(){
        super();
        this.state = {
            array : [],
            keys : []
        }
    }
    componentDidMount(){
        firebase.database().ref('addLocations/').on('value',snap=>{
            let locData = snap.val();
            console.log(locData);
            let array = [];
            let keys = [];
            for(let key in locData){
                array.push(locData[key]);
                keys.push(key)
                console.log(array);
                console.log(keys);                
            }
            this.setState({array : array, keys : keys})
        });
    }
    render(){
        return(
            <div>
                <NavBar/>
                <center><h1>View Location</h1></center>
                {this.state.array.map((data,index) => {
                    return(    
                    <span key={index}>
                    <Link to={'/viewslot?key='+this.state.keys[index]}>
                    <RaisedButton style={{textAlign : 'center'  , margin : 100, padding : 10}} label={data.location} primary={true}>
                     </RaisedButton>
                        </Link>
                        {  console.log(data.location, data.slot) }   
                    </span>
                    
                    )
                })}
            </div>
        );
    }
}