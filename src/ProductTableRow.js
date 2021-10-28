import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProductTableRow extends Component {
  constructor(props) {
    super(props);

    this.deleteStudent = this.deleteStudent.bind(this);
  }

  deleteStudent() {
    toast("Product Deleted Successfully !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    axios
      .delete("http://localhost:3000/admin/product/" + this.props.obj._id)
      .then((res) => {
        console.log("Product successfully deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.price}</td>
        <td>{this.props.obj.description}</td>
        <td>{this.props.obj.imageUrl}</td>

        <td>
          <Button size="sm" variant="warning">
            <Link
              style={{ textDecoration: "none" }}
              className="edit-link"
              to={"/edit-product/" + this.props.obj._id}
            >
              Edit
            </Link>
          </Button>
          {"     "}
          <Button onClick={this.deleteStudent} size="sm" variant="danger">
            Delete
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </td>
      </tr>
    );
  }
}

export default withRouter(ProductTableRow);
