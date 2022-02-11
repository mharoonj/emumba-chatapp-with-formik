import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import MyTabs from "./MyTabs";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";

const validate = (values) => {
  const errors = {};
  if (!values.currentMessage) {
    errors.currentMessage = "Required";
  }

  if (!values.editNameField) {
    errors.editNameField = "Required";
  } else if (values.users.includes(values.editNameField)) {
    errors.editNameField = "Name Already Taken ";
  }

  return errors;
};

const MyChatApp = () => (
  <div>
    <br />
    <Formik
      initialValues={{
        users: ["Haroon", "Ali"],
        messages: [
          {
            sender: "Haroon",
            receiver: "Ali",
            message: "hello Ali",
            read: true,
          },
          {
            sender: "Ali",
            receiver: "Haroon",
            message: "hello Haroon",
            read: true,
          }
          
        ],
        currentUser: 0,
        chatWith: 1,
        currentMessage: "",
        editNameField: "",
        modal: false,
      }}
      validate={validate}
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
    >
      {({ values, errors, setErrors, setTouched }) => (
        <Form>
          <FieldArray
            name="users"
            render={(arrayHelpers) => {
              console.log("array helper : ", arrayHelpers);
              return (
                <div>
                  {values.users &&
                    values.users.map((item, index) => {
                      return (
                        <MyTabs
                          key={item + index}
                          item={item}
                          index={index}
                          values={values}
                          currentUser={values.currentUser}
                          arrayHelpers={arrayHelpers}
                          errors={errors}
                          setErrors={setErrors}
                          setTouched={setTouched}
                        />
                      );
                    })}
                  <div className="inline-block plus-sign-outer" align="center">
                    <div
                      className=" plus-sign"
                      onClick={() => {
                        const newUserName = `User ${values.users.length + 1}`;
                        arrayHelpers.push(newUserName);
                      }}
                    >
                      <FontAwesomeIcon className="mx-3" icon={faPlus} />
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <br />
          <hr></hr>
          <br />

          {values.users.length > 1 && (
            <div
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
                minHeight: "75vh",
                maxHeight: "75vh",
              }}
            >
              <div style={{ flex: 0.2 }}>
                {/* sidebar */}
                <Sidebar />
              </div>
              <div style={{ flex: 0.75 }}>
                {/* Chat Screen */}
                <ChatScreen />
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  </div>
);

export default MyChatApp;
