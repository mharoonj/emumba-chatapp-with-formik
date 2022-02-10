import { useFormikContext } from 'formik'
import React from 'react'

const Sidebar = () => {
    const {values} = useFormikContext()
    console.log("formik values : ", values)
  return (
    <div>
        {values.users.map((user,userIndex)=>{
            if(userIndex == values.currentUser) return ;

            return (<div align="center">
                {user}
            </div>)
        })}
    </div>
  )
}

export default Sidebar