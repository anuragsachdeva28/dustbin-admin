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
            aT: (localStorage.getItem("token"))?localStorage.getItem("token"):""
        };

    }

    componentDidMount() {
        const url= "https://sdmp-jss.herokuapp.com/api/ward/";
        // console.log(url);
        fetch(url,{
            headers: {
                Authorization: "Bearer "+this.state.aT
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("dashboard component",data);

                const arr = data.content;
                this.setState({ wards: arr })

            })

            .catch(err => console.log(err))




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
                <Link to={"/wards/add/"}><button className="add_new" type="button"> <span>+</span>&nbsp;&nbsp; add new </button></Link>
                <br />

                <div className="client_list">
                    { this.state.wards && this.state.wards.map( (ward,key) =>
                        <NavLink to = {"/wards/" + (ward.id) + "/projects/"} key={key} activeClassName={"active"} >
                            <div className="listTab">{ ward.name }</div>
                        </NavLink>
                    ) }

                    { !this.state.wards && <div>
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