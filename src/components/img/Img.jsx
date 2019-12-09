import React from "react";

const Imgs = props => {
  return (
    <div>
      <img
        src={props.img}
        alt={props.alt}
        width={props.width}
        height={props.height}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        className='imgchingona'
      />
    </div>
  );
};

export default Imgs
