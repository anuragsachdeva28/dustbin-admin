import React, { Component } from "react";
import {Redirect, Route} from "react-router-dom";




import "./Main.css";
import Projects from "./Projects";
import AddProject from "./AddProject";
import Tasks from './Tasks';
import Employee from './Employee';
import AddEmp from './AddEmp';
import Dashboard from "../Dashboard/Dashboard";
import AddClient from "./AddClient";
import {connect} from "react-redux";


class Main extends Component {
  render() {
      const { auth } = this.props;
      // console.log("ye hain prop", this.props);
      if(!auth.uid) return <Redirect to={"/signin/"} />
    return (
      <div className="outer">
        <div className="main">
          <Route path="/clients/" component={Dashboard} />
        </div>

        <Route path="/clients/add" component={AddClient} />
        <Route path="/clients/:cid/projects" component={Projects} />
        {/*<Route path="/projects/" component={Projects} />*/}
        <Route path="/clients/:cid/projects/add" component={AddProject} />
        {/*<Route path="/projects/add/" component={AddProject} />*/}
        <Route path="/clients/:cid/projects/:pid/tasks/" component={Tasks} />
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
