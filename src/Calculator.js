import React from "react";
import "./Calculator.css";
import CalcKey from "./components/CalcKey/CalcKey";
import Display from "./components/Display/Display";

const CalculatorOperations = {
  "/": (prevValue, nextValue) => prevValue / nextValue,
  "*": (prevValue, nextValue) => prevValue * nextValue,
  "+": (prevValue, nextValue) => prevValue + nextValue,
  "-": (prevValue, nextValue) => prevValue - nextValue,
  "=": (prevValue, nextValue) => nextValue
};

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: "0",
    operator: null,
    waitingForOperand: false
  };

  clearAll() {
    this.setState({
      value: null,
      displayValue: "0",
      operator: null,
      waitingForOperand: false
    });
  }

  clearDisplay() {
    this.setState({
      displayValue: "0"
    });
  }

  toggleSign() {
    const { displayValue } = this.state;
    const newValue = parseFloat(displayValue) * -1;

    this.setState({
      displayValue: String(newValue)
    });
  }
  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;
    const maxLenght = 9;

    if (String(displayValue).length < maxLenght) {
      if (waitingForOperand) {
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        });
      } else {
        this.setState({
          displayValue:
            displayValue === "0" ? String(digit) : displayValue + digit
        });
      }
    }
  }

  performOperation(nextOperator) {
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    });
  }

  render() {
    const { displayValue } = this.state;
    const clearDisplay = displayValue !== "0";
    const clearText = clearDisplay ? "C" : "AC";

    return (
      <div className="wrapper-calc">
        <div className="calc">
          <Display value={displayValue} />
          <div className="row">
            <div className="block-num">
              <div className="block-functions block-oper">
                <div className="btn">
                  <CalcKey
                    handleClick={() =>
                      clearDisplay ? this.clearDisplay() : this.clearAll()
                    }
                  >
                    {clearText}
                  </CalcKey>
                </div>
                <CalcKey handleClick={() => this.toggleSign()}>+/-</CalcKey>
              </div>

              <div className="block-oper">
                <CalcKey handleClick={() => this.inputDigit(7)}>7</CalcKey>
                <CalcKey handleClick={() => this.inputDigit(8)}>8</CalcKey>
                <CalcKey handleClick={() => this.inputDigit(9)}>9</CalcKey>
              </div>
              <div className="block-oper">
                <CalcKey handleClick={() => this.inputDigit(4)}>4</CalcKey>
                <CalcKey handleClick={() => this.inputDigit(5)}>5</CalcKey>
                <CalcKey handleClick={() => this.inputDigit(6)}>6</CalcKey>
              </div>
              <div className="block-oper">
                <CalcKey handleClick={() => this.inputDigit(1)}>1</CalcKey>
                <CalcKey handleClick={() => this.inputDigit(2)}>2</CalcKey>
                <CalcKey handleClick={() => this.inputDigit(3)}>3</CalcKey>
              </div>
              <div className="block-oper zero">
                <CalcKey handleClick={() => this.inputDigit(0)}>0</CalcKey>
              </div>
            </div>

            <div className="block-basic-operations">
              <CalcKey handleClick={() => this.performOperation("/")}>
                ÷
              </CalcKey>

              <CalcKey handleClick={() => this.performOperation("*")}>
                ×
              </CalcKey>

              <CalcKey handleClick={() => this.performOperation("-")}>
                -
              </CalcKey>
              <CalcKey handleClick={() => this.performOperation("+")}>
                +
              </CalcKey>
              <CalcKey handleClick={() => this.performOperation("=")}>
                =
              </CalcKey>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
