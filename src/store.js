import create from 'zustand';
import produce from "immer";
import { useRadioGroup } from '@mui/material';

const useStore = create(set => ({
  jwt: localStorage.getItem('jwt'),
  isLoggedIn: !!localStorage.getItem('jwt'),
  username: localStorage.getItem('username'),
  userId: localStorage.getItem('userId'),
  profileId: 0,
  setProfileId: (id) => set(produce(state => {state.profileId = id})),


  setLoggedIn: (jwt, username, userId) => set(state => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userId);

    return { ...state, isLoggedIn: !!jwt, username: username, userId: userId};
  }),

  logout: () => set(state => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    return { ...state, isLoggedIn: false, username: ""};
  }),
  
}))

export { useStore }