import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import { auth } from './firebase';
import "./login.css";
import firebase from 'firebase';
import wp from './whatsapp.png'
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const [profile, setprofile] = useState("");
    const history =useHistory();
   const [{user},dispatch]=useStateValue();
    const login=()=>{auth.signInWithEmailAndPassword(email,password).then((user)=>{
        console.log(user)
        if(user){
           
    //  dispatch({type:actionTypes.SET_USER,user:user});
         }
    }).catch((Err)=>{
        alert(Err.message);
    })
    };
  const create= ()=>{
 auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
     console.log(auth);
     if(firebase.auth().currentUser!==null){
        firebase.auth().currentUser.updateProfile({
            displayName:name,
            photoURL:profile
        }).then((user)=>{
            console.log(user);
            if(user){

                dispatch({type:actionTypes.SET_USER,user:user});
        
             }
        })
     }
    
 }).catch((err)=>{
     alert(err.message);
 })
  }
  
    
    return (
        <div className="Login">
             <img src={wp}/>
            <div className="container">
         
                 <h1 style={{margin:0,textAlign:"center"}}>Login</h1>
                 <input type="text" placeholder="Full Name" value={name} onChange={(e)=>{setname(e.target.value)}} />
                 <input type="text" placeholder="Profile Pic url" value={profile} onChange={(e)=>{setprofile(e.target.value)}} />
                 <input type="text" placeholder="Enter your Email" value={email} onChange={(e)=>{setemail(e.target.value)}} />
                 <input type="password" placeholder="Password"  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>

                 <button className="submit" onClick={login}>Log In</button>
                
                 <button onClick={create}>Create New Account</button>
            </div>
           

        </div>
    )
}

export default Login
