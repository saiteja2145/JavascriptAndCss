import React from "react";

const InputBox = props => {
  const { type, id, label, value, setValue } = props;
  return (
    <div className="inputBoxContainer">
      <label htmlFor={id} className="inputBox__label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={label}
        className="inputBox"
        onChange={e => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default InputBox;
