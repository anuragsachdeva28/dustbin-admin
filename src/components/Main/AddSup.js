import React, {Component} from 'react';
import './AddSup.css';
import {Button, Col, Form, Row, Dropdown, MenuItem} from "react-bootstrap";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import {reset} from "../../actions/authActions";
import Autocomplete from "./Autocomplete";


class AddSup extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        selectedName: "viewer",
        loading:false
    }

    onSelect = (eventKey) => {
        console.log(eventKey)
        this.setState({ selectedName: eventKey })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }


    myfunc = () => {
        console.log("trnfvndjkcnj");
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }

    handleCancel = () => {
        window.location.href = "/supervisors/wards/"+this.props.match.params.cid+"/supervisors/";
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading:true
        })
        let name = this.state.name;
        let email = this.state.email;
        let role={}
        if(this.state.selectedName==="viewer"){
            role = {
                "admin":false,
                "manager":false,
                "editor":false,
                "viewer":true
            }
        }
        else if(this.state.selectedName==="editor"){
            role = {
                "admin":false,
                "manager":false,
                "editor":true,
                "viewer":true
            }
        }
        else if(this.state.selectedName==="manager"){
            role = {
                "admin":false,
                "manager":true,
                "editor":true,
                "viewer":true
            }
        }
        else{
            role = {
                "admin":true,
                "manager":true,
                "editor":true,
                "viewer":true
            }
        }

        let dataObj = { name, email, role };

        const url= "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/"+this.props.match.params.cid+"/employees";
        // console.log(url);
        fetch(url,{
            headers: {
                Authorization: "Bearer "+this.props.auth.stsTokenManager.accessToken,
                "Content-Type":"application/json"
            },
            method: 'POST',
            body: JSON.stringify(dataObj)
        })
            .then(res => res.json())
            .then(async data => {

                console.log("anurag",data.error);
                // window.location.reload(false);
                if(data.error){
                    console.log("errrrrrrrrrrror")
                    this.myfunc();
                    this.setState({
                        loading:false,
                        name:"",
                        email:""
                    })
                }
                else {
                    await this.props.reset(this.state.email)
                    window.location.href = "/supervisors/wards/"+this.props.match.params.cid+"/supervisors/";
                }
            })

            .catch(err => console.log("sachdeva",err))

    }
    render() {
        let users = [];
        let role = localStorage.getItem("role");


        if (role==="admin"){
            users = [
                { id: 1, name: 'admin'},
                { id: 2, name: 'manager' },
                { id: 3, name: 'editor' },
                { id: 4, name: 'viewer' },

            ]
        }
        else if(role==="manager"){
            users = [
                { id: 3, name: 'editor' },
                { id: 4, name: 'viewer' },

            ]
        }


        const { selectedName } = this.state;

        console.log(selectedName)
        // let selectedUser = users[selectedId-1].name;
        // console.log(selectedUser)
        if (role==="viewer" || role==="editor") return <Redirect to={"/supervisors/wards/"+this.props.match.params.cid+"/supervisors/"} />
        return (
            <div className="add-user">
                <div className="addUser_header">
                    <h5 className="new_user">NEW SUPERVISOR</h5>
                </div>
                <div className="addUser_body">
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" className="userDetail">
                                Name
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control id={"name"} type="text" placeholder="" className="userfield" onChange={this.handleChange} value={this.state.name} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm="2" className="userDetail">
                                Email Id
                            </Form.Label>
                            <Col sm="4">
                                <Form.Control id={"email"} type="email" placeholder="" className="userfield" onChange={this.handleChange} value={this.state.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formBasicPassword">
                            <Form.Label column sm="2" className="userDetail">
                                Role
                            </Form.Label>
                            <Dropdown onSelect={this.onSelect} id="d" style={{ marginLeft: 1.1 + "%" }}>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ borderRadius: 20 + "px" }}>
                                    {selectedName}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {users.map(user => (
                                        <Dropdown.Item eventKey={user.name} key={user.id}>
                                            {user.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>


                        <Form.Group className="formGroup">
                            <Form.Label className="formLabel">Team</Form.Label>


                            <Autocomplete
                                options={this.state.employees}
                                onSelection={this.setSelection}
                            />
                        </Form.Group>

                        <div className={"selection_container"}>
                            {
                                this.state.team && this.state.team.map((member) => {
                                    return <div className="selected"><span>{member.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{cursor:"pointer"}} onClick={()=> this.removeMonitor(member.id)}>X</span></div>
                                })
                            }
                        </div>



                        <br />
                        <Form.Group as={Row}>
                            <Col sm="2">
                                <Button onClick={this.handleCancel} variant="secondary" size="sm" className={`cancel`}>
                                    CANCEL
                                </Button>
                            </Col>
                            <Col sm="2">
                                <Button variant="secondary" size="sm" type="submit" className={`create`}>
                                    { this.state.loading ? <i className={"fa fa-refresh fa-spin"}></i>:"CREATE"}
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <div id="snackbar">Something went Wrong ! ! !</div>
                </div>
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
const mapDispatchToProps = (dispatch) => {
    return {
        reset: (mail) => dispatch(reset(mail))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddSup);