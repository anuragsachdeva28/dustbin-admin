import React, { Component, Fragment } from 'react';
import ContestList from './ContestList/ContestList';
import ContestTypes from './ContestTypes/ContestTypes';
import './dashboard.css';
import { Link,NavLink } from 'react-router-dom';
import {connect} from "react-redux";
import '../Main/Main.css';

class Dashboard_2 extends Component{
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

    }

    render() {
        let role= localStorage.getItem("role");
        return (
            <Fragment>
                <p className="para_client" >Client List</p>
                <br />
                {(role==="admin" || role==="manager") && <Link to={"/employees/clients/add/"}><button className="add_new" type="button"> <span>+</span>&nbsp;&nbsp; add new </button></Link>}
                <br />

                <div className="client_list">
                    { this.state.clients && this.state.clients.map( (client,key) =>
                        <NavLink to = {"/employees/clients/" + (client.id) + "/employees/"} key={key} activeClassName={"active"} >
                            <div className="listTab">{ client.name }</div>
                        </NavLink>
                    ) }

                    { !this.state.clients && <div><lines className="shine client_holder_num"></lines>
                        <lines className="shine client_holder_num"></lines>
                        <lines className="shine client_holder_num"></lines>

                    </div>}

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
export default connect(mapStateToProps)(Dashboard_2);