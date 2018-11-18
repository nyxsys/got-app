import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default class CharacterList extends Component{

    onSelectionChanged(){
        var selectedRows = this.gridApi.getSelectedRows();
        this.props.updateCharacter(selectedRows); //send changed row up for the state to be set
    }

    onGridReady(params) {
        this.gridApi = params.api;
    }

    render(){
        return(
            <div 
            className="ag-theme-balham"
            style={{ 
              height: '85vh', 
              width: '250px'}} 
              >
              <AgGridReact
                  columnDefs={this.props.characters.columnDefs}
                  rowSelection={this.props.rowSelection}
                  enableSorting={true}
                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  onGridReady={this.onGridReady.bind(this)}
                  rowData={this.props.characters.rowData}>
              </AgGridReact>

           </div>

        );
    }
}
