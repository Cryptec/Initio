import React, { Component } from 'react'
import ItemDetail from './ItemDetail'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parts: [],
      isLoading: false,
      isError: false,
      show: false,
      activeRow: []
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/bestand`, {credentials: 'include', withCredentials: true})
    if (response.ok) {
      const parts = await response.json()
      this.setState({ parts, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

render() {
    const { parts, isLoading, isError, show } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    if (show === true) {
       return this.state.show && this.editSection()
    }

    return parts.length > 0
      ? (
        <table className="table" id="tblData" >
          <thead>
            <tr>
              <th style={{borderTopLeftRadius: "4px"}}>Teilenummer</th>
              <th>Hersteller</th>
              <th>Beschreibung</th>
              <th>Preis</th>
              <th style={{borderTopRightRadius: "4px"}}>SKU</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}

          </tbody>
        </table>
      ) : (
        <div>
          No parts.
      </div>
      )
  }

renderTableHeader = () => {
    return Object.keys(this.state.parts[0]).map(attr => 
    <th key={attr} >
    {attr}
    </th>)
  }

renderTableRows = () => {
    return this.state.parts.map(part => {
      return (
        <tr key={part.id}>
          <td>{part.Teilenummer}</td>
          <td>{part.Hersteller}</td>
          <td>{part.Beschreibung}</td>
          <td>{part.Preis}</td>
          <td>{part.SKU}<span className="editButton" onClick={part => this.toggle(part)}>&#9998;</span></td>
        </tr>
      )
    })
  }

deleteTableRow = async (id) => {
    
  await fetch(`${API_ENDPOINT}/api/bestand/${id}`, { credentials: 'include', method: 'DELETE'})
  const response = await fetch(`${API_ENDPOINT}/api/bestand`)
  if (response.ok) {
    const bestand = await response.json()
    this.setState({ bestand, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
}


toggle = async (part) => {
  const activeRow = part
  await this.setState({activeRow: activeRow})
  this.setState((currentState) => ({ show: !currentState.show })) 
  console.log("this is" + this.state.activeRow)
  }

editSection = (id) => {
    return (
      <div>
        <button className="detailClose" onClick={this.toggle}>&#10005;</button>

        <ItemDetail id={id} />
      </div>
    )
}
}



export default Table