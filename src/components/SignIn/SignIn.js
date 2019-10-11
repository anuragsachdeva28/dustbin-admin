import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import SignInForm from "./SignInForm";
import { connect } from "react-redux";

import "./sign.css";

class SignIn extends Component {
  state = {
    uid: "",
    admin: true,
    clear: false
  };
  myfunc = () => {
    console.log("trnfvndjkcnj");
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 5000);
  };
  componentWillMount() {
    // check auth id from local storage
    console.log("my name is anurag", this.props)
    if(localStorage.getItem("token")) {
      window.location.href = "/wards/"
      console.log("checked")
    }
    console.log("checked")
    }

    componentWillReceiveProps(nextProps) {
      console.log("this is next props", nextProps);
      if (nextProps.auth.access_token) {
      localStorage.setItem("token",nextProps.auth.access_token);
      localStorage.setItem("role",nextProps.auth.authorities)
      window.location.href = "/wards/"
    }
  }

  render() {
    console.log("xsxsxsd");
    // if (auth.uid && this.state.admin) return <Redirect to={"/profile/"} />;
    return (
      <Fragment>
        <div className="App">
          <div className="App__Aside">
            <h3>WELCOME TO DEXPERT</h3>
            <p className="Para">
              One Stop station for your Project Express.
            </p>
          </div>
          <div className="App__Form">
            <SignInForm admin={this.state.admin} clear={this.state.clear} />
          </div>
        </div>
        <div id="snackbar">
          Not an Admin ! ! !<br />
          Please contact support or login with an admin id
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log("my name is state",state);
  return {
    auth: state.auth.data
  };
};
export default connect(mapStateToProps)(SignIn);
