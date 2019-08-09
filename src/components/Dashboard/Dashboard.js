import React, { Component, Fragment } from 'react';
import ContestList from './ContestList/ContestList';
import ContestTypes from './ContestTypes/ContestTypes';
import './dashboard.css';
import { Link,NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import '../Main/Main.css';

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            aT: (this.props.auth.stsTokenManager)?this.props.auth.stsTokenManager.accessToken:""
        };

    }

    componentDidMount() {
        const url= "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients";
        // console.log(url);
        fetch(url,{
            headers: {
                Authorization: "Bearer "+this.state.aT
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("dashboard component",data.res);

                const arr = data.res.clients;
                this.setState({ clients: arr })

            })

            .catch(err => console.log(err))


        fetch("https://us-central1-dexpert-admin.cloudfunctions.net/api/admins/" + this.props.auth.uid, {
                headers: {
                    Authorization:
                        "Bearer " + this.state.aT
                }
            }
        )
            .then(res => res.json())
            .then(data => {

                console.log(data,"ye hain admin ka data")
                let role = (data.res.admin.role.admin) ? "admin" : (data.res.admin.role.manager) ? "manager" : (data.res.admin.role.editor) ? "editor" : "viewer";
                localStorage.setItem("role", role);

            })

            .catch(err => console.log(err));

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps,"ye hain next props");
    }

    render() {
        let role = localStorage.getItem("role");

        return (
            <Fragment>
                <p className="para_client" >Client List</p>
                <br />
                {(role==="admin"||role==="manager") && <Link to={"/clients/add/"}><button className="add_new" type="button"> <span>+</span>&nbsp;&nbsp; add new </button></Link>}
                <br />

                <div className="client_list">
                    { this.state.clients && this.state.clients.map( (client,key) =>
                        <NavLink to = {"/clients/" + (client.id) + "/projects/"} key={key} activeClassName={"active"} >
                            <div className="listTab">{ client.name }</div>
                        </NavLink>
                    ) }

                    { !this.state.clients && <div>
                        <lines className="shine client_holder_num"></lines>
                        <lines className="shine client_holder_num"></lines>
                        <lines className="shine client_holder_num"></lines>
                    </div>
                    }

                </div>
                
            </Fragment>
            
        )
    }
}

const mapStateToProps = (state) => {
    console.log("my name is state1",state);
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Dashboard);