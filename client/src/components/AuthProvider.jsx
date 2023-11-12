import React, {createContext, useState} from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth} from '../firebase';
import { Toaster } from 'react-hot-toast';
import { toastError, toastSuccess } from '../GlobalFunctions';

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
            toastSuccess('Signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/user-not-found') {
              toastError('There is no user account linked to this email!');
            }
            if (error.code === 'auth/wrong-password') {
              toastError('Incorrect password! Please try again.');
            }
            if (error.code === 'auth/user-disabled') {
              toastError('This user is currently disabled.');
            }
            if (error.code === 'auth/configuration-not-found') {
              toastError('Login credentials not found!\nPlease create an account.')
            }
            if (error.code === 'auth/missing-email') {
              toastError('Please enter an email address!');
            }
            if (error.code === 'auth/missing-password') {
              toastError('Please enter a password!');
            }
            console.error(error);
          });
        },
        register: async (email, password) => {
          await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              toastSuccess('Account created!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                toastError('That email address is already in use!');
              }
              if (error.code === 'auth/invalid-email') {
                toastError('That email address is invalid!');
              }
              if (error.code === 'auth/operation-not-allowed') {
                toastError('This operation is not allowed!');
              }
              if (error.code === 'auth/weak-password') {
                toastError('Password is not strong enough. Add additional characters including special characters and numbers.');
              }
              if (error.code === 'auth/configuration-not-found') {
                toastError('Please fill out all fields!')
              }
              console.error(error);
              return error;
            });
        },
        logout: async () => {
          await signOut(auth)
            .then(() => {
              toastSuccess('Signed out!');
            })
            .catch(error => {
              toastError('Error signing out!');
            });
        },
      }}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};