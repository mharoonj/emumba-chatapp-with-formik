import { useFormikContext } from 'formik'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


const Sidebar = () => {
    const {values} = useFormikContext()
    console.log("formik values : ", values)
    const chatWithIndex = values.users[values.chatWith]??null;
   
  return (
    <div style={{ flexDirection:"column", alignItems:"flex-start"}}>
        <div>
        {values.users.map((user,userIndex)=>{
            if(userIndex == values.currentUser) return ;

            return (<div key={userIndex+user} className={chatWithIndex && chatWithIndex === user?"sidebar-div-selected":"sidebar-div"} align="center">
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