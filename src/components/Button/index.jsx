import { Component } from "react";
import "./style.css";

class Button extends Component {
  render() {
    const { title, onClick, disabled } = this.props;
    return(
      <div className={"btn-container"}>
        <button disabled={disabled} onClick={onClick}>
          <span>{title}</span>
        </button>
      </div>
    );
  }
}

export { Button };