import React, { Component } from "react";
import "./CalcKey.css";

export default class CalcButton extends Component {
  render() {
    const { ...props } = this.props;
    return (
      <div className="wrap-calc-key">
        <button
          className="calc-key"
          onClick={() => this.props.handleClick()}
          {...props}
        />
      </div>
    );
  }
}
