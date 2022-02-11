import { useFormikContext } from 'formik'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
    const {values, errors,setFieldValue,setErrors, setTouched} = useFormikContext()
    console.log("formik values : ", values)
    console.log("errors : ", errors)
    const chatWithIndex = values.users[values.chatWith]??null;
   
  return (
    <div style={{ flexDirection:"column", alignItems:"flex-start"}}>
        <div>
        {values.users.map((user,userIndex)=>{
            if(userIndex == values.currentUser) return ;

            return (<div
            onClick={(e)=>{
              e.preventDefault();
              setFieldValue("chatWith",userIndex)
              setErrors({})
              setTouched({})
            }}
            key={userIndex+user} className={chatWithIndex && chatWithIndex === user?"sidebar-div-selected":"sidebar-div"} align="center">
              {chatWithIndex && chatWithIndex === user &&<FontAwesomeIcon
            className="mx-3"
            icon={faAngleRight}
          />}
                {user}
            </div>)
        })}
        </div>
    </div>
  )
}

export default Sidebar