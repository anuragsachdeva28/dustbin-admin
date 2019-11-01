import React, { Component } from 'react';
// import { Form, Row, Col, Button } from 'react-bootstrap';
import CardList from "./CardList";
import { Link, NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import Pic from "../../no_proj.png";
import Icon from '../Sidebar/Icon/Icon';

class Dustbins extends Component {
    state = {}

    componentDidMount() {
        // console.log(this.props, "projects pe call kiya hua props")
        const url = `https://sdmp-jss.herokuapp.com/api/bin?wardId=${this.props.match.params.wid}`;
        // console.log(url);
        fetch(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("cdcdsc",data.content);

                const arr = data.content;
                this.setState({ dustbins: arr })

            })

            .catch(err => console.log(err))
    }
    componentWillReceiveProps(nextProps) {
        console.log("new props")
        this.setState({
            dustbins: null
        });
        const url = `https://sdmp-jss.herokuapp.com/api/bin?wardId=${nextProps.match.params.wid}`;
        // console.log(url);
        fetch(url, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => res.json())
            .then(data => {

                console.log("cdcdsc",data.content);

                const arr = data.content;
                this.setState({ dustbins: arr })

            })

            .catch(err => console.log(err))
    }

    render() {
        // console.log(this.state.projects[0].name)
        let role = localStorage.getItem("role");
        return (

            <div className="projAside">
                <div className="projHeader">
                    <div className="projHeaderName">
                        <h5 className="projList">DUSTBINS</h5>
                    </div>
                    {(role === "admin" || role === "manager") && <div className="addIcon">
                        <Link to={"/wards/" + this.props.match.params.cid + "/dustbins/add/"} >
                            <div className="addIconInside">
                                {/* <span>+</span> */}
                                <Icon
                                    icon="fa-plus"
                                    title="Admin"
                                // active={this.state.active}
                                />
                            </div>
                        </Link>
                    </div>}
                </div>

                <div className="projHeader_fake"></div>

                <div className="cards">


                    {
                        !this.state.dustbins && <Card className="cardLayout" >
                            <Card.Body>

                                <Card.Subtitle className="mb-2 text-muted cardSub">created on: <lines className="shine date"></lines> </Card.Subtitle>
                                <Card.Title className="cardTitle"><lines className="shine title"></lines></Card.Title>
                                <Card.Text className="cardText"><lines className="shine desc"></lines></Card.Text>
                                <lines className="shine tag_holder"></lines>
                            </Card.Body>
                        </Card>

                    }

                    {this.state.dustbins && this.state.dustbins.length === 0 && <div className={"no_proj-img"}><img src={Pic} alt="profile" /></div>}
                    {this.state.dustbins && this.state.dustbins.length === 0 && <div className={"no_proj-div"}><p className={"no_proj"}>No dustbins added !!!</p></div>}

                    {
                        this.state.dustbins && this.state.dustbins.map((dustbin, key) =>
                            <NavLink to={"/wards/" + this.props.match.params.wid + "/dustbins/" + (dustbin.id) + "/logs"} key={key} activeClassName={"active"} >
                                {/*{console.log(dustbin)}*/}
                                <CardList
                                    date={dustbin.registeredAt ? formatDate(dustbin.registeredAt) : "NA"}
                                    title={dustbin.bin}
                                    description={dustbin.landmark}
                                    activeTask={dustbin.percentage}
                                />
                            </NavLink>
                        )
                    }


                </div>
            </div>
        )
    }
}

const formatDate = (date) => {
    date = new Date(date);

    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();

    monthIndex += "";
    if (monthIndex.length == 1)
        monthIndex = "0" + monthIndex;

    day += "";
    if (day.length == 1)
        day = "0" + day;

    return year + '-' + monthIndex + '-' + day;
}
const mapStateToProps = (state) => {
    console.log("my name is state1", state);
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Dustbins);