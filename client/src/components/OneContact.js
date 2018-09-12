import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
class OneContact extends Component {
  constructor(props) {
    super(props);
    this.state = { isDeleted: false };
  }
  handleDelete = id => {
    axios
      .delete(`/delete_contact/${id}`)
      .then(res => console.log("element deleted with success"))
      .catch(err => console.log(err));
    this.props.history.push("/contacts");
    this.setState({ isDeleted: true });
  };

  render() {
    return this.state.isDeleted ? (
      <Redirect to="/contacts" />
    ) : (
      <div className="one-contact">
        <h2> name: {this.props.contact.name}</h2>
        <h4> telephone: {this.props.contact.telephone}</h4>
        <h4> email: {this.props.contact.email}</h4>
        <div>
          <Link to={`/modify_contact/${this.props.contact._id}`}>
            <button>Modify</button>
          </Link>
          <button onClick={() => this.handleDelete(this.props.contact._id)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default OneContact;
