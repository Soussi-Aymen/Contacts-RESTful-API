import React, { Component } from "react";
import axios from "axios";

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", telephone: null, email: "" };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAdding = () => {
    const contact = this.state;
    axios
      .post(`/add_contact`, { ...contact })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
    this.props.history.push("/contacts");
  };

  render() {
    return (
      <div>
        <h1>Add contact Page</h1>
        <div className="flex">
          Contact Name:
          <input name="name" type="text" onChange={this.handleChange} />
          Contact telephone:
          <input name="telephone" type="number" onChange={this.handleChange} />
          Contact email:
          <input name="email" type="text" onChange={this.handleChange} />
          <button onClick={this.handleAdding}>Add Contact</button>
        </div>
      </div>
    );
  }
}

export default Add;
