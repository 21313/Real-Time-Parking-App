import React from 'react';
import * as firebase from 'firebase';
import NavBar from '../navBar/navBar';


export default class Admin extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                <center><h1>Admin Panel</h1></center> 
            </div>
        );
    }
}