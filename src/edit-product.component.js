import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      title: "",
      price: "",
      description: "",
      imageUrl: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:3000/admin/edit-product/" + this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          title: res.data.title,
          price: res.data.price,
          description: res.data.description,
          imageUrl: res.data.imageUrl,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangePrice(e) {
    this.setState({ price: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeImageUrl(e) {
    this.setState({ imageUrl: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`title: ${this.state.title}`);
    console.log(`price: ${this.state.price}`);
    console.log(`description: ${this.state.description}`);
    console.log(`imageUrl: ${this.state.imageUrl}`);
    if (!this.state.title) {
      alert("Please Enter Tilte");
    }
    if (!this.state.price) {
      alert("Please Enter Price");
    }
    if (!this.state.description) {
      alert("Please Enter Description");
    }
    if (!this.state.imageUrl) {
      alert("Please Enter ImageURL");
    }
    if (
      this.state.title &&
      this.state.price &&
      this.state.description &&
      this.state.imageUrl
    ) {
      const productObject = {
        title: this.state.title,
        price: this.state.price,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      };

      axios
        .put(
          "http://localhost:3000/admin/update-product/" +
            this.props.match.params.id,
          productObject
        )
        .then((res) => {
          console.log(res.data);
          console.log("Product successfully updated");
        })
        .catch((error) => {
          console.log(error);
        });

      // Redirect to Product List
      this.props.history.push("/product-list");
    }
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </Form.Group>
          <Form.Group controlId="Name">
            <Form.Label>Image Url</Form.Label>
            <Form.Control
              type="text"
              value={this.state.imageUrl}
              onChange={this.onChangeImageUrl}
            />
          </Form.Group>
          <br></br>
          <Button variant="danger" size="lg" block="block" type="submit">
            Update Student
          </Button>
        </Form>
      </div>
    );
  }
}
