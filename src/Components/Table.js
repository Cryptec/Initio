import React, { Component } from 'react'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parts: [],
      isLoading: false,
      isError: false,
      show: false
    }
  }


async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/bestand`)
    if (response.ok) {
      const parts = await response.json()
      this.setState({ parts, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  editSection = () => {
    return this.state.parts.map(part => {
      return (
        <div id={part.id}>
          <button className="detailClose" onClick={this.toggle}>&#10005;</button>

          <form key={part.id} method="POST">

            <div className="Teilenummer">
              <label>
                Teilenummer:
                    <br />
                <input
                  type="JSON"
                  className="teilenrinput"
                  name="Teilenummer"
                  id="Teilenummer"
                  value={part.Teilenummer}
                  required
                />
                <br />
                <br />
              </label>
            </div>

            <div className="SKU">
              <label>
                SKU:
                    <br />
                <input
                  type="text"
                  name="SKU"
                  className="skuinput"
                  id="SKU"
                  value={part.SKU}
                  required
                />
                <br />
                <br />
              </label>
            </div>

            <div className="Price">
              <label>
                Preis:
                    <br />
                <input
                  type="text"
                  name="Price"
                  className="priceinput"
                  id="Preis"
                  value={part.Preis}
                  required
                />
                <br />
                <br />
              </label>
            </div>

            <div className="Hersteller">
              <label>
                Hersteller:
                    <br />
                <input
                  list="manufacturers"
                  name="Hersteller"
                  id="Hersteller"
                  className="herstellerinput"
                  value={part.Hersteller}
                  required
                ></input>
                <datalist id="manufacturers">
                  <option value="Volkswagen">Volkswagen</option>
                  <option value="Audi">Audi</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                  <option value="Opel">Opel</option>
                </datalist>
              </label>
            </div>

            <div className="Beschreibung">
              <label>
                Beschreibung:
                    <br />
                <input
                  type="text"
                  name="Beschreibung"
                  className="beschreibunginput"
                  id="Beschreibung"
                  value={part.Beschreibung}
                  required
                />
                <br />
                <br />
              </label>
            </div>

            <input
              className="Eintragen-Button"
              type="submit"
              value="Update "
            />

            <span id="response"></span>
            <button className="deleteButton" onClick={() => this.deleteTableRow(part.id)}>Delete</button>
          </form>
        </div>
      )
    })
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
        <tr key={part.id} onClick={this.toggle}>
          <td>{part.Teilenummer}</td>
          <td>{part.Hersteller}</td>
          <td>{part.Beschreibung}</td>
          <td>{part.Preis}</td>
          <td>{part.SKU}</td>
        </tr>
      )
    })
  }

deleteTableRow = async (id) => {
    
  await fetch(`${API_ENDPOINT}/api/bestand/${id}`, {method: 'DELETE'})
  const response = await fetch(`${API_ENDPOINT}/api/bestand`)
  if (response.ok) {
    const users = await response.json()
    this.setState({ users, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
}


  toggle = (id) => {
    
   this.setState((currentState) => ({ show: !currentState.show }))
    
}
}



export default Table