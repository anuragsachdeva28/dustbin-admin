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
        team:[],
        employees:[{

        }],
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

    setSelection = (val) => {
        // var joined = this.state.team.push(val);
        let array = [...this.state.team];
        let index=-1;
        for (let i=0;i<array.length;i++){
            if(val===array[i]){
                index = i;
            }
        }
        if(index===-1){
            this.setState({
                team:[...this.state.team,val]
            })
        }
    }

    removeMonitor = (name) => {
        console.log(name);
        let array = [...this.state.team];
        let index=null;
        for(let i=0; i<array.length;i++)
        {
          if(array[i].name===name) {
            index=i;
          }
        }
        if(index!==null){
          array.splice(index,1);
          this.setState({
            team:array
          })
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading:true
        })

        let sups = [];

        this.state.team && this.state.team.forEach((sup) => {
            sups.push(sup.name);
        })
        console.log(sups);

        const url = `https://sdmp-jss.herokuapp.com/api/ward/${this.props.match.params.wid}/supervisor?username=${sups.toString()}`;
        console.log(url);
        fetch(url,{
            headers: {
                Authorization: "Bearer "+localStorage.getItem('token')
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => {

                console.log("anurag",data);
                if(data.error){
                    console.log("errrrrrrrrrrror")

                    this.setState({
                        loading:false,
                        name:"",
                        email:""
                    })
                }
                else {

                    // window.location.href = "/supervisors/wards/"+this.props.match.params.wid+"/supervisors/";
                }
            })

            .catch(err => console.log("sachdeva",err))

    }
    render() {
        let users = [];



        const { selectedName } = this.state;

        console.log(selectedName)
        // let selectedUser = users[selectedId-1].name;
        // console.log(selectedUser)
        // if (role==="viewer" || role==="editor") return <Redirect to={"/supervisors/wards/"+this.props.match.params.cid+"/supervisors/"} />
        return (
            <div className="add-user">
                <div className="addUser_header">
                    <h5 className="new_user">NEW SUPERVISOR</h5>
                </div>
                <div className="addUser_body">
                    <Form onSubmit={this.handleSubmit} >



                        <Form.Group className="formGroup">
                            <Form.Label className="formLabel">Team</Form.Label>


                            <Autocomplete
                                options={this.state.employees}
                                onSelection={this.setSelection}
                            />
                        </Form.Group>

                        <div className={"selection_container"}>
                            {
                                this.state.team && this.state.team.map((member,id) => {
                                    return <div key={id} className="selected"><span>{member.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{cursor:"pointer"}} onClick={() => this.removeMonitor(member.name)}>X</span></div>
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
