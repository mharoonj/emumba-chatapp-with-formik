import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUserPen } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
const MyTabs = (props) => {
    const {item, index, values, currentUser, arrayHelpers} = props;
  return (
    <button onClick={(e) => e.preventDefault()} className={index==currentUser?"btn btn-primary":"btn btn-light"}>
      <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 0.6 }}>{item}</div>
        <div style={{ flexDirection: "row-reverse", flex: 0.4 }}>
          <FontAwesomeIcon
            className="mx-3"
            onClick={() => {
              console.log("userpen:", item, index);
            }}
            icon={faUserPen}
          />
          <FontAwesomeIcon
            className="mx-3"
            onClick={() => {
              console.log("han bhai kesa deya :", item, index);
              arrayHelpers.remove(index);
            }}
            icon={faXmark}
          />
        </div>
      </div>
    </button>
  );
};

export default MyTabs;
