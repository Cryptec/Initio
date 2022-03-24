import React, { Component } from 'react'
import axios from 'axios'

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
      Preis: '',
      Hersteller: '',
      Beschreibung: ''
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch(`${API_ENDPOINT}/api/bestand/${this.props.id}`, {
      credentials: 'include'
    })
    if (response.ok) {
      const parts = await response.json()
      this.setState({ Teilenummer: parts.Teilenummer,
                      SKU: parts.SKU,
                      Preis: parts.Preis,
                      Hersteller: parts.Hersteller,
                      Beschreibung: parts.Beschreibung,
                      isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }


  deleteTableRow = async () => {
    await axios({
      method: 'DELETE',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/bestand/${this.props.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: this.state.id
      },
    }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
        return window.location.replace('/invoke')
      } else {
        this.setState({ isError: true, isLoading: false })
        return console.error()
      }
    })
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
                onChange={this.handleChange.bind(this)}
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
                onChange={this.handleChange.bind(this)}
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
                defaultValue={this.state.Preis}
                onChange={this.handleChange.bind(this)}
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
                onChange={this.handleChange.bind(this)}
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
                onChange={this.handleChange.bind(this)}
                required
              />
              <br />
              <br />
            </label>
          </div>

          <button className='Eintragen-Button' type='submit' >Update</button>

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

  handleChange(event) {
    const field = event.target.id;
  
    if (field === "Teilenummer") {
        this.setState({ Teienummer: event.target.value }); 
    } else if (field === "SKU") {
        this.setState({ SKU: event.target.value });
    } else if (field === "Preis") {
      this.setState({ Preis: event.target.value });
    } else if (field === "Hersteller") {
      this.setState({ Hersteller: event.target.value });
    } else if (field === "Beschreibung") {
      this.setState({ Beschreibung: event.target.value });
    }
  }
  handleSubmit(event) {
  event.preventDefault();

  axios({
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/edititem`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      id: this.state.id,
      Teilenummer: this.state.Teilenummer,
      SKU: this.state.SKU,
      Preis: this.state.Preis,
      Hersteller: this.state.Hersteller,
      Beschreibung: this.state.Beschreibung
    },
  }).then((response, props) => {
    console.log(response)
    if (response.data.success) {
      console.log('Successfully edited data')
      window.location.replace('/invoke')
    } else {
      return console.error()
    }
  })
}
  
}

export default ItemDetail