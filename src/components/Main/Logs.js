import React, { Component } from 'react';

import './Logs.css';

import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import arrayMove from 'array-move';
import Infinite from 'react-infinite';
import { Accordion, Card, Button, Dropdown } from 'react-bootstrap';
import { Modal, Form, Table } from 'react-bootstrap';
import { connect } from "react-redux";
import NO_Tasks from "../../no_task.png";
import AddMonitors from "./AddMonitors";
import Pic from "../../icon.png";
import Edit from "../../images/edit.svg";
import Delete from "../../images/delete.svg";

let last;
const formatDate = (date) => {
    date = new Date(date);

    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();

    monthIndex += "";
    if (monthIndex.length == 1)
        monthIndex = "0" + monthIndex;

    day += "";
    if (day.length == 1)
        day = "0" + day;

    return year + '-' + monthIndex + '-' + day;
}

const SortableItem = sortableElement((props) => {

    const handleClick = (e) => {
        console.log(document.getElementById(last))
        console.log(document.getElementById(props.sno))
        let last_element = document.getElementById(last);
        let present_element = document.getElementById(props.sno);

        if (present_element != last_element) {
            if (last_element != null && last_element.classList.contains("active")) { last_element.classList.remove("active") }
            present_element.classList.add("active")
        }
        if ((present_element == last_element) && (present_element.classList.contains("active"))) {
            present_element.classList.remove("active")
        }
        else
            present_element.classList.add("active")


        // console.log("sno",props.sno)
        // console.log(e)
        last = props.sno;
    }

    const handleEdit = (e) => {
        console.log("ye hai handleEdit ke ander", props)
        let name = props.taskname;
        let id = props.id;
        let description = props.body;
        let status = props.status;
        let estimate = props.estimate;
        props.toOpen({ name, id, description, status, estimate });
    }

    let role = localStorage.getItem("role");


    // console.log(document.getElementById(props.sno))
    return <Card className="no-border" id={props.sno}>

        <div className="strip stripBorder"  >
            <div className="num" style={{ padding: '1%' }}>{props.sno}</div>
            <div className="taskname" style={{ padding: '1%' }}>{props.taskname}</div>
            <div className="created" style={{ padding: '1%' }}>{props.created ? formatDate(props.created) : "NA"}</div>
            <div className="estimate" style={{ padding: '1%' }}>{props.estimate ? formatDate(props.estimate) : "NA"}</div>
            <div className="status" style={{ padding: '1%' }}>{(props.status.completed) ? <div className={"completed"}>Completed</div> : (props.status.finishAndInReview) ? <div className={"review"}>Finished and in Review</div> : (props.status.inProgress) ? <div className={"in_progress"}> In progress</div> : <div className={"start"}> Not yet Started</div>}</div>
            {(role === "admin" || role === "manager") && <div className="edit" style={{ padding: '1%' }} onClick={handleEdit}><i className="fa fa-pencil-square" aria-hidden="true" title="Edit"></i> </div>}
            <Accordion.Toggle as={Card.Text} className="arrow" style={{ padding: '1%' }} eventKey={props.sno + " "} onClick={handleClick} ><i className="fa fa-chevron-down" aria-hidden="true"></i></Accordion.Toggle>

        </div>

        <Accordion.Collapse eventKey={props.sno + " "} className="collapsed">
            <Card.Body className="hidden">{props.body}</Card.Body>
        </Accordion.Collapse>
    </Card>
});

const SortableInfiniteList = sortableContainer(({ items, open, cid, pid, token, toOpen }) => {
    console.log(items, "this are items passed");
    return (
        <Infinite
            containerHeight={400}
            elementHeight={49}
            className="scrolling"
        >
            {items && items.map(({ priority, height, name, creationTime, estimatedDate, status, description, id }, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index}
                    sno={index + 1}
                    height={height}
                    taskname={name}
                    created={creationTime}
                    estimate={estimatedDate}
                    status={status}
                    body={description}
                    open={open}
                    id={id}
                    cid={cid}
                    pid={pid}
                    token={token}
                    toOpen={toOpen}
                />
            ))}
        </Infinite>
    );
});





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

