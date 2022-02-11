import { useFormikContext } from "formik";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { values, errors, setFieldValue, setErrors, setTouched } =
    useFormikContext();
  console.log("formik values : ", values);
  console.log("errors : ", errors);
  const chatWithIndex = values.users[values.chatWith] ?? null;
  const onClickSideBar = (e, userIndex) => {
    e.preventDefault();
    setFieldValue("chatWith", userIndex);
    setErrors({});
    setTouched({});
  };
  return (
    <div style={{ flexDirection: "column", alignItems: "flex-start" }} className="sidebar-container">
      <div>
        {values.users.map((user, userIndex) => {
          const isSelected = chatWithIndex && chatWithIndex === user;
          if (userIndex === values.currentUser) return;
          return (
            <div
              style={{
                backgroundColor: isSelected ? "lightgrey" : "white",paddingTop:10,
                height: 40,
              }}
              onClick={(e) => onClickSideBar(e, userIndex)}
              key={userIndex + user}
              className={isSelected ? "sidebar-div-selected" : "sidebar-div"}
              align="center"
            >
              {isSelected && (
                <FontAwesomeIcon className="mx-3" icon={faAngleRight} />
              )}
              {user}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
