import React, { Component } from 'react';


export default class BioInfo extends Component {
    render(){
        
        var title = this.props.title ? this.props.title : "Titleless"
        var culture = this.props.culture ? this.props.culture : "Cultureless"
        var dateOfBirth = this.props.dateOfBirth ? this.props.dateOfBirth : "No birthday :C"
        var gender = "No gender";
        if(this.props.isMale){
            if(Number(this.props.isMale)){
                gender = "male"
            }
            else{
                gender = "female"
            }
        }

        return(
            <div
            className = "bioInfo"
            style={{'padding':'1em'}}
            >
            <p>Title: {title }</p>
            <p>Gender: {gender}</p>
            <p>Culture: {culture}</p>
            <p>Birth Date: {dateOfBirth}</p>
            </div>
        );
    }
}

BioInfo.defaultProps = {
    title : "No one selected", 
    gender : "No one",
    culture : "from somewhere else",
    dateOfBirth : "None"
}