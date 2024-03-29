import React, { Component } from "react";
import withContext from "../../withContext";
import axios from 'axios';

const initState = {
  name: "",
  price: "",
  stock: "",
  shortDesc: "",
  imgSrc: ""
};

//Add Product Class
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  //Save Function Used For Add Product
  save = async (e) => {
    e.preventDefault();
    const { name, price, stock, shortDesc, imgSrc } = this.state;

    if (name && price) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      axios.post(
        'http://localhost:3000/products',
        { id, name, price, stock, shortDesc, imgSrc },
      )

      this.props.context.addProduct(
        {
          name,
          price,
          shortDesc,
          imgSrc,
          stock: stock || 0
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Product created successfully' } }
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and price' } }
      );
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  //Renders Form To Add Product
  render() {
    const { name, price, stock, shortDesc, imgSrc } = this.state;
    const { user } = this.props.context;

    return (
      <>
        <div className="hero is-info ">
          <div className="hero-body container">
            <h4 className="title">Post Advert</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Price: </label>
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Available in Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Short Description: </label>
                <input
                  className="input"
                  type="text"
                  name="shortDesc"
                  value={shortDesc}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Image: </label>
                <textarea
                  className="textarea"
                  type="text"
                  rows="2"
                  style={{ resize: "none" }}
                  name="imgSrc"
                  value={imgSrc}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-info is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default withContext(AddProduct);