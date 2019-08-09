import React, {Component, Fragment} from "react";
import "./Employee.css";
// import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import Dashboard_2 from "../Dashboard/Dashboard_2";
import AddClient from "./AddClient";
import Employee from "./Employee"
import AddEmp from "./AddEmp";

class EmployeeClient extends Component {
    state = {
        name:"",
        description:"",
        employees:[],

    }




    render() {
        const { auth } = this.props;
        // console.log("ye hain prop", this.props);
        if(!auth.uid) return <Redirect to={"/signin/"} />
        console.log("dcdcDDSFVFDVDF");
        return (
            <Fragment>
                <Sidebar/>
                <div className="main">
                    <Route path="/employees/clients/" component={Dashboard_2} />
                </div>
                <Route path="/employees/clients/add/" component={AddClient} />
                <Route path="/employees/clients/:cid/employees/" exact component={Employee} />
                <Route path="/employees/clients/:cid/employees/add/" component={AddEmp} />
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
export default connect(mapStateToProps)(EmployeeClient);

