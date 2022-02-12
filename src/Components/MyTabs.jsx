import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUserPen } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import { ErrorMessage, Field, useFormikContext } from "formik";
const MyTabs = (props) => {
  const { setFieldValue } = useFormikContext();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    item,
    index,
    values,
    currentUser,
    arrayHelpers,
    errors,
    setErrors,
    setTouched,
  } = props;
  const getUnreadMessageCount = (item) => {
    // getting message count for particular user with values.messages[index].read key value as false
    return values.messages.reduce(
      (total, x) => (!x.read && x.receiver == item ? total + 1 : total),
      0
    );
  };

  const removeMessagesOfUser = (values, username) => {
    values.messages.forEach((message, index) => {
      // finding message with user name deleting name in sender or receiver
      if (message.sender === username || message.receiver == username) {
        // deleting message on particular index
        values.messages.splice(index, 1);
      }
    });
  };

  const setCurrentUser = (e) => {
    e.preventDefault();
    setFieldValue("currentUser", index);
    setFieldValue("chatWith", index == 0 ? 1 : 0);
    setErrors({});
    setTouched({});
  };

  const onClickEditUser = (e) => {
    e.preventDefault();

    // updating new name in all messages
    // this will update because we are editing in reference
    values.messages.forEach((message) => {
      if (message.sender === values.users[index]) {
        message.sender = values.editNameField;
      }
      if (message.receiver === values.users[index]) {
        message.receiver = values.editNameField;
      }
    });

    // this will rerender and messages with new User name will be shown
    arrayHelpers.replace(index, values.editNameField);
    // field state to empty bacause we dont want it now
    setFieldValue("editNameField", "");
    setTouched({});
  };
  return (
    <button
      onClick={(e) => setCurrentUser(e)}
      className={index == currentUser ? "btn btn-primary" : "btn btn-light"}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 0.6 }}>
          {/* conditional rendering  notification */}
          {getUnreadMessageCount(item) == 0 ? null : (
            <div className={"inline-block notification-span"}>
              {getUnreadMessageCount(item)}
            </div>
          )}
          {item}
        </div>
        <div style={{ flexDirection: "row-reverse", flex: 0.4 }}>
          <FontAwesomeIcon
            className="mx-3"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            icon={faUserPen}
          />

          <FontAwesomeIcon
            className="mx-3"
            onClick={(e) => {
              e.stopPropagation();
              if (values.users.length > 2) {
                setFieldValue("currentUser", 0);
                setFieldValue("chatWith", 1);
              }
              // deleting messages of 'user x'
              // if user names User 4 is deleted and later another user is named
              // User 4 then previous messages of User 4 should not be shown to new User 4
              removeMessagesOfUser(values, values.users[index]);

              // removing User from users state
              arrayHelpers.remove(index);
            }}
            icon={faXmark}
          />
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div style={{ width: 400 }}>
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
            <button
              disabled={errors.editNameField ? true : false}
              onClick={(e) => onClickEditUser(e)}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </button>
  );
};

export default MyTabs;
