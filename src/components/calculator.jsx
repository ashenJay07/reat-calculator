import React, { Component } from "react";

class Calculator extends Component {
  state = {
    /* prettier-ignore */
    calBtn: ["AC", "DEL", "÷", 1, 2, 3, "x", 4, 5, 6, "+", 7, 8, 9, "-", ".", 0, "="],
    screen: { currentValue: 0, previousValue: 0 },
    operator: "",
  };

  handleMath = (op) => {
    const screen = { ...this.state.screen };
    console.log(typeof screen.previousValue);
    console.log(typeof parseInt(screen.currentValue));

    if (screen.previousValue === 0)
      screen.previousValue = parseInt(screen.currentValue);
    else {
      switch (op) {
        case "+":
          return screen.previousValue + parseInt(screen.currentValue);
        case "-":
          return screen.previousValue - parseInt(screen.currentValue);
        case "x":
          return screen.previousValue * parseInt(screen.currentValue);
        case "÷":
          return screen.previousValue / parseInt(screen.currentValue);
      }
    }
  };

  handleButtonClick = (e) => {
    const userInput = e.currentTarget.value;
    const screen = { ...this.state.screen };

    if (userInput <= 9 || userInput === ".") {
      console.log("number");
      if (screen.currentValue === 0) screen.currentValue = "";
      screen.currentValue += userInput;
      this.setState({ screen });
    } else {
      if (!this.state.operator) {
        screen.previousValue = parseInt(screen.currentValue);
        screen.currentValue = 0;
        this.setState({ operator: userInput, screen });
      } else {
        screen.previousValue = this.handleMath(this.state.operator);
        screen.currentValue = userInput === "=" ? screen.previousValue : 0;
        this.setState({ operator: "", screen });
      }
    }
  };

  render() {
    // console.log("operator: ", this.state.operator);
    return (
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-operand">
            {this.state.screen.previousValue}
          </div>
          <div className="current-operand">
            {this.state.screen.currentValue}
          </div>
        </div>

        {/* rendering calculator buttons */}
        {this.state.calBtn.map((value) => (
          <button
            key={value}
            className={value === "AC" || value === "=" ? "span-two" : ""}
            onClick={this.handleButtonClick}
            value={value}
          >
            {value}
          </button>
        ))}
      </div>
    );
  }
}

export default Calculator;
