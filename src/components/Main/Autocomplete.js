import React, { Component } from "react";
import { Button, Form, Row } from "react-bootstrap";

// const DataList = ({ id, options }) => (
//
// );
class Autocomplete extends Component {
  state = {
    name: "",
    exist:false
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
          {this.props.options &&
            this.props.options.map((employee, id) => (
              <option
                data-id={employee.id}
                data-name={employee.name}
                data-email={employee.email}
                className="opt"
                value={employee.name}
                key={id}
              >
                {`      ${employee.email}`}
              </option>
            ))}
        </datalist>
        <Form.Group as={Row} className={"alignment"}>
          <Form.Control
            type="text"
            placeholder="Add monitors"
            className="addMember"
            list={"data-list"}
            id={"empName"}
            onFocus={this.focus}
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
