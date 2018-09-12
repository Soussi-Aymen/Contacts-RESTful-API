import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", telephone: 0, email: "", isModified: false };
  }
  componentDidMount() {
    let id = this.props.id;
    axios
      .get(`/contact/${id}`)
      .then(res => {
        this.setState({ ...res.data });
        console.log(this.state.contact.name);
      })
      .catch(err => console.log(err));
  }

  handleModify = id => {
    axios
      .put(`/modify_contact/${id}`, {
        name: this.state.name,
        telephone: this.state.telephone,
        email: this.state.email
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    this.setState({ isModified: true });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return this.state.isModified ? (
      <Redirect to="/contacts" />
    ) : (
      <div>
        <h1>Modify contact Page</h1>
        <div className="flex">
          Name:
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />
          telephone:
          <input
            name="telephone"
            type="number"
            onChange={this.handleChange}
            value={this.state.telephone}
          />
          email:
          <input
            name="email"
            type="text"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <button
            to={"/contacts"}
            onClick={() => this.handleModify(this.state._id)}
          >
            {" "}
            Modify
          </button>
        </div>{" "}
      </div>
    );
  }
}

export default Modify;
