import React, { Component } from 'react'



class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bestand: [],
            isLoading: true,
            isError: false,
        };
    }

    

    async componentDidMount() {
        this.setState({isLoading:true})

        const response = await fetch("http://localhost:5000/api/bestand")

        if(response.ok){
            const bestand = await response.json()
            console.log(bestand)
            this.setState({bestand: bestand, isLoading:false})
        }else{
            this.setState({isError:true, isLoading:false})
        }
      }

      
    renderTableHeader = () => {
          return Object.keys(this.state.bestand[0]).map(attr => <th key={attr}>
             {attr.toUpperCase()}
             </th>)
        }

    renderTableRows = () => {
          return this.state.bestand.map(part => {
              return(
                  <tr key={part.id}>
                      <td>{part.id}</td>
                      <td>{part.Teilenummer}</td>
                      <td>{part.Hersteller}</td>
                      <td>{part.Beschreibung}</td>
                      <td>{part.Price}</td>
                      <td>{part.SKU}</td>
                  </tr>
              )
          })
    }

    render() {
        const {bestand, isLoading, isError } = this.state;

        if(isLoading){
            return <div>Loading...</div>
        }
        if(isError){
            return <div>Error...</div>
        }

        return bestand.length > 0
        ? (
           <table>
               <thead>
                   <tr>
                       {this.renderTableHeader()}
                   </tr>
               </thead>
               <tbody>
                   {this.renderTableRows()}
               </tbody>
           </table>
        ):(
            <div>No Items..</div>
        )
    }
}


export default Table