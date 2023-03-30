import React, { Component } from 'react'
import ItemDetail from './ItemDetail'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parts: [],
      isLoading: false,
      isError: false,
      show: false,
      activeRow: [],
      id: '',
      filter: ''
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/bestand/${this.state.filter}`, {credentials: 'include', withCredentials: true})
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
              <th>Beschreibung</th>
              <th>Stück</th>
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
  const filteredData = this.state.parts.filter((el) => {
    if (this.props.input === '') {
      return el
    } else {
      return el.Teilenummer.toLowerCase().includes(this.props.input) || el.Beschreibung.toLowerCase().includes(this.props.input) || el.SKU.toLowerCase().includes(this.props.input) 
    }
  })

    return filteredData.map((part) => {
      const Beschreibung = part.Beschreibung

      return (
        <tr key={part.id}>
          <td>{part.Teilenummer}</td>
          <td>{Beschreibung}</td>
          <td>{part.Supply}</td>
          <td>{part.Preis}€</td>
          <td>{part.SKU}<span className="editButton" onClick={() => this.toggle(part.id)}>&#9998;</span></td>
        </tr>
      )
    })
  }


toggle = async (id) => {
  const activeRow = `${id}`
  await this.setState({id: activeRow})
  this.setState((currentState) => ({ show: !currentState.show })) 
  console.log("this is" + this.state.id)
  }

editSection = (id) => {
    return (
      <div>
        <button className="detailClose" onClick={this.toggle}>&#10005;</button>

        <ItemDetail id={this.state.id} />
      </div>
    )
}
}



export default Table