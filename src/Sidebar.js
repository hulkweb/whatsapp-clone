import { Avatar, IconButton } from '@material-ui/core';
import React ,{useState,useEffect} from 'react';
import AddIcon from '@material-ui/icons/Add';
import { DataUsage, MoreHoriz, RoomRounded, Search } from '@material-ui/icons';
import SingleRoom from './SingleRoom';
import './sidebar.css';
import db, { auth } from './firebase';
import { BrowserRouter, Link, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './features/counter/counterSlice';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Sidebar({user}) {
   const [rooms, setrooms] = useState([]);
  const [input, setInput] = useState("");
  const [state,dispatch]=useStateValue();
  const searchInput=(e)=>{
      e.preventDefault();
      console.log(input);
      
  }

  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot=>{
      setrooms(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data(),
      })));
    })

  }, []);

    return (
        <div className="sidebar">
            <div class="sidebar__header">
               <Avatar src={user.photoURL}/>
               <div className="sidebar__header__right">
                   <IconButton>
                      <AddIcon/>
                   </IconButton>
                    <IconButton onClick={()=>{auth.signOut();dispatch({type:actionTypes.SET_USER,user:null});}} >
                      <DataUsage/>
                    </IconButton>
                    <IconButton>
                      <MoreHoriz/>
                    </IconButton>
                 
                  
               </div>
            </div>
            <div class="sidebar__search">
                <div className="sidebar__search__inner">
                <Search/>
                  <form>
                      
                      <input type="text" placeholder={user.displayName}
                       value={input} onChange={(e)=>{setInput(e.target.value)}} />
                      <button type="submit" onClick={searchInput}>search</button>
                  </form>
                </div>
               
            </div>
            <div class="sidebar__rooms">
                 <SingleRoom addNewRoom={true} />
                               {
                                 rooms.map(room=>(
                                   <BrowserRouter>
                                    <Link to={`/room/${room.id}`}>
                                   <SingleRoom key={room.id}  id={room.id} name={room.data.name} />
                                   </Link>
                                   </BrowserRouter>
                                  
                                   
                                 ))
                               }
                 
            </div>
        </div>
    )
}

export default Sidebar
