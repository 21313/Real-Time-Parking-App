import React from 'react';
import * as firebase from 'firebase';
import NavBar from '../navBar/navBar';

export default class Main extends React.Component{
    render(){
        return(
            <div>
                <NavBar/>
                Main Component Here.
            </div>
        );
    }
}