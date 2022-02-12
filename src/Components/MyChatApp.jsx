import React from "react";
import { Formik, Form, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// importing custom components
import MyTabs from "./MyTabs";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";

// importing styles file that is used in all components
import "./styles.css";

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
        users: ["Haroon", "Ali"],  // all users
        messages: [                // all messages
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
          },
        ],
        currentUser: 0,         // current user index from users array
        chatWith: 1,            // index of person with whom current user is chatting
        currentMessage: "",     // message field state
        editNameField: ""      // edit user name field state
      }}
      validate={validate}
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
    >
      {({ values, errors, setErrors, setTouched, setFieldValue }) => (
        <Form>
          <FieldArray
            name="users"
            render={(arrayHelpers) => {
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
                        // getting array with 'User x' names
                        const getLastUserId = values.users.filter((user) =>
                          user.includes("User")
                        );

                        // getting the last id and making new user name
                        let newUserName;
                        if (getLastUserId.length > 0) {
                          newUserName = `User ${
                            parseInt(
                              getLastUserId[getLastUserId.length - 1].split(
                                " "
                              )[1]
                            ) + 1
                          }`;
                        } else {
                          newUserName = `User ${values.users.length + 1}`;
                        }

                        // adding user in state users
                        arrayHelpers.push(newUserName);
                        if (values.users.length == 1) {
                          // setting chatWith to null because single user present and he has no one to chat with
                          setFieldValue("chatWith", null);
                        }
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
