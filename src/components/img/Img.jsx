import React from "react";

const Imgs = props => {
  return (
    <div>
      <img
        alt={props.alt}
        width={props.width}
        height={props.height}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {props.img}
      </img>
    </div>
  );
};

export default Imgs
