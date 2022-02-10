import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUserPen } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import MyTabs from "./MyTabs";
import Sidebar from "./Sidebar";

const MyChatApp = () => (
  <div>
    <h1>Tabs</h1>
    <Formik
      initialValues={{ users: ["jared", "ian", "brent","shfdshjfhksjdkfsdfkhsdjkl"], currentUser:0 }}
      onSubmit={(values) =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      
    >
        {({ values }) => (
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
                        <MyTabs key={item+index} item={item} index={index} values={values} currentUser={values.currentUser} arrayHelpers={arrayHelpers}  />
                      );
                    })}
                </div>
              );
            }}
          />
          <br/>
          <br/>

          <div style={{display:"flex",flex:1, flexDirection:"row"}}>
              <div style={{flex:0.22, backgroundColor:"red"}}>
                {/* sidebar */}

          <Sidebar />
              </div>
              <div style={{flex:0.78,backgroundColor:"yellow"}}>fsfsdf</div>
          </div>
          

        </Form>
      )}
    </Formik>
  </div>
);

export default MyChatApp