import React  from 'react';
import axios from 'axios';

// include export to import to app.js
export class Read extends React.Component{

    //object that handles the data for our components
    state = {
        //json data for products
        products: []
    };

    //axios pulls json data from the link instead of hardcoding data
    componentDidMount(){
        axios.get('http://localhost:5000/products')    
        .then(response =>{
            this.setState({products: response.data})
        })
        //catch for when an error occurs
        .catch(
            (error)=>{
                console.log(error);
            }    
        );
    }










}