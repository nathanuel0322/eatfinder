import React, {createContext, useState} from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth} from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            alert('Signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
            if (error.code === 'auth/user-not-found') {
              alert('There is no user account linked to this email!');
            }
            if (error.code === 'auth/wrong-password') {
              alert('Incorrect password! Please try again.');
            }
            if (error.code === 'auth/user-disabled') {
              alert('This user is currently disabled.');
            }
            console.error(error);
          });
        },
        register: async (email, password) => {
          await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              console.log('Account created & signed in!')
              alert('Signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
              }
              if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
              }
              if (error.code === 'auth/operation-not-allowed') {
                alert('Email & password accounts are not enabled!');
              }
              if (error.code === 'auth/weak-password') {
                alert('Password is not strong enough. Add additional characters including special characters and numbers.');
              }
              console.error(error);
            });
        },
        logout: async () => {
          await signOut(auth)
            .then(() => {
              alert('Signed out!');
            })
            .catch(error => {
              console.error(error);
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};