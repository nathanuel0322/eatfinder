import React, {useContext, useState, useEffect} from 'react';
import {onAuthStateChanged } from 'firebase/auth';
import {AuthContext} from './AuthProvider';
import {auth} from '../firebase';
import LoginScreen from '../screens/LoginScreen';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignupScreen from '../screens/SignUpScreen';
import Home from '../screens/Home';
import Reviews from '../screens/Reviews';
export const fetchlink = process.env.NODE_ENV === 'production ' ? '' : 'http://localhost:3001'

export default function MyRoutes() {
  const {user, setUser, logout} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if (initializing) {setInitializing(false)}
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser); 
    return () => {
      unsubscribe(); 
    }; 
  }, [])

  return (
    <div>
      {user && 
        <p className='flex flex-row justify-end w-full pr-4 mt-4'>
          <button className='text-white p-4 rounded-2xl bg-red-600 hover:bg-orange-600' onClick={() => logout()}>
            Sign Out
          </button>
        </p>
      }
      <h1 className='text-center text-5xl mt-8' style={{fontFamily: 'fantasy'}}>EatFinder</h1>
      <HashRouter>
        <Routes>
          <Route exact path='/' element={user ? <Home /> : <LoginScreen />} />
          <Route path='/:slug' element={user ? <Reviews /> : <LoginScreen />} />
          <Route exact path='/signup' element={user ? <Navigate to="/" replace={true} /> : <SignupScreen />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
