import React ,{useState,useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import { getUser, login } from './features/counter/counterSlice';
import {useDispatch, useSelector} from 'react-redux';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import {actionTypes} from './reducer';
function App() {
  const [{user},dispatch]=useStateValue();
  
 
 const history= useHistory();
 console.log(user);
useEffect(() => {

  auth.onAuthStateChanged((authUser)=>{
    if(authUser){
     console.log(authUser)
  dispatch({type:actionTypes.SET_USER,user:authUser});
    }
    else{

    }
  })
}, [])

  if(user){
    return (
   
      <div className="App">
    
       <Sidebar user={user}/>
  
    
     <Router>
       <Switch>
       
       <Route path="/room/:roomId" >
       <Chat  user={user} />
      </Route>
      <Route path="/">
         <Chat  user={user}  />
       </Route>
       </Switch>
       </Router>
       
      </div>
  
     
    );
  }
  else{
    return (<Login/>);
  }
 
}
 
export default App;
