import React, { Component } from 'react'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parts: [],
      isLoading: false,
      isError: false
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('http://localhost:5000/api/bestand')
    if (response.ok) {
      const parts = await response.json()
      this.setState({ parts, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

render() {
    const { parts, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return parts.length > 0
      ? (
        <table className="table" id="tblData"  >
          <thead>
            <tr>
              {this.renderTableHeader()}
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
          <td>{part.SKU}</td>
        </tr>
      )
    })
  }
}
export default Table