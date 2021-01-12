import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from './firebase';

function SingleRoom({addNewRoom,id,name}) {
  const [Messages, setMessages] = useState([]);

  useEffect(() => {
       
    db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","asc")
    .onSnapshot( (snapshot)=> setMessages(
           snapshot.docs.map(  (doc)=> ({msg:doc.data().message,
                id:doc.id,
                user:doc.data().user,
                timestamp: new Date( doc.data().timestamp.seconds*1000).toUTCString()}))
            )
    );
   }, [])
    const addNewRoomHere=()=>{
     const Room=prompt("Enter the new room");

   
     if(Room!==""){
      db.collection("rooms").add({
        name:Room
      })
     }
    
    };
        if(addNewRoom){
            return (  <div className="sidebaar__single__room">
           
            <div className="sidebaar__single__room__detail">
              <h3 onClick={addNewRoomHere}>Add new Room</h3>
            </div>
        </div>   )
        }
        else{
            return (  <div className="sidebaar__single__room">
            <Avatar/>
            <div className="sidebaar__single__room__detail">
              <h2>{name}</h2>
              <p>{Messages[Messages.length-1]?.msg}</p>
            </div>
        </div>   )
        }
        
 
}

export default SingleRoom
