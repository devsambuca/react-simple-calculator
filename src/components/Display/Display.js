import React, { Component } from "react";
import "./Display.css";
import AutoScalingField from "./AutoScalingField";

export default class Display extends Component {
  render() {
    const { value, ...props } = this.props;
    const language = navigator.language || "en-US";
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    });

    return (
      <div {...props} className="field">
        <AutoScalingField>{formattedValue}</AutoScalingField>
      </div>
    );
  }
}
