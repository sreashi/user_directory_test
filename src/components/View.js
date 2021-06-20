import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

import Edit from './Edit.js';



// const sortTypes = {
//     up: {
//       class: 'sort-up',
//       fn: (a, b) => a.country - b.country
//     },
//     down: {
//       class: 'sort-down',
//       fn: (a, b) => b.country - a.country
//     },
//     default: {
//       class: 'sort',
//       fn: (a, b) => a
//     }
//   }
 
 
class View extends Component {
     state = {
    isOpen: false,
    id: '',
    currentSort: 'default',
    
    
    }
    
    onSortChange = () => {
        const { currentSort } = this.state;
        let nextSort;
    
        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';
    
        this.setState({
            currentSort: nextSort
        })
    }

  onClose = () => {
    this.setState({ isOpen: false })
  }

  onOpen = () => {
    this.setState({ isOpen: true, id: this.props.id })
  }
 

  render() {
    const { isOpen, id ,currentSort} = this.state
    const { data, deleteRow, updateRow, getUserById } = this.props

      
      return ( data.length > 0 && (
      <div>
        <Edit
          onClose={this.onClose}
          isOpen={isOpen}
          id={id}
          updateRow={updateRow}
          getUserById={getUserById}
        />
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell onClick={this.onSortChange} >
          
                  Country</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(row => (
              <Table.Row key={row.name}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell >{row.country}</Table.Cell>
                <Table.Cell >{row.dob}</Table.Cell>
                <Table.Cell>{row.email}</Table.Cell>
                <Table.Cell>
                  <Button
                    content="Edit"
                    onClick={() => {
                      this.setState({ isOpen: true, id: row.name })
                    }}
                  />
                  <Button
                    content="Delete"
                    onClick={() => {
                      deleteRow(row.name)
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        
      </div>
      
    )
      )
  }
}

export default View
