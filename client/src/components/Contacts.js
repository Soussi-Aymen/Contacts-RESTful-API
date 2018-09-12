import React, { Component } from "react";
import axios from "axios";
import OneContact from "./OneContact";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      loading: false
    };
  }
  componentDidMount() {
    axios
      .get("/contacts")
      .then(res => {
        this.setState({ contacts: Array.from(res.data) });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>This is the contact page </h1>
        <div className="contact-list">
          {this.state.contacts.map(contact => (
            <OneContact key={contact._id} contact={contact} />
          ))}
        </div>
      </div>
    );
  }
}

export default Contacts;
