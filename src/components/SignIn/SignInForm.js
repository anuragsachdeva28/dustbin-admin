import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {signIn, signOut, reset} from "../../actions/authActions";

class SignInForm extends Component {

  state = {
    email: '',
    password: '',
    loading: false,
    error:null
  }

  forgetPassword = () => {
    this.props.reset(this.state.email)
  }

  handleChange = (e) => {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loading:true,error:null});
    console.log("The form was submitted with the following data:");

    this.props.signIn(this.state);
    // setTimeout( ()=>{

      console.log(this.props);
      if(await this.props.auth.error){
        this.setState({error:this.props.auth.error})
        this.setState({loading:false})
        this.setState({
          email:"",
          password:""
        })
        console.log("cleared")
      }
      else {

          console.log("now checking for admin")


      }

    // },4000)

    // console.log(this.props,"k,kj,kj,hj,hj,hj,")

  }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.admin){
  //     console.log("no error and is a admin")
  //
  //   }
  //   else {
  //     this.setState({loading:false})
  //     this.setState({
  //       email:"",
  //       password:""
  //     })
  //     console.log("no error but not an admin")
  //     this.props.signOut()
  //   }
  // }


  render() {
    console.log("see this props right here", this.props.auth);
    // const error = (this.props.auth.error)?(this.props.auth.error):null;
    const {loading} =this.state;
    // console.log(error);
    return (
      <div className="FormCenter">
        <form

          onSubmit={this.handleSubmit}
          className="FormFields"
          id="form-id"
        >
          <label className="login">Log in</label>
          <div className="FormField">
            <input
              type="text"
              id="email"
              className="FormField__Input"
              placeholder="dexpert id"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <input
              type="password"
              id="password"
              className="FormField__Input"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          { this.state.error ? <p className={'authError'}>Wrong Email or Password</p> : null }
          {/*{ authError ? this.setState({loading:false}): null}*/}

          {/*<div className="FormField for">*/}
          {/*  <Link to="#" className="forget" onClick={this.forgetPassword}>*/}
          {/*    {" "}*/}
          {/*    Forget Password?{" "}*/}
          {/*  </Link>*/}
          {/*</div>*/}
          <br />

          <div className="FormField btn-submit">

              {/*<button type="submit" className="FormField__Button mr-20"><a href="./clients/">Sign In</a></button>*/}
              <button disabled={loading} type="submit" className="FormField__Button mr-20">
                { loading && <i className={"fa fa-refresh fa-spin"}></i>}
                { loading ? "      Loading..." : "Sign In"}

              </button>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state)  => {
  // console.log("This is the state",state)
  return {
    authError: state.auth.authError,
    auth: state.auth.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      signIn: (creds) => dispatch(signIn(creds)),
      signOut: () => dispatch(signOut()),
      reset: (mail) => dispatch(reset(mail))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInForm);
