import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//please make this similar to Airplane.js. Implement POST for new Products.
// 10. UserProfile - Rash Purvi - Please work on this in Product.JS and Item.JS, this is added in pages that need admin filtering. Admin can add Product and edit Product.
class Products extends Component {
  constructor(){
    super();
    this.state ={
      products:[]
    }
    //this.fetchProducts = this.fetchProducts.bind(this);
    //this.handleProduct = this.handleProduct.bind(this);
    const fetchProducts = (c,p) => {
      const category = c;
      const pet_type = p;
      console.log(c);
      axios.get("https://pamper-my-pet.herokuapp.com/products.json").then((results) => {
        //console.log(results.data);

        const p_data = results.data;
        const listProducts = [];
        //console.log(p_data);

        for (let i = 0; i < p_data.length; i++){
          const productData = p_data[i];
            //console.log(productData)
          if (category === "" && pet_type === ""){
            listProducts.push(productData);//All product items
          } else if (category!== "" && pet_type === ""){
            if (productData.classification!==null && productData.classification === category ){
              listProducts.push(productData)//all pet_type and selected category
            }

          } else if (category==="" && pet_type!==null){
            if (productData.pet_type!==null && productData.pet_type === pet_type ){
              listProducts.push(productData)//all category and selected pet type
            }
          } else {
            //console.log('hi');
            // console.log(productData.classification);
            // console.log(category);
            // console.log(productData.pet_type);
            // console.log(pet_type);
            if((productData.classification === category) && (productData.pet_type === pet_type)){
              listProducts.push(productData);//selected category and pet_type
            }
          }
        }

        this.setState({products: listProducts})
        console.log("listProducts =" + listProducts);
      })

    };
    fetchProducts(this._handleChangeCategory,this._handleChangePetType);
  }


  // handleProduct(category, pettype){
  //   console.log(category, pettype);
  // }

  render () {
    return(
      <div>
        <p>
          <Link to="/">Home</Link>
        </p>
        //Seacrh.js form flight
        <h2>Products are coming soon</h2>
        <SearchForm onSubmit={ this.fetchProducts}/>
        <AllProduct products={ this.state.products }   />

      </div>
    );
  }
};

const AllProduct = (props) => {
  console.log("inside Flights = " + props.products.length)
  if (props.products.length === 0) {
    return '';
  } else {
    //console.log({props.products[]});
  }

}

class SearchForm extends Component {
  constructor(){
    super();
    this.state ={
      category: '',
      pettype: ''
    }

    this._handleChangeCategory = this._handleChangeCategory.bind(this);
    this._handleChangePetType = this._handleChangePetType.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChangeCategory(event){
    console.log(event.target.value);
    this.setState({ category: event.target.value});
    //console.log(this.state.category);
  };

  _handleChangePetType(event) {
    console.log(event.target.value);
    this.setState({pettype: event.target.value});
    //console.log(this.state.pettype);
  };
  _handleSubmit(event){
    event.preventDefault();
    console.log("hi");
    console.log(this.state.category);
    this.props.onSubmit(this.state.category, this.state.pettype);
    //this.props.onSubmit("TEST", "this.state.pettype");

  }
  render () {

    return (
      <div>
        <h3>Category/Classification</h3>
          <form onSubmit={this._handleSubmit} >
            <label>Category:</label>
              <select onChange={this._handleChangeCategory}>
                <option></option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="toys">Toys</option>
              </select>

            <label>Pet Type:</label>
              <select onChange={this._handleChangePetType}>
                <option></option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Fish">Fish</option>
              </select>

            // <label>Prize:</label>
            //   <select onChange={this._handleChangePrize}>
            //     <option></option>
            //     <option>0-25</option>
            //     <option>26-35</option>
            //     <option>36-50</option>
            //     <option>51-100</option>
            //   </select>
          <button type="submit">Shop Now!</button>



        </form>
      </div>
    );
  }
};

export default Products;
