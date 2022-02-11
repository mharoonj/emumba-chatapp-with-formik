import React, { useRef, useEffect } from "react";
import { useFormikContext, FieldArray, Field, ErrorMessage } from "formik";
import "./styles.css";
const ChatScreen = () => {
  const scrollRef = useRef(null);
  const { values, errors, setFieldValue } = useFormikContext();
  const currentUser = values.users[values.currentUser];
  const chatWith = values.users[values.chatWith];
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, []);

  const filteredChat = () => {
    return values.messages.filter((message, index) => {
      if (
        (message.sender === currentUser || message.receiver === currentUser) &&
        (message.sender === chatWith || message.receiver === chatWith)
      ) {
        return true;
      }
      return false;
    });
  };

  const chat = filteredChat();
  return (
    <div className="h-100">
      <div className="h-100">
        <div
          className="message-container"
          style={{ backgroundColor: "lightblue", padding: 10 }}
        >
          {/* Messages render */}
          <div
            style={{
            
              display: "flex",
              flex: 1,
              flexDirection: "column-reverse",
    
            }}
            className="message-container-style"
          >
            <div>{/* <h1>sdjfjsl 1</h1> */}</div>
            {chat.reverse().map((item, index) => {
              let isSender = currentUser == item.sender;
              return (
                <div
                  key={item.sender + item.message}
                  ref={index == 0 ? scrollRef : null}
                  style={{
                    display: "flex",
                    flexDirection: isSender ? "row-reverse" : "row",
                  }}
                >
                  <div
                    style={{
                  
                    }}
                    className="message-body"
                  >
                    <p
                      style={{
                        float: isSender ? "right" : "left",
                        paddingRight: 20,
                        paddingLeft: 20,
                      }}
                    >
                      {item.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="message-field">
          {/* message Field */}
          <FieldArray name="messages">
         {({push})=>(
              <div>
              <div className="inline-block message-field-div">
              <Field
              name={`currentMessage`}
              placeholder="Type Your Message here"
              type="text"
              className="message-field"
            />
            <ErrorMessage
                          name={`currentMessage`}
                          component="div"
                          className="field-error"
                        />
              </div>
              <div className="inline-block message-send-div">
                  <button disabled={errors.currentMessage?true:false} onClick={(e)=>{
                      e.preventDefault();
                      push({sender:currentUser, receiver:chatWith, message:values.currentMessage, read:false})
                      setFieldValue("currentMessage", "")
                  }}>send</button>
              </div>
          </div>
         )}
         
           
          </FieldArray>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
