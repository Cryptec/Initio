import React, { Component } from 'react'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'localhost:5000'

class Userstable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: false,
      isError: false
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/users`, {credentials: 'include'})
    if (response.ok) {
      const users = await response.json()
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

render() {
    const { users, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return users.length > 0
      ? (
        <table className="table" id="tblData">
          <thead>
            <tr>
              <th style={{ borderTopLeftRadius: "4px" }}>ID</th>
              <th>Name</th>
              <th>email</th>
              <th style={{ borderTopRightRadius: "4px" }}></th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div>
          No users.
      </div>
      )
  }

renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => 
    <th key={attr} >
    {attr}
    </th>)
  }

renderTableRows = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td className="delButton" onClick={() => this.deleteTableRow(user.id)}>&#10005;</td>
        </tr>
      )
    })
  }


deleteTableRow = async (id) => {
    
  await fetch(`${API_ENDPOINT}/api/user/${id}`, {method: 'DELETE', credentials: 'include'})
  const response = await fetch(`${API_ENDPOINT}/api/users`)
  if (response.ok) {
    const users = await response.json()
    this.setState({ users, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
  }
}

export default Userstable