import React, { Component } from 'react'

import '../css/Global.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'localhost:5000'

class ItemDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isError: false,
      show: false,
      activeRow: [],
      id: this.props.id,
      Teilenummer: '',
      SKU: '',
      Price: '',
      Hersteller: ''
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/bestand/${this.state.id}`, {
      credentials: 'include',
      withCredentials: true,
    })
    if (response.ok) {
      const parts = await response.json()
      this.setState({ Teilenummer: parts.Teilenummer,
                      SKU: parts.SKU,
                      Price: parts.Preis,
                      Hersteller: parts.Hersteller,
                      isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  deleteTableRow = async (id) => {
    await fetch(`${API_ENDPOINT}/api/bestand/${id}`, {
      credentials: 'include',
      method: 'DELETE',
    })
    const response = await fetch(`${API_ENDPOINT}/api/bestand`)
    if (response.ok) {
      const parts = await response.json()
      this.setState({
        Teilenummer: parts.Teilenummer,
        SKU: parts.SKU,
        Price: parts.Price,
        Hersteller: parts.Hersteller,
        isLoading: false
      })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  render() {
    
    return (
      <div>
        <form key={this.state.id} method='POST'>
          <div className='Teilenummer'>
            <label>
              Teilenummer:
              <br />
              <input
                type='JSON'
                className='teilenrinput'
                name='Teilenummer'
                id='Teilenummer'
                defaultValue={this.state.Teilenummer}
                required
              />
              <br />
              <br />
            </label>
          </div>

          <div className='SKU'>
            <label>
              SKU:
              <br />
              <input
                type='text'
                name='SKU'
                className='skuinput'
                id='SKU'
                defaultValue={this.state.SKU}
                required
              />
              <br />
              <br />
            </label>
          </div>

          <div className='Price'>
            <label>
              Preis:
              <br />
              <input
                type='text'
                name='Price'
                className='priceinput'
                id='Preis'
                defaultValue={this.state.Price}
                required
              />
              <br />
              <br />
            </label>
          </div>

          <div className='Hersteller'>
            <label>
              Hersteller:
              <br />
              <input
                list='manufacturers'
                name='Hersteller'
                id='Hersteller'
                className='herstellerinput'
                defaultValue={this.state.Hersteller}
                required
              ></input>
              <datalist id='manufacturers'>
                <option value='Volkswagen'>Volkswagen</option>
                <option value='Audi'>Audi</option>
                <option value='BMW'>BMW</option>
                <option value='Mercedes'>Mercedes</option>
                <option value='Opel'>Opel</option>
              </datalist>
            </label>
          </div>

          <div className='Beschreibung'>
            <label>
              Beschreibung:
              <br />
              <input
                type='text'
                name='Beschreibung'
                className='beschreibunginput'
                id='Beschreibung'
                defaultValue={this.state.Beschreibung}
                required
              />
              <br />
              <br />
            </label>
          </div>

          <input className='Eintragen-Button' type='submit' value='Update ' />

          <span id='response'></span>
          <button
            className='deleteButton'
            onClick={() => this.deleteTableRow(this.state.id)}
          >
            Delete
          </button>
        </form>
      </div>
    )
  }
}

export default ItemDetail