import React, {Component, Fragment} from "react";
import "./Supervisor.css";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import Dashboard_2 from "../Dashboard/Dashboard_2";
import AddWard from "./AddWard";
import NO_EMPLOYEE from "../../no_emp.png";
import {Button, Form, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker/es";
import {reset} from "../../actions/authActions";

const backdropStyle = {
    position: 'fixed',
    zIndex: 1040,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.5
};

const modalStyle2 = function () {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
    let top = 50;
    let left = 50;

    return {
        position: 'fixed',
        width: 650,
        height: 325,
        zIndex: 1040,
        top: top + '%',
        left: left + '%',
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 0,
        overflow: 'hidden',
        transform: 'translate(-50%, -50%)'
    };
};

class Supervisor extends Component {
    state = {
        name:"",
        description:"",
        showModal2: false,
        editLoading: false,
        deleteLoader:false,

        aT: (localStorage.getItem("token"))?localStorage.getItem("token"):""
    }

    close2 = () => {

        this.setState({ showModal2: false });
    };

    open2 = (id) => {
        console.log(id,"ye hain id")
        this.setState({
            showModal2: true,
            empName:id.editName,
            editId:id.editId,
            empNumber:id.editNum,
            empMail:id.editEmail,
            empRole:(id.editRole.admin)? "Admin" : (id.editRole.manager)? "Manager" : (id.editRole.editor)? "Editor" : "Viewer"
        });
    }

    close3 = () => {

        this.setState({ showModal3: false });
    };
    open3 = (id) => {
        console.log(id,"ye hain id")
        this.setState({
            showModal3: true,

            editId:id
        });
    }

    resetPass = (mail) => {
        this.props.reset(mail);
        console.log(mail,"this is the mail to which the mail is being send")
        window.alert("Reset Password link sent");
    }


    deleteEmp = () => {
        // console.log(id);
        this.setState({
            deleteLoader:true
        })
        const url_emp_id = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/employees/" + this.state.editId;
        console.log(url_emp_id);


        fetch(url_emp_id, {
            headers: {
                Authorization: "Bearer " + this.props.auth.stsTokenManager.accessToken,
                "Content-Type": "application/json"
            },
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {

                console.log("anurag", data);
                if(data.error){
                    console.log(data.error,"this is the error coming while editing task");
                    this.setState({
                        deleteLoader:false
                    })

                }
                else {
                    window.location.reload(false);

                }

            })
            .catch(err => console.log(err));
    }


    componentDidMount() {
        if(this.props.location.state){
            console.log("hum yaha hain")
            localStorage.setItem("wardName",this.props.location.state.name);
            localStorage.setItem("wardId",this.props.location.state.id);
            localStorage.setItem("wardDesc",this.props.location.state.description);
        }

        const url= "https://sdmp-jss.herokuapp.com/api/ward/"+this.props.match.params.wid;
        // console.log("cddscsdCds",this.props);
        fetch(url,{
            headers: {
                Authorization: "Bearer "+this.state.aT
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("emp list this ",data);
                const arr = data.supervisors;
                console.log(arr);
                this.setState({ supervisors: arr })
                if(!data.supervisors) {
                    this.setState({
                        supervisors: []
                    })
                }
            })

            .catch(err => console.log(err))
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.location.state){
            localStorage.setItem("wardName",nextProps.location.state.name);
            localStorage.setItem("wardId",nextProps.location.state.id);
            localStorage.setItem("wardDesc",nextProps.location.state.description);
        }
        this.setState({
            supervisors:null
        })
        const url= "https://sdmp-jss.herokuapp.com/api/ward/"+nextProps.match.params.wid;
        // console.log("cddscsdCds",this.props);
        fetch(url,{
            headers: {
                Authorization: "Bearer "+this.state.aT
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("emp list this ",data);
                const arr = data.supervisors;
                this.setState({ supervisors: arr })
                if(!data.supervisors) {
                    this.setState({
                        supervisors: []
                    })
                }



            })

            .catch(err => console.log(err))

    }

    renderBackdrop(props) {

        return <div {...props} style={backdropStyle} />;
    }

    handleEmpChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,

        })
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({
            editLoading:true
        })
        const url_emp_id = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/employees/" + this.state.editId;
        console.log(url_emp_id);

        // console.log("myname is value", value)
        let role = {};
        if (this.state.empRole === "Viewer") {
            role = {
                admin: false,
                manager: false,
                editor: false,
                viewer: true
            };
        }
        else if (this.state.empRole === "Editor") {
            role = {
                admin: false,
                manager: false,
                editor: true,
                viewer: true
            };
        }
        else if (this.state.empRole === "Manager") {
            role = {
                admin: false,
                manager: true,
                editor: true,
                viewer: true
            };
        }
        else if (this.state.empRole === "Admin") {
            role = {
                admin: true,
                manager: true,
                editor: true,
                viewer: true
            };
        }
        let name = this.state.empName;

        const dataObj = {
            "update": {
                role,
                "name":name
            }
        }

        console.log(dataObj, "sending this data");

        fetch(url_emp_id, {
            headers: {
                Authorization: "Bearer " + this.props.auth.stsTokenManager.accessToken,
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(dataObj)
        })
            .then(res => res.json())
            .then(data => {

                console.log("anurag", data);
                if(data.error){
                    console.log(data.error,"this is the error coming while editing task")
                    this.setState({
                        editLoading:false
                    })
                }
                else {
                    window.location.reload(false);

                }

            })
            .catch(err => console.log(err));
    }

    render() {
        // console.log("dcdcDDSFVFDVDF");
        let role = localStorage.getItem("role");
    return (
        <Fragment>

            <div className="empAside">
                <div className="userHeader">
                    <Link to="./add">
                        <button className="add_user" type="button">
                            {" "}
                            <span>+</span> Add Supervisor{" "}
                        </button>
                    </Link>
                </div>

                <div className="userBody">
                    {console.log(this.props,"anurag")}
                    <h4 className="table-heading">{  `Ward : ${localStorage.getItem('wardName')}` }</h4>
                    <p>
                        { `Ward-Id : ${localStorage.getItem('wardId')}` }
                    </p>
                    <p>
                        { `  Description - ${localStorage.getItem('wardDesc')}` }
                    </p>
                    <br />

                    {this.state.supervisors && this.state.supervisors.length!==0 && <div className="client-tableHeader">
                        <div className="num vert-align"></div>
                        <div className="username light vert-align">Name</div>
                        {/*<div className="phone">Phone No.</div>*/}
                        <div className="email vert-align">Username</div>
                        {/*<div className="role vert-align">Role</div>*/}
                        {(role==="admin" || role==="manager") && <div className="num vert-align"></div>}
                        {(role==="admin" || role==="manager") && <div className="num vert-align"></div>}
                        {(role==="admin" || role==="manager") && <div className="num vert-align"></div>}
                        {/*<div className="status">Status</div>*/}
                        {/*<div className="arrow"></div>*/}
                    </div>}

                    {!this.state.supervisors && <div className="client-tableHeader">
                        <div className="num vert-align"><lines className="shine task_holder_num"></lines></div>
                        <div className="username light vert-align"><lines className="shine task_holder_name"></lines></div>
                        {/*<div className="phone"><lines className="shine task_holder"></lines></div>*/}
                        <div className="email vert-align"><lines className="shine task_holder"></lines></div>
                        <div className="role vert-align"><lines className="shine task_holder"></lines></div>

                        {/*<div className="status">Status</div>*/}
                        {/*<div className="arrow"></div>*/}
                    </div>}

                    {this.state.supervisors && this.state.supervisors.length===0 && <div className={"emp-div"}><img className="no_emp" src={NO_EMPLOYEE} alt="logo" /></div> }
                    { this.state.supervisors && this.state.supervisors.length===0 && <div className={"no_emp-div"}><p className={"no_projemp"}>No Employees added!!!</p></div>}


                    <div className="tableContainer">

                        {
                            this.state.supervisors && this.state.supervisors.map( (employee,index) =>{
                                let name = employee.firstName+" "+(employee.lastName==="null")?"":employee.lastName;

                                    return <div className="client-tableBody" key={index}>
                                        <div className="num vert-align">{index+1}</div>
                                        <div className="username vert-align">{ `${employee.firstName} ${((employee.lastName)===null)?"":employee.lastName}` }</div>
                                        {/*<div className="phone">{ (employee.number)? employee.number : "NA" }</div>*/}
                                        <div className="email vert-align">{ employee.username }</div>
                                    </div>
                            }

                             )
                        }

                    </div>

                    <Modal
                        onHide={this.close3}
                        className={"delete-model"}
                        aria-labelledby="modal-label"
                        show={this.state.showModal3}
                        renderBackdrop={this.renderBackdrop}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Admin</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you want to delete ?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            { this.state.deleteLoader ? "" : <Button variant="secondary" onClick={this.close3}>Cancel</Button>}
                            <Button variant="danger" onClick={this.deleteEmp}>
                                {this.state.deleteLoader ? <i className={"fa fa-refresh fa-spin"}></i> : "Confirm"}
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        onHide={this.close2}
                        style={modalStyle2()}
                        aria-labelledby="modal-label"
                        show={this.state.showModal2}
                        renderBackdrop={this.renderBackdrop}
                    >
                        <div className="modalMain">
                            <h2 id="modal-label">EDIT TASK</h2>
                        </div>
                        <Form onSubmit={this.handleEdit}>


                            <Form.Group>
                                <Form.Label className="taskLabel">NAME</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Write here...."
                                    className="nameField"
                                    id="empName"
                                    value={this.state.empName}
                                    onChange={this.handleEmpChange}
                                />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label className="taskLabel">ROLE</Form.Label>
                                <Form.Control id="empRole" value={this.state.empRole} as="select" onChange={this.handleEmpChange}>
                                    <option>Admin</option>
                                    <option>Manager</option>
                                    <option>Editor</option>
                                    <option>Viewer</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="createBt">
                                <Button type="submit" variant="secondary" size="sm" className="taskCreate" >
                                    {this.state.editLoading ? <i className={"fa fa-refresh fa-spin"}></i> : "SAVE"}
                                </Button>
                            </Form.Group>
                        </Form>

                    </Modal>
                </div>
            </div>
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
const mapDispatchToProps = (dispatch) => {
    return {
        reset: (mail) => dispatch(reset(mail))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Supervisor);

