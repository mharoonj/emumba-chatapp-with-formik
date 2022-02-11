import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUserPen } from "@fortawesome/free-solid-svg-icons";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import "./styles.css";
import { ErrorMessage, Field, useFormikContext } from "formik";
const MyTabs = (props) => {
  const { setFieldValue } = useFormikContext();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
    const {item, index, values, currentUser, arrayHelpers, errors, setErrors, setTouched} = props;

  const getUnreadMessageCount=(item)=>{
    return values.messages.reduce((total,x) => (!x.read && x.receiver == item ? total+1 : total), 0)
  }

  return (
    <button onClick={(e) => {
      e.preventDefault();
      setFieldValue("currentUser", index)
      setFieldValue("chatWith", index==0?1:0)
      setErrors({});
      setTouched({});
      }} className={index==currentUser?"btn btn-primary":"btn btn-light"}>
      <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        
        <div style={{ flex: 0.6 }}>
        {getUnreadMessageCount(item) == 0?null:<div className={"inline-block notification-span"}>{getUnreadMessageCount(item)}</div>}
          {item}
          </div>
        <div style={{ flexDirection: "row-reverse", flex: 0.4 }}>
          <FontAwesomeIcon
            className="mx-3"
            onClick={(e) => {
              e.stopPropagation()
              onOpenModal()
            }}
            icon={faUserPen}
          />

          <FontAwesomeIcon
            className="mx-3"
            onClick={(e) => {
              e.stopPropagation();
              if(values.users.length>2){
                setFieldValue("currentUser",0)
                setFieldValue("chatWith",1)
              }
              
              arrayHelpers.remove(index);
              
            }}
            icon={faXmark}
          />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center >
        <div style={{width:400}}>
        <h4>Edit Name</h4>
        <ErrorMessage
                          name={`editNameField`}
                          component="div"
                          className="field-error"
                        />
            
        <Field
              name={"editNameField"}
              placeholder="Type Your Message here"
              type="text"
              className="message-field"
            />
       <div>
         <button disabled={errors.editNameField?true:false} onClick={(e)=>{
           e.preventDefault();
           
           
           const messages = values.messages.map((message)=>{
              if(message.sender === values.users[index]){
                message.sender=values.editNameField
              }
              if(message.receiver === values.users[index]){
                message.receiver=values.editNameField
              }

              return message
           });

          
           arrayHelpers.replace(index, values.editNameField)
           setFieldValue("editNameField", "")
           setErrors({})
           setTouched({})
         }}>Update</button>
         </div>   
         </div>  
      </Modal>
    </button>
  );
};

export default MyTabs;
