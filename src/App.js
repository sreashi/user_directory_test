import React, { Component } from 'react';
import { Pagination } from 'semantic-ui-react';
import { Input, Container } from 'semantic-ui-react';
import Add from './components/Add';
import View from './components/View';


class App extends Component {
  initialState = {
    users: [
      { name: 'Sreashi', country: 'India', dob:'29th-Mar-1996',email:'sreashisaha1996@gmail.com' },
      { name: 'Riya', country: 'India', dob:'29th-May-1997',email:'riya1996@gmail.com' },
    
    ],
    results: [],
    query: '',
  }

  state = this.initialState

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      this.resetSearch()
    }
  }

  search = event => {
    const { users } = this.state
    const { value } = event.target

    this.setState({ query: value })

    const results = users.filter(user => {
      const regex = new RegExp(value, 'gi')
      return user.name.match(regex)
    })

    this.setState({ results })
  }

  resetSearch = () => {
    const { users, query } = this.state

    const results = users.filter(user => {
      const regex = new RegExp(query, 'gi')
      return user.name.match(regex)
    })

    this.setState({ results })
  }

  getUserById = id => {
    const { users } = this.state

    const u = users.filter(user => user.name === id)

    return u[0]
  }

  addRow = user => {
    const { users } = this.state

    this.setState({ users: [...users, user] })
  }

  updateRow = (id, updatedUser) => {
    const { users } = this.state

    this.setState({
      users: users.map(user => (user.name === id ? updatedUser : user)),
    })
  }

  deleteRow = id => {
    const { users } = this.state

    this.setState({
      users: users.filter(user => user.name !== id),
    })
  }
  
  

  render() {
 
    const { users, results, query } = this.state
    const data = results.length === 0 && !query ? users : results
    
return (
      <Container>
        <Add addRow={this.addRow} />
        <Input icon="search" onChange={this.search} placeholder="Search" />
        <View
          data={data}
          deleteRow={this.deleteRow}
          updateRow={this.updateRow}
          getUserById={this.getUserById}
        />

        <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={null}

    lastItem={null}
    siblingRange={1}
    totalPages={100}
  />
      </Container>
    )
  }
}

export default App;
