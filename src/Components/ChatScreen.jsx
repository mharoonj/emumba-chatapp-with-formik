import React,{useRef,useEffect} from 'react'
import { useFormikContext } from 'formik'
const ChatScreen = () => {
    const scrollRef = useRef(null);
    const {values} = useFormikContext()
    const currentUser = values.users[values.currentUser];
    const chatWith = values.users[values.chatWith];
    useEffect(()=>{
       if(scrollRef.current){
        scrollRef.current.scrollIntoView()
       }
    },[])

    const filteredChat = ()=>{
        return values.messages.filter((message,index)=>{
            if((message.sender === currentUser || message.receiver=== currentUser) && (message.sender === chatWith || message.receiver=== chatWith)){
                return true;
            }
            return false
        })
    }

    const chat =  filteredChat()
  return (
    <div className="h-100">
        <div className="h-100">
            <div className="message-height">
                {/* Messages render */}
                <div   style={{minHeight:"100%",display:"flex", flex:1, flexDirection:"column-reverse", position:"absolute"}}>
                    <div ref={scrollRef}><h1>sdjfjsl 1</h1></div>
                    {chat.reverse().map((item)=>{
                        return  <div ><h1>{item.message}</h1></div>
                    })}
                </div>
            </div>
            <div className="message-field">
                {/* message Field */}
                fields
            </div>
        </div>
    </div>
  )
}

export default ChatScreen