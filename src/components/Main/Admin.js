import React, { Component, Fragment } from "react";
import "./Admin.css";
import Sidebar from "../Sidebar/Sidebar";
import {Link, Redirect, Route} from "react-router-dom";
import AddAdmin from "./AddAdmin";
import {connect} from "react-redux";
import {reset} from "../../actions/authActions";
import {Button, Form, Modal} from "react-bootstrap";
// import { Link } from "react-router-dom";

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

class Admin extends Component {
  state = {
    showModal2: false,
    showModal3: false,
    editLoading: false,
    deleteLoader: false,
    aT: (this.props.auth.stsTokenManager)?this.props.auth.stsTokenManager.accessToken:""
  }
  myfunc = () => {
    console.log("trnfvndjkcnj");
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }

  componentDidMount() {
    const url = "https://us-central1-dexpert-admin.cloudfunctions.net/api/admins";
    // console.log(url,"cddscsdCds",this.props);
    fetch(url,{
      headers: {
        Authorization: "Bearer "+this.state.aT
      }
    })
        .then(res => res.json())
        .then(data => {

          console.log("admin list this ",data);
          const arr = data.res.admins;
          this.setState({ admins: arr })

          if(data.error){
            console.log("rrrrrrrrrrrr")
            this.myfunc();
          }

        })

        .catch(err => console.log(err))

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
    const url_admin_id = "https://us-central1-dexpert-admin.cloudfunctions.net/api/admins/" + this.state.editId;
    console.log(url_admin_id);

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

    fetch(url_admin_id, {
      headers: {
        Authorization: "Bearer " + this.state.aT,
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

  deleteAdmin = (id) => {
    this.setState({
      deleteLoader:true
    })
    console.log(id);
    const url_admin_id = "https://us-central1-dexpert-admin.cloudfunctions.net/api/admins/" + this.state.editId;
    console.log(url_admin_id);


    fetch(url_admin_id, {
      headers: {
        Authorization: "Bearer " + this.state.aT,
        "Content-Type": "application/json"
      },
      method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {

          console.log("anurag", data);
          if(data.error){
            this.setState({
              deleteLoader:false
            })

            console.log(data.error,"this is the error coming while editing task")

          }
          else {
            window.location.reload(false);

          }

        })
        .catch(err => console.log(err));
  }

  render() {
    let role= localStorage.getItem("role");
    const { auth } = this.props;
    // console.log("ye hain prop", this.props);
    if(!auth.uid) return <Redirect to={"/signin/"} />
    return (
      <Fragment>


        <div className="adminAside">
          <div className="adminHeader">
            {(role==="admin" || role==="manager") && <Link to="/admins/add/">
              <button className="add_admin" type="button">
                {" "}
                <span>+</span> Add Admin{" "}
              </button>
            </Link>}
          </div>
          <div className="adminBody">


            <div className="admin-tableHeader">
              <div className="num"></div>
              <div className="username light">Admin Name</div>
              <div className="email">Email Address</div>
              <div className="role">Role</div>
              {(role==="admin" || role==="manager") && <div className="num"></div>}
              {(role==="admin" || role==="manager") && <div className="num"></div>}
              {/*{(role==="admin" || role==="manager") && <div className="num"></div>}*/}
            </div>
            <div className="admin-tableContainer">
              {
                this.state.admins && this.state.admins.map((admin,index) => {
                  let editName = admin.name;
                  let editId = admin.id;
                  // let editNum = employee.number;
                  // let editEmail = employee.email;
                  let editRole = admin.role;
                  let adminRole = (admin.role.admin)?"Admin":(admin.role.manager)?"Manager":(admin.role.editor)?"Editor":"Viewer";
                  return <div className="admin-tableBody" key={index}>
                    <div className="num vert-align">{index+1}</div>
                    <div className="username vert-align">{admin.name} </div>
                    <div className="email vert-align">{admin.email}</div>
                    <div className="role vert-align">{adminRole}</div>
                    {(role==="admin" || ((role==="manager") && !((adminRole === "Admin") || (adminRole === "Manager")))) && <div className="icons vert-align" onClick={() => this.open2({editName, editId, editRole})}><i className="fa fa-pencil-square-o" aria-hidden="true" title="Edit"></i></div>}
                    {(role==="admin" || ((role==="manager") && !((adminRole === "Admin") || (adminRole === "Manager")))) && <div className="icons vert-align" onClick={() => this.resetPass(admin.email)}><i className="fa fa-key" aria-hidden="true" title="Reset Password"></i></div>}
                    {(role==="admin" || ((role==="manager") && !((adminRole === "Admin") || (adminRole === "Manager")))) && <div className="icons vert-align" onClick={() => this.open3(admin.id)}><i className="fa fa-trash" aria-hidden="true" title="Delete"></i></div>}
                  </div>
                }

              )}
              {
                !this.state.admins && <div className="admin-tableBody">
                  <div className="num vert-align"><lines className="shine task_holder_num"></lines></div>
                  <div className="username vert-align"><lines className="shine task_holder_name"></lines></div>
                  <div className="email vert-align"><lines className="shine task_holder"></lines></div>
                  <div className="role vert-align"><lines className="shine task_holder"></lines></div>
                </div>
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
                <Button variant="danger" onClick={this.deleteAdmin}>
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
        <div id="snackbar">Something went Wrong ! ! !</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
