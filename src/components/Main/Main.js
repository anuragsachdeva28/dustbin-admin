import React, { Component } from "react";
import {Redirect, Route} from "react-router-dom";




import "./Main.css";
import Dustbins from "./Dustbins";
import AddProject from "./AddProject";
import Tasks from './Logs';
import Employee from './Supervisor';
import AddEmp from './AddSup';
import Dashboard from "../Dashboard/Dashboard";
import AddWard from "./AddWard";
import {connect} from "react-redux";


class Main extends Component {
  render() {
      const { auth } = this.props;
      // console.log("ye hain prop", this.props);
      if(!localStorage.getItem("token")) return <Redirect to={"/signin/"} />
    return (
      <div className="outer">
        <div className="main">
          <Route path="/wards/" component={Dashboard} />
        </div>

        <Route path="/wards/add" component={AddWard} />
        <Route path="/wards/:wid/dustbins" component={Dustbins} />

        <Route path="/wards/:wid/dustbins/add" component={AddProject} />
        {/*<Route path="/projects/add/" component={AddProject} />*/}
        <Route path="/wards/:wid/dustbins/:pid/logs/" component={Tasks} />
        {/*<Route path="/projects/:pid/tasks/" component={Tasks} />*/}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    console.log("my name is state1",state);
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Main);

// {/* <Route path="/contests/:contestId" component={ContestPage} exact />
//                     <Route path="/contests/:contestId/questions/:questionId"
//                         component={QuestionPage}
//                         exact /> */}
