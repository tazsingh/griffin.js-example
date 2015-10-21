import React from "react";
import ReactDOM from "react-dom";
import {connect, Action, Store} from "griffin.js";

// Actions are simply classes
class NewText extends Action {
  constructor(newInput) {
    super();

    this.newInput = newInput;

    this.dispatch();
  }
}

// Stores are singletons, thus need to be instantiated from a class
const TextStore = new class extends Store {
  reducer(state = "", action) {
    switch(action.constructor) {
      case NewText:
        return action.newInput;
      default:
        return state;
    }
  }
}

// the @connect decorator links a Component's props to Stores
@connect({ textInputValue: TextStore })
class HomeComponent extends React.Component {
  handleChange(event) {
    let value = event.target.value;

    new NewText(value);
  }

  render() {
    return (
      <div>
        <h1>An Example App Built with Griffin.js!</h1>

        <label>
          Type something:
          <input type="text" onChange={this.handleChange} />
        </label>

        <p>You typed: {this.props.textInputValue}</p>
      </div>
    );
  }
}

ReactDOM.render(<HomeComponent />, document.body);
