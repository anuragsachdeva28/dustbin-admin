import React, {Component, Fragment} from "react";
import "./Employee.css";
// import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import Dashboard_2 from "../Dashboard/Dashboard_2";
import AddWard from "./AddWard";
import Employee from "./Employee"
import AddEmp from "./AddEmp";

class SupervisorWard extends Component {
    state = {
        name:"",
        description:"",
        employees:[],

    }




    render() {
        const { auth } = this.props;
        // console.log("ye hain prop", this.props);
        if(!localStorage.getItem("token")) return <Redirect to={"/signin/"} />
        console.log("dcdcDDSFVFDVDF");
        return (
            <Fragment>
                <Sidebar/>
                <div className="main">
                    <Route path="/supervisors/wards/" component={Dashboard_2} />
                </div>
                <Route path="/supervisors/wards/add/" component={AddWard} />
                <Route path="/supervisors/wards/:wid/supervisors/" exact component={Employee} />
                <Route path="/supervisors/wards/:wid/supervisors/add/" component={AddEmp} />
            </Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    console.log("my name is state1",state);
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(SupervisorWard);

