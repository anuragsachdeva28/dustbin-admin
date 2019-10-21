import React, { Component } from "react";
import { Button, Form, Row } from "react-bootstrap";

// const DataList = ({ id, options }) => (
//
// );
class Autocomplete extends Component {
  state = {
    name: "",
    exist:false,
    options:[]
  };



  addChange = () => {
    this.setState({
      exist:false
    })
    const name = document.getElementById("empName").value;
    if (name !== "") {
      let id = "";
      let email = "";
      let entered = false;
      console.log("see this", name);
      const keys = document.querySelectorAll("#data-list option");
      // console.log(keys)
      keys.forEach((key, item) => {
        if (key.getAttribute("value").toString().toLowerCase() === name.toString().toLowerCase()) {
          console.log("here 1");
          id = key.getAttribute("data-id");
          console.log(key.getAttribute("data-email"));
          email = key.getAttribute("data-email");
          this.props.onSelection({ name, id, email });
          entered = true;
        }

      });
      if(!entered){
        this.setState({
          exist:true
        })
      }
      document.getElementById("empName").value = "";
    }
  };

  getSupervisor = () => {
    const url = `https://sdmp-jss.herokuapp.com/api/user/search?query=${this.state.name}`;
    fetch(url, {
      headers: {
        Authorization: "Bearer "+localStorage.getItem('token')
      }
    })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            options: data
          })
        })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    }, () => {
      if (this.state.name && this.state.name.length >=1) {
        this.getSupervisor()
      }
    })
  }

  focus = () => {
    this.setState({
      exist:false
    })
  }


  render() {
    // console.log("zzzzzzzzzzzzz",this.props)
    return (
      <React.Fragment>
        <datalist id={"data-list"} onautocomplete={this.selected}>
          {this.state.options &&
            this.state.options.map((employee, id) => (
              <option
                data-id={employee.id}

                className="opt"
                value={employee.username}
                key={id}
              >
                {/*{`${employee.firstName} ${employee.lastName}`}*/}
                {(employee.lastName)?`${employee.firstName} ${employee.lastName}`:`${employee.firstName}`}
              </option>
            ))}
        </datalist>
        <Form.Group as={Row} className={"alignment"}>
          <Form.Control
              name='name'
              value={this.state.name}
            type="text"
            placeholder="Add monitors"
            className="addMember"
            list={"data-list"}
            id={"empName"}
            onFocus={this.focus}
            onChange={this.handleChange}
          />
          <Button className={"add-monitor-bt"} variant="secondary" size="sm" onClick={this.addChange}>
            <b>add</b>
          </Button>
        </Form.Group>
        {this.state.exist && <p className="red">Employee with this name does not exist.</p>}
      </React.Fragment>
    );
  }
}

export default Autocomplete;

// static propTypes= {
//     suggestions: PropTypes.instaceOf(Array)
// };

// static defaultProperty = {
//     suggestions: []
// };

// constructor(props){
//     super(props);
//     this.state = {
//         activeSuggestion:0,
//         filteredSuggestions: [],
//         showSuggestion: false,
//         userInput: ""
//     };
// }

// onChange = e => {

// };

// onClick = e => {

// };

// onKeyDown = e => {

// };

// const {
//     onChange,
//     onClick,
//     onKeyDown,
//     state: {
//       activeSuggestion,
//       filteredSuggestions,
//       showSuggestions,
//       userInput
//     }
//   } = this;
