import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav.js';
import Footer from './Footer.js';
import UserProfile from './UserProfile';
import AddToCart from './AddToCart';

class Item extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: []
    }

    const product_id = this.props.match.params.id;
    const URL = "https://pamper-my-pet.herokuapp.com/products/" + product_id + ".json"
    const fetchProduct = () => {
      axios.get(URL).then((results) => {
        //console.log(results.data);
        this.setState({item: results.data});
      })
    };
    fetchProduct();
  }

  render () {
    const isAdmin = UserProfile.getAdmin();
    return (
      <div>
      <Nav />
      <Details item={this.state.item} />
      {
        isAdmin
        ?  <p><Link to={"/editproduct/" + this.state.item.id } >Edit Product</Link></p>
        : ''
      }
      <Footer />
      </div>
    );
  }
};

class Details extends Component {

  constructor(){
    super();
    this.state = {
      quantity : 1
    }
    this._handleChange = this._handleChange.bind(this);
    this._handleCart = this._handleCart.bind(this);
    this._handleBuy = this._handleBuy.bind(this);
  }

  _handleChange(event){
    event.preventDefault();
    this.setState({quantity: event.target.value})
  }

  _handleCart(event){
    event.preventDefault();
    AddToCart.setCart(this.props.item.id, this.props.item.name, this.props.item.image, this.props.item.price, this.state.quantity);
  }

  _handleBuy(event){
    event.preventDefault();
    AddToCart.setCart(this.props.item.id, this.props.item.name, this.props.item.image, this.props.item.price, this.state.quantity);
  }

  createQuantitySelect() {
    const stockLimit = this.props.item.stock;
    if (stockLimit === 0) return;
  
    let items = [];
    for (let i = 1; i <= stockLimit; i++) {
      items.push(<option key={i} value={i}>{i}</option>);
    }
    return items;
  }

  render(){

    const isOutOfStock = this.props.item.stock === 0;
    const userPresent = UserProfile.getEmail() === "";

    return(
      <div>
      <div>
      <img src={this.props.item.image}/>
      <p><strong>Name:</strong>{this.props.item.name}</p>
      <p><strong>Price: </strong> AUD {this.props.item.price}</p>
      <p><strong>Description: </strong>{this.props.item.description}</p>
      <p><strong>Size: </strong>{this.props.item.size}</p>
      <p><strong>Color: </strong>{this.props.item.color}</p>
      <p><strong>Stock: </strong>{isOutOfStock ? 'Out of Stock' : 'Available'}</p>
      <p><strong>Enter quantity: </strong>
      <select onChange={this._handleChange}>
      {this.createQuantitySelect()}
      </select>
      </p>
      </div>
      {userPresent ?
        <p>
        <button><Link to="/">Add to Cart</Link></button>
        <button><Link to="/">Buy Now</Link>></button>
        </p>
        :
        <p>
        <button onClick={this._handleCart} disabled={isOutOfStock}>Add to Cart</button>
        <button onClick={this._handleBuy} disabled={isOutOfStock}><Link to="/checkout">Buy Now</Link></button>
        </p>
      }
      </div>
    );
  }
};
export default Item;
