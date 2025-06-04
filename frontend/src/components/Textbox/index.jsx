import React from "react";
import './textbox.css';

export default function Textbox({ placeholder, value, onChange }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="textbox"
    />
  );
}