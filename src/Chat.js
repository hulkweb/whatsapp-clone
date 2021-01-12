import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, EmojiEmotions, Mic, MoreHoriz, Search, VoiceChat } from '@material-ui/icons';
import React ,{ useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './chat.css';
import db from './firebase';
import firestore from 'firebase';
import firebase from 'firebase'
import { useStateValue } from './StateProvider';
function Chat({user}) {
    const newUser=useStateValue();
const [lastSeen, setlastSeen] = useState("");
    const reciver=true;
    const [msg, setMsg] = useState("");
    const [Messages, setMessages] = useState([]);
    const {roomId}=useParams();
 
    const [roomName, setroomName] = useState("");
    const sendmsg= async (e)=>{
     e.preventDefault();
    await  db.collection("rooms").doc(roomId).collection("messages").add({
         user:newUser[0].user.displayName,
         message:msg,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
        
     });
     setMsg("");
     
     window.location.reload(false);
    }
   
useEffect( async() => {
  
    if(roomId){
        db.collection("rooms").doc(roomId).onSnapshot( (snapshot)=>setroomName(snapshot.data())) ;


     await db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc")
        .onSnapshot( (snapshot)=> setMessages(
               snapshot.docs.map(  (doc)=> ({msg:doc.data().message,
                    id:doc.id,
                    user:doc.data().user,
                    timestamp: new Date( doc.data().timestamp?.seconds*1000).toUTCString()}))
                )
        );
        if(Messages.length!==0){
            setlastSeen(Messages[Messages.length-1].timestamp);
        }
        
    }
    
    
}, [roomId])

    return (
        <div className="chat">
           <div className="chat__header">
               <Avatar/>
               <div className="chat__header__detail">
                  <h2>{roomId ? roomName?.name:"room name"}</h2>
                  <p>{lastSeen}</p>
               </div>
               <div className="chat__header__right">
                   <IconButton>
                     <Search/>
                   </IconButton>

                   <IconButton>
                     <MoreHoriz/>
                   </IconButton>
                   
                   
               </div>
           </div>

           <div className="chat__body">
               { Messages.map((msg)=>( 
            <p className={`chat__body__msg  ${msg.user===user.displayName&&"reciver_msg"}`} onClick={
                ()=>{db.collection("rooms").doc(roomId).collection("messages").doc(msg.id).delete()}}>
            <span className="room_name">{msg.user}</span>
                   {msg.msg}
                 <span className="msg_time">{msg.timestamp }</span>
            </p>
               ))}
              
              
           </div>

           <div className="chat__footer">
               <IconButton>
                   <EmojiEmotions/>
               </IconButton>
               <IconButton>
                    <AttachFile/> 
               </IconButton>
          
             
              <form>
              <input type="text" placeholder="Search or start new chat"
                       value={msg} onChange={(e)=>{setMsg(e.target.value)}} />
                      <button type="submit" onClick={sendmsg}>search</button>
              </form>
              <IconButton>
                <Mic/>
               </IconButton>
            
           </div>
        </div>
    )
}

export default Chat;