const modalStyle = function () {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
    let top = 50;
    let left = 50;

    return {
        position: 'fixed',
        width: 650,
        height: 360,
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

const modalStyle2 = function () {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
    let top = 50;
    let left = 50;

    return {
        position: 'fixed',
        width: 650,
        height: 500,
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

const modalStyle4 = function () {
    // we use some psuedo random coords so nested modals
    // don't sit right on top of each other.
    let top = 50;
    let left = 50;

    return {
        position: 'fixed',
        width: 600,
        height: 500,
        zIndex: 1040,
        top: top + '%',
        left: left + '%',
        borderRadius: '8px',
        backgroundColor: 'black',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 0,
        overflow: 'hidden',
        transform: 'translate(-50%, -50%)'
    };
};






class Logs extends Component {
    constructor(props) {
        super(props);
        console.log("ye hai props inside constructor", this.props);

        this.state = {
            pid: "",
            name: "",
            description: "",
            id: this.props,
            showModal: false,
            showModal2: false,
            showModal3: false,
            showModal4: false,
            showModal5: false,

            project: {
                name: "",
                description: ""
            },

            open: false,
            loading: false,
            editLoading: false,
            deleteLoader: false,
            deleteLoaderConfirm: false,
            fetchEmpLoader: false,
            deleteMonitorConfirm: false,
            startDate: null
        };

        this.close = () => {
            this.setState({ showModal: false });
        };

        this.open = () => {
            this.setState({ showModal: true });
        };

        this.close2 = () => {
            this.setState({ showModal2: false });
        };

        this.open2 = (id) => {
            console.log(id, "ye neeche se aa rha", new Date(id.estimate))
            this.setState({
                showModal2: true,
                taskName: id.name,
                taskDes: id.description,
                editId: id.id,
                startDate: id.estimate ? new Date(id.estimate) : null,
                stat: (id.status.completed) ? "Completed" : (id.status.finishAndInReview) ? "Finished and in Review" : (id.status.inProgress) ? "In progress" : "Not yet Started"
            });
        };


    }

    close3 = () => {

        this.setState({
            showModal3: false,
            deleteLoader: false
        });
    };
    open3 = () => {
        // console.log(id,"ye hain id")
        this.setState({
            showModal3: true,
            deleteLoader: true
            // editId:id
        });
    }

    close4 = () => {

        this.setState({
            showModal4: false,
            deleteLoader: false
        });
    };
    open4 = () => {
        // console.log(id,"ye hain id")
        this.setState({
            showModal4: true,
            fetchEmpLoader: true
            // editId:id
        });
        const url_emp = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/employees/";
        console.log(url_emp, "sending fetch emp request");
        fetch(url_emp, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {

                // console.log("cdcqqqqqqqqqqqqqqdsc",data);
                const arr = data.res;
                this.setState({
                    monitors: arr,
                    fetchEmpLoader: false
                })


            })

            .catch(err => console.log(err))
    }

    close5 = () => {

        this.setState({
            showModal5: false,
            deleteLoader: false
        });
    };
    open5 = (id) => {
        console.log(id, "ye hain id")
        this.setState({
            showModal5: true,
            deleteLoader: true,
            deleteId: id
        });
    }

    addToState = (val) => {
        let array = [...this.state.team];
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (val.id === array[i].id) {
                index = i;
            }
        }
        if (index === -1) {
            this.setState({
                team: [...this.state.team, val]
            })
        }

    }

    componentDidMount() {
        console.log("see props inside componentDidMountqqqqqqqqqqqqqqqqqq", this.props);
        const url_sup = "https://sdmp-jss.herokuapp.com/api/ward/"+this.props.match.params.wid;
        // console.log("cddscsdCds",this.props);
        fetch(url_sup,{
            headers: {
                Authorization: "Bearer "+localStorage.getItem('token')
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


        const url_logs = "https://sdmp-jss.herokuapp.com/api/bin/"+this.props.match.params.did+"/logs";
        // console.log(url);
        fetch(url_logs, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("cdaaaaaaaaaaaaaaaacdsc",data);
                this.setState({
                    logs: data.content
                })
                if (!data.content) {
                    this.setState({
                        logs: []
                    })
                }




            })
            .catch(err => console.log(err));
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            id: nextProps,
            project: {
                name: "",
                description: ""
            },
            logs: null,
            supervisors: null
        })

        const url_sup = "https://sdmp-jss.herokuapp.com/api/ward/"+nextProps.match.params.wid;
        // console.log("cddscsdCds",this.props);
        fetch(url_sup,{
            headers: {
                Authorization: "Bearer "+localStorage.getItem('token')
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


        const url_logs = "https://sdmp-jss.herokuapp.com/api/bin/"+nextProps.match.params.did+"/logs";
        // console.log(url);
        fetch(url_logs, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("cdaaaaaaaaaaaaaaaacdsc",data);
                this.setState({
                    logs: data.content
                })
                if (!data.content) {
                    this.setState({
                        logs: []
                    })
                }




            })
            .catch(err => console.log(err));
    }


    renderBackdrop(props) {

        return <div {...props} style={backdropStyle} />;
    }

    // onSortEnd = ({ oldIndex, newIndex }) => {
    //     console.log(this.state.items[newIndex]);
    //     console.log(this.state.items[oldIndex]);
    //     if (oldIndex !== newIndex && !this.state.items[oldIndex].status.completed && !this.state.items[newIndex].status.completed) {
    //         let priority = 0;
    //         this.setState(({ items }) => ({
    //             items: arrayMove(items, oldIndex, newIndex),
    //         }));
    //         // console.log("oldindex",this.state.items[oldIndex-1],this.state.items[oldIndex],this.state.items[oldIndex+1])
    //         let prevPriority = (this.state.items[newIndex - 1]) ? this.state.items[newIndex - 1].priority : 0;
    //         let nextPriority = (this.state.items[newIndex + 1]) ? this.state.items[newIndex + 1].priority : 0;
    //         if (prevPriority !== 0 && nextPriority !== 0) {
    //             priority = (prevPriority + nextPriority) / 2;
    //         }
    //         else if (prevPriority === 0) {
    //             priority = nextPriority - 20;
    //         }
    //         else if (nextPriority === 0) {
    //             priority = prevPriority + 20;
    //         }
    //         // console.log("newindex", this.state.items[newIndex - 1], this.state.items[newIndex], this.state.items[newIndex + 1])
    //
    //         // console.log("priority", priority)
    //         this.setState(prevState => {
    //             const items = [...prevState.items];
    //             items[newIndex] = { ...items[newIndex], priority: priority }
    //             return { items }
    //         })
    //
    //         const url_task_id = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/projects/" + this.props.match.params.pid + "/tasks/" + this.state.items[newIndex].id;
    //         // console.log(url);
    //         const dataObj = {
    //             "update": {
    //                 "priority": priority
    //             }
    //         }
    //
    //         fetch(url_task_id, {
    //             headers: {
    //                 Authorization: "Bearer " + localStorage.getItem('token'),
    //                 "Content-Type": "application/json"
    //             },
    //             method: 'PUT',
    //             body: JSON.stringify(dataObj)
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //
    //                 console.log("anurag", data);
    //
    //             })
    //             .catch(err => console.log(err));
    //
    //     }
    // };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,

        })
    }

    handleDate = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleTaskChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,

        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        let name = this.state.name;
        let description = this.state.description;
        let status = {
            notYetStarted: true,
            inProgress: false,
            finishAndInReview: false,
            completed: false
        };
        let markAsUrgent = document.getElementById('checkbox').checked;
        // console.log(markAsUrgent);
        let numberOfHours = "";
        let dataObj = { name, description, status, markAsUrgent, numberOfHours };

        // console.log(dataObj);
        // console.log(this.state.id.match.params.pid);

        const url_task = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/projects/" + this.state.id.match.params.pid + "/tasks/";
        // console.log(url_task,"cddscsdCds",this.props);
        fetch(url_task, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(dataObj)
        })
            .then(res => res.json())
            .then(data => {

                console.log("anurag", data);

                if (data.error) {
                    this.setState({
                        loading: false
                    })
                }
                else {
                    window.location.reload();
                }
            })

            .catch(err => {
                console.log(err)
                this.setState({
                    loading: false
                })
            })

    }

    handleDelete = () => {
        // console.log("ye hai id",id);
        this.setState({
            deleteLoaderConfirm: true
        })
        const url_task_id = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/projects/" + this.props.match.params.pid + "/tasks/" + this.state.editId;
        console.log(url_task_id);


        fetch(url_task_id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {

                console.log("anurag", data);
                if (data.error) {
                    console.log(data.error, "this is the error coming while deleting task")
                    this.setState({
                        deleteLoaderConfirm: false
                    })
                }
                else {
                    window.location.reload(false);

                }

            })
            .catch(err => console.log(err));
    }

    handleDeleteMonitor = () => {
        this.setState({
            deleteMonitorConfirm: true
        })

        const dataObj = {
            "update": {
                "team": [{ "id": this.state.deleteId }]
            }
        }
        console.log(dataObj);
        const url = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/projects/" + this.props.match.params.pid + "/employees/remove";
        console.log(url, "sending put project", this.props);
        fetch(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(dataObj)
        })
            .then(res => res.json())
            .then(data => {

                console.log("anurag", data);
                if (data.error) {
                    console.log("errrrrrrrrrrror")

                    this.setState({
                        deleteMonitorConfirm: false
                    })
                }
                else {
                    // window.location.reload(false);
                    let array = [...this.state.team];
                    let index = null;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].id === this.state.deleteId) {
                            index = i;
                        }
                    }
                    if (index !== null) {
                        array.splice(index, 1);
                        this.setState({
                            team: array
                        })
                    }
                    this.close5();
                    this.setState({
                        deleteMonitorConfirm: false
                    })
                }
            })

            .catch(err => {
                console.log(err);
                this.setState({
                    deleteMonitorConfirm: false
                })

            })
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.setState({
            editLoading: true
        })
        const url_task_id = "https://us-central1-dexpert-admin.cloudfunctions.net/api/clients/" + this.props.match.params.cid + "/projects/" + this.props.match.params.pid + "/tasks/" + this.state.editId;
        console.log(url_task_id);

        // console.log("myname is value", value)
        let status = {};
        if (this.state.stat === "Not yet Started") {
            status = {
                completed: false,
                finishAndInReview: false,
                inProgress: false,
                notYetStarted: true
            };
        }
        else if (this.state.stat === "In progress") {
            status = {
                completed: false,
                finishAndInReview: false,
                inProgress: true,
                notYetStarted: true
            };
        }
        else if (this.state.stat === "Finished and in Review") {
            status = {
                completed: false,
                finishAndInReview: true,
                inProgress: true,
                notYetStarted: true
            };
        }
        else if (this.state.stat === "Completed") {
            status = {
                completed: true,
                finishAndInReview: true,
                inProgress: true,
                notYetStarted: true
            };
        }
        let name = this.state.taskName;
        let desc = this.state.taskDes;
        let date = this.state.startDate;
        const dataObj = {
            "update": {
                status,
                "name": name,
                "description": desc,
                "estimatedDate": date
            }
        }

        console.log(dataObj, "sending this data");

        fetch(url_task_id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(dataObj)
        })
            .then(res => res.json())
            .then(data => {

                console.log("anurag", data);
                if (data.error) {
                    console.log(data.error, "this is the error coming while editing task")
                    this.setState({
                        editLoading: false
                    })
                }
                else {
                    window.location.reload(false);
                }

            })
            .catch(err => console.log(err));
    }

    getInitals(stringData) {
        console.log(stringData)
        let strings = stringData.split(" ");
        if (strings.length>1 && strings[1] !== "null")
            return strings[0].charAt(0).toUpperCase() + "" + strings[1].charAt(0).toUpperCase()
        else return stringData.charAt(0).toUpperCase();
    }


    render() {
        console.log("ye hai props inside render methodaaaaaaaaaaaaaaaaa", this.props.location.state.bin);
        const { logs, open } = this.state;
        const { bin } = this.props.location.state;
        let role = localStorage.getItem("role");
        // console.log("ye hai tasks",tasks)
        // console.log("ye hai items",items)


        return (
            <div className="tasks">
                <div className="headerTask">
                    <div className="sets">
                        {
                            this.state.supervisors && this.state.supervisors.map((supervisor, index) =>
                                // console.log(employee,"this is employee list")
                                <div className="set" key={index}>
                                    <div className="profileImg">
                                        <div className="profile" >{this.getInitals((supervisor.firstName)+" "+(supervisor.lastName))} </div>
                                    </div>

                                    <div className="name">
                                        <p>{supervisor.firstName}</p>
                                    </div>

                                </div>
                            )
                        }
                        {(role === "admin" || role === "manager") && <div className="addMonitors">
                            <div className="editIconInside" onClick={this.open4}>
                                {/* <i className="fa fa-pencil" aria-hidden="true" title="Edit Monitors"></i> */}
                                <img src={Edit} />
                            </div>
                        </div>}
                    </div>


                    {/*uncomment to add search bar*/}


                    {/*<div className="searchTask">*/}
                    {/*    <i className="fa fa-search fa-xs ic"></i>*/}
                    {/*    <input type="text" className="search" placeholder="Search task"/>*/}


                    {/*</div>*/}
                    <div className="addButton modal-example">
                        {(role === "admin" || role === "manager") && <button onClick={this.open} className="add_task" type="button">
                            {" "}
                            <span>+</span>&nbsp;&nbsp; Add Task{" "}
                        </button>}

                        <Modal
                            onHide={this.close}
                            style={modalStyle()}
                            aria-labelledby="modal-label"
                            show={this.state.showModal}
                            renderBackdrop={this.renderBackdrop}
                        >
                            <div className="modalMain">
                                <h2 id="modal-label">CREATE TASK</h2>
                            </div>
                            <Form onSubmit={this.handleSubmit}>
                                <div className="check">
                                    <Form.Group style={{ float: 'right' }} controlId="formBasicChecbox">
                                        <Form.Check id="checkbox" type="checkbox" label="mark me urgent" />
                                    </Form.Group>
                                </div>


                                <Form.Group>
                                    <Form.Label className="taskLabel">TASK NAME</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Write here...."
                                        className="nameField"
                                        id="name"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="taskLabel">TASK DESCRIPTION</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Write here...."
                                        className="desField"
                                        id="description"
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="createBt">
                                    <Button type="submit" variant="secondary" size="sm" className="taskCreate" >
                                        {this.state.loading ? <i className={"fa fa-refresh fa-spin"}></i> : "CREATE"}
                                    </Button>
                                </Form.Group>
                            </Form>

                        </Modal>

                    </div>



                </div>
                {/*activatedAt: null*/}
                {/*active: false*/}
                {/*bin: "1400950137"*/}
                {/*id: "5dbbdf85c0120d00045bd21d"*/}
                {/*installedBy: {id: "5d70d2337b9ee2000431befa", username: "admin", firstName: "admin", lastName: null, authorities: "ROLE_ADMIN,ROLE_SUPERVISOR"}*/}
                {/*landmark: null*/}
                {/*location: {x: 26.861066, y: 80.90972, coordinates: Array(2), type: "Point"}*/}
                {/*registeredAt: "2019-11-01T07:32:21.035Z"*/}
                {/*status: {percentage: 69, lastUpdatedAt: "2019-11-02T15:14:01.141297Z", comment: "The bin status is currently set to random."}*/}


                <div className="bodyTask">
                    {/*<h4>{(this.state.project.name) ? this.state.project.name : <lines className="shine proj_name"></lines>}</h4>*/}
                    {/*<p>{(this.state.project.description) ? this.state.project.description : <lines className="shine proj_desc"></lines>}</p>*/}
                    <h5> {`BIN : ${bin.bin}`} </h5>
                    <p> {`Bin-Id : ${bin.id}`} </p>
                    <p> {(bin.landmark)?`Landmark - ${bin.landmark}`:""} </p>




                    {/*{!logs && <div className="task-tableBody">*/}
                    {/*    <div className="num"><lines className="shine task_holder_num"></lines></div>*/}
                    {/*    <div className="taskname"><lines className="shine task_holder_name"></lines></div>*/}
                    {/*    <div className="created"><lines className="shine task_holder"></lines></div>*/}
                    {/*    <div className="estimate"><lines className="shine task_holder"></lines></div>*/}
                    {/*    <div className="status"><lines className="shine task_holder"></lines></div>*/}
                    {/*    <div className="arrow"></div>*/}
                    {/*</div>}*/}

                    {logs && logs.length === 0 && <div className={"task-div"}><img className="no_task" src={NO_Tasks} alt="logo" /></div>}
                    {logs && logs.length === 0 && <div className={"no_task-div"}><p className={"no_proj"}>No Logs available !!!</p></div>}


                    <Table responsive striped bordered hover >
                        {logs && logs.length !== 0 && <thead>
                        <tr>
                            <th>#</th>
                            <th>Time</th>
                            <th>Precentage Full</th>

                        </tr>
                        </thead>}
                        <tbody>

                        { !logs &&
                        <tr>
                            <td></td>
                            <td><lines className="shine task_holder"></lines></td>
                            <td><lines className="shine task_holder"></lines></td>
                        </tr>
                        }

                        {
                            logs && logs.map( (log, key) => {
                                return(
                                    <tr>
                                        <td>{key+1}</td>
                                        <td>{log.instant}</td>
                                        <td className="per_log">{log.percentage}</td>
                                    </tr>)
                            })
                        }
                        </tbody>
                    </Table>
                    {/*<Accordion>*/}
                    {/*    <SortableInfiniteList items={items} open={open} toOpen={this.open2} cid={this.props.match.params.cid} pid={this.props.match.params.pid} token={localStorage.getItem('token')} onSortEnd={this.onSortEnd} />*/}
                    {/*</Accordion>*/}
                    <Modal
                        onHide={this.close3}
                        className={"delete-model"}
                        aria-labelledby="modal-label"
                        show={this.state.showModal3}
                        renderBackdrop={this.renderBackdrop}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Task</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you want to delete ?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            {this.state.deleteLoaderConfirm ? "" : <Button variant="secondary" onClick={this.close3}>Cancel</Button>}
                            <Button variant="danger" onClick={this.handleDelete}>
                                {this.state.deleteLoaderConfirm ? <i className={"fa fa-refresh fa-spin"}></i> : "Confirm"}
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
                                <Form.Label className="taskLabel">TASK NAME</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Write here...."
                                    className="nameField"
                                    id="taskName"
                                    value={this.state.taskName}
                                    onChange={this.handleTaskChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="taskLabel">TASK DESCRIPTION</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Write here...."
                                    className="desField"
                                    id="taskDes"
                                    value={this.state.taskDes}
                                    onChange={this.handleTaskChange}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="taskLabel">ESTIMATED TIME</Form.Label>
                                <br />
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="Click to select a date"
                                    minDate={new Date()}
                                    selected={this.state.startDate}
                                    onChange={this.handleDate}
                                    className={"datePicker"}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="taskLabel">STATUS</Form.Label>
                                <Form.Control id="stat" value={this.state.stat} as="select" onChange={this.handleTaskChange}>
                                    <option>Not yet Started</option>
                                    <option>In progress</option>
                                    <option>Finished and in Review</option>
                                    <option>Completed</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="createBt1">
                                {this.state.editLoading ? "" : <p className="taskDelete red" onClick={this.open3}>{this.state.deleteLoader ? <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> : <span>Delete Task</span>}</p>}
                                <Button type="submit" variant="secondary" size="sm" className="taskEdit" >
                                    {this.state.editLoading ? <i className={"fa fa-refresh fa-spin"}></i> : "SAVE"}
                                </Button>

                            </Form.Group>
                        </Form>

                    </Modal>


                    <Modal
                        onHide={this.close4}
                        style={modalStyle4()}
                        aria-labelledby="modal-label"
                        show={this.state.showModal4}
                        renderBackdrop={this.renderBackdrop}
                    >

                        <div className="monitorHeading">
                            <h5 id="modal-label">Add New Monitors</h5>
                        </div>

                        <br />

                        <AddMonitors
                            options={this.state.monitors}
                            pid={this.props.match.params.pid}
                            cid={this.props.match.params.cid}
                            token={localStorage.getItem('token')}
                            fetchEmpLoader={this.state.fetchEmpLoader}
                            addToState={this.addToState}
                        />

                        <br />
                        <br />

                        <div className="monitorHeading">
                            <h5 id="modal-label">Current Monitors</h5>
                        </div>

                        <br />

                        <div className="monitor-list">
                            {
                                this.state.team && this.state.team.map((employee, index) =>
                                    // console.log(employee,"this is employee list")
                                    <div className="monitor" key={index}>
                                        <div className="profileImg monitorImg">
                                            <div className="profile">{this.getInitals(employee.name)} </div>
                                        </div>
                                        <div className="monitorName vert-align">{employee.name}</div>
                                        <div className="monitorMail vert-align">{employee.email}</div>
                                        <div className="vert-align">
                                            <img src={Pic} alt="logo" className="vert-align deleteEmp" title={"Delete"} onClick={() => this.open5(employee.id)} />
                                        </div>
                                    </div>
                                )
                            }
                        </div>


                    </Modal>
                    <Modal
                        onHide={this.close5}
                        className={"delete-model"}
                        aria-labelledby="modal-label"
                        show={this.state.showModal5}
                        renderBackdrop={this.renderBackdrop}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Monitor</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you want to delete ?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            {this.state.deleteMonitorConfirm ? "" : <Button variant="secondary" onClick={this.close5}>Cancel</Button>}
                            <Button variant="danger" onClick={this.handleDeleteMonitor}>
                                {this.state.deleteMonitorConfirm ? <i className={"fa fa-refresh fa-spin"}></i> : "Confirm"}
                            </Button>
                        </Modal.Footer>
                    </Modal>



                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("my name is state1", state);
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Logs);