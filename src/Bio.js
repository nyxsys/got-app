import React, { Component } from 'react';
import BioInfo from './bio_components/bioInfo.js';
import CharacterList from './bio_components/characterList.js';
import charCsv from './characters.csv';

const parse = require('csv-parse');

export default class Bio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChar: {},
            characters : {
                columnDefs : [],
                rowData: []
            },
            filter : {
                popularity : "Popularity",
                alive : "Dead or not"
            },
            defaultCharacters : null
        }
    }

    componentDidMount() {
        var self = this;
        loadCharacters(function(table){
            self.setState(
                {
                    characters : table,
                    defaultCharacters : table
                }
                )

        });
    }

    updateCharacter(character){
        this.setState(
            {
                currentChar : character[0]
            }
        )
    }

    resetList(){
        this.setState(
            {
                characters : this.state.defaultCharacters,
                filter : {
                    popularity : "Popularity",
                    alive : "Dead or not"
                }
            }
        )
    }

    /*
        note that due to the random shuffle at the start, this is somewhat nondeterministic after each refresh
        this is due to many characters sharing 1 or 0 (top and bottom values) for popularity.
    */

    sortCharacters(){
        var popularity = this.state.filter.popularity === "pop dsc" ? "pop asc" : "pop dsc"
        var current = this.state.defaultCharacters.rowData.slice()
        var order = popularity === "pop asc" ? 1 : -1

        current.sort(function(a, b){
            var keyA = a.popularity,
                keyB = b.popularity;

            if(keyA < keyB) return order;
            if(keyA > keyB) return order * -1;
            return 0;
        });
        this.setState(
            {
                characters : {
                    columnDefs : this.state.defaultCharacters.columnDefs,
                    rowData : current
                },
                filter : {
                    popularity : popularity,
                    alive : "Dead or not"
                }
            }
        )
    }

    filterCharacters(){
        var alive = this.state.filter.alive === "dead" ? "alive" : "dead";
        var filter = alive === "alive" ? '1' : '0'; //set to match the isAlive value we're looking for
        var current = this.state.defaultCharacters.rowData
        var rowData = []

        
        for(var i in current){
            if(current[i].isAlive === filter){
                rowData.push(current[i]);
            }
        }

        this.setState(
            {
                characters : {
                    columnDefs : this.state.defaultCharacters.columnDefs,
                    rowData : rowData
                },
                filter : {
                    popularity : "Popularity",
                    alive : alive
                }
            }
        )
    }

    render () {
        
        const current = this.state.currentChar;



        return(
            <div
                className = "charcontainer"
                style={
                    {
                        "height":"100%",
                        "display":"flex",
                        'flexDirection':'row',
                    }
                    }>
                <div>  
                    <SortList
                    resetList = {this.resetList.bind(this)}
                    filterCharacters = {this.filterCharacters.bind(this)}
                    sortCharacters = {this.sortCharacters.bind(this)}
                    popularity = {this.state.filter.popularity}
                    alive = {this.state.filter.alive}
                    ></SortList>
                    <CharacterList
                    currentChar = {current}
                    characters = {this.state.characters}
                    updateCharacter = {this.updateCharacter.bind(this)}
                    rowSelection = "single"
                    ></CharacterList>
                </div>  
                <BioInfo
                title = {current.title} 
                isMale = {current.isMale}
                culture = {current.culture}
                dateOfBirth = {current.dateOfBirth}
                ></BioInfo>
            </div>
        );
    }
}

class SortList extends Component{

    render(){
        return(
        <div>
            <div>
            <button  onClick={this.props.resetList}>Clear</button>
            <button onClick={this.props.sortCharacters}>{this.props.popularity}</button>
            <button onClick={this.props.filterCharacters}>{this.props.alive}</button>
            </div>
        </div>
        )
    }
}


/*
    helper function that loads .csv file for characters into a
    resuable array and then randomizes it.
*/
function loadCharacters(callback){
    
    var request = new XMLHttpRequest();
    request.open("GET", charCsv, false);
    request.send(null);
    parse(request.responseText, {'columns':true}, function(err, data){
        var columnDefs = []

        var keys = Object.keys(data[0])

        for(var i = 0; i < keys.length; i++){
            var col = {
                headerName : keys[i],
                field : keys[i]
            }
            if(col.field !== "name"){
                col.hide = true
            }

            columnDefs.push(col)
        }

        for ( i = data.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }

        var characters = 
        {
            columnDefs : columnDefs,
            rowData: data
        };
        callback(characters);
    })
}