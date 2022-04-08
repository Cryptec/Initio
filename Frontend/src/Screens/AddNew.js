import React, { Component } from 'react'
import axios from 'axios'
import Sidebar from '../Components/Sidebar'
import Table from '../Components/Table'
import ImagePlaceholder from '../Assets/imageplaceholder.png'


import '../css/Global.css'
import '../css/AddNew.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class New extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Teilenummer: '',
      SKU: '',
      Hersteller: '',
      Preis: '',
      Beschreibung: '',
      Supply: '',
      file: 'null',
      preview: null, 
      answerOk: 'Success',
      answerDenied: 'Denied',
      count: 0,
      inputText: ''
    }
  }

  componentDidMount = async () => {
    this.setState({
      preview: ImagePlaceholder
    })
  }

  removeImage = () => {
    document.getElementById('image').value = null
    this.setState({ preview: ImagePlaceholder, file: 'null' })
  }

  render() {
    return (
      <div>
        <Sidebar />
        <div className="container">
          <div className="box-wrapper">
            <div id="box2">
              
              <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                
                <div className="Teilenummer">
                  <label>
                    Teilenummer:
                    <br />
                    <input
                      type="JSON"
                      className="teilenrinput"
                      name="Teilenummer"
                      id="Teilenummer"
                      value={this.state.Teilenummer}
                      onChange={this.handleChange.bind(this)}
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
                      value={this.state.SKU}
                      onChange={this.handleChange.bind(this)}
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
                      value={this.state.Preis}
                      onChange={this.handleChange.bind(this)}
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
                      value={this.state.Hersteller}
                      onChange={this.handleChange.bind(this)}
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

                <div className="Supply">
                  <label>
                    Lager:
                    <br />
                    <input
                      type="text"
                      name="Supply"
                      className="supplyinput"
                      id="Supply"
                      value={this.state.Supply}
                      onChange={this.handleChange.bind(this)}
                      required
                    />
                    <br />
                    <br />
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
                      value={this.state.Beschreibung}
                      onChange={this.handleChange.bind(this)}
                      required
                    />
                    <br />
                    <br />
                  </label>
                </div>

                <div className='ItemPreview'>
                  <div
                    type='button'
                    className='imgDelButton'
                    onClick={() => this.removeImage()}
                  >
                    &#x2715;
                  </div>

                  <div className='imageWrapper' style={{ marginTop: '-25px' }}>
                    <img
                      src={this.state.preview}
                      className='imagePreview'
                      alt=''
                    />
                  </div>
                </div>
                <br />
                <fieldset style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}>
                  <legend>Image:</legend>
                  <input
                    id='image'
                    type='file'
                    name='file'
                    onChange={this.handleChange.bind(this)}
                  />
                </fieldset>

                <input
                  className="Eintragen-Button"
                  type="submit"
                  value="Anlegen "
                />

                <span id="response"></span>
                <button className="exportieren">Exportieren</button>
              </form>
            </div>

            <div id="box3" style={{ overflow: 'hidden' }}>
              <div id="box4" style={{ overflowY: 'hidden' }}>
                <Table input={this.state.inputText} key={this.state.count} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleChange(event) {
    const field = event.target.id
    if (field === 'Teilenummer') {
      this.setState({ Teilenummer: event.target.value })
    } else if (field === 'SKU') {
      this.setState({ SKU: event.target.value })
    } else if (field === 'Hersteller') {
      this.setState({ Hersteller: event.target.value })
    } else if (field === 'Supply') {
      this.setState({ Supply: event.target.value })
    } else if (field === 'Preis') {
      this.setState({ Preis: event.target.value })
    } else if (field === 'Beschreibung') {
      this.setState({ Beschreibung: event.target.value })
    } else if (field === 'image') {
      this.setState({
        preview: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      })
    } 
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ status: 'Submit' })
    let data = new FormData()
    data.append('Teilenummer', this.state.Teilenummer)
    data.append('SKU', this.state.SKU)
    data.append('Hersteller', this.state.Hersteller)
    data.append('Preis', this.state.Preis)
    data.append('Beschreibung', this.state.Beschreibung)
    data.append('Supply', this.state.Supply)
    data.append('file', this.state.file)

    axios({
      method: 'POST',
      withCredentials: true,
      credentials: 'iclude',
      url: `${API_ENDPOINT}/api/bestand`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: data,
    }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
        this.setState({
          Teilenummer: '',
          SKU: '',
          Hersteller: '',
          Preis: '',
          Beschreibung: '',
          Supply: '',
          file: '',
          preview: ImagePlaceholder,
          count: this.state.count + 1
        }) 
        return console.log('Success')
      } else if (response.data.answer === this.state.answerDenied) {
        this.setState({
          Teilenummer: '',
          SKU: '',
          Hersteller: '',
          Preis: '',
          Beschreibung: '',
          Supply: '',
          file: ''
        })
        return console.log('Failed adding articles')
      }
    })
  }
}

export default New