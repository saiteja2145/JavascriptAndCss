import React from "react";

export const Loader = props => {
  return (
    <div className="loaderConatiner">
      <div className="loader"></div>
      <div className="loading">{props.type}...</div>
    </div>
  );
};
