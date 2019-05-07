import React, { Component } from "react";
import axios from "axios";

import HouseApp from "./houseApp";

const url = "https://tenantly-back.herokuapp.com/api/register";
const mail = "https://tenantly-back.herokuapp.com/send";

class TenantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isAdmin: false,
      phone: "",
      cost: "",
      emailSubscribe: false,
      textSubscribe: false,
      application: null
    };
  }
  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      password: this.state.phone
    });
    this.setState({
      cost: this.state.cost
    });
  };

  addTenant = e => {
    e.preventDefault();
    axios
      .post(url, this.state)
      .then(() => {
        console.log("working");
        let email = {
          name: this.state.firstName,
          email: this.state.email,
          password: this.state.phone
        };
        axios
          .post(mail, email)
          .then(() => {
            console.log("sent");
          })
          .catch(err => {
            console.log({ Error: err });
          });
      })
      .catch(err => {
        console.log({ Error: err });
      });
  };

  urlUpdater = imageurl => {
    console.log(imageurl);
    this.setState({
      application: imageurl
    });
  };

  handleCheckboxChange = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  render() {
    return (
      <div className="tenant-info">
        <h1>Tenant Info</h1>
        <form>
          <div className="tenantCard-top">
            <div className="inputInfo">
              <div className="name-input">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={this.inputHandler}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.inputHandler}
                />
              </div>
              <div className="eN-input">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={this.inputHandler}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile #"
                  onChange={this.inputHandler}
                />

                <input
                  type="text"
                  name="cost"
                  placeholder="Per Month"
                  onChange={this.inputHandler}
                />
              </div>
            </div>
            <div className="flex-row">
              <input
                id="emailSubscribe"
                type="checkbox"
                name="emailSubscribe"
                onChange={this.handleCheckboxChange}
                value={this.state.emailSubscribe}
              />
              <label for="emailSubscribe">Email? </label>

              <input
                id="textSubscribe"
                type="checkbox"
                name="textSubscribe"
                value={this.state.textSubscribe}
                onChange={this.handleCheckboxChange}
              />
              <label for="textSubscribe">Texts?</label>
            </div>
          </div>
          <div className="tenantCard-bottom">
            <HouseApp url={this.urlUpdater} />
          </div>
        </form>
        <div className="addTenantB-container">
          <button className="filled-button" onClick={this.addTenant}>
            Create Tenant
          </button>
        </div>
      </div>
    );
  }
}

export default TenantInfo;
