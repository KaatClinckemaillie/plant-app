import create from 'zustand';
import produce from "immer";

const useStore = create(set => ({
  jwt: localStorage.getItem('jwt'),
  isLoggedIn: !!localStorage.getItem('jwt'),
  username: localStorage.getItem('username'),
  userId: localStorage.getItem('id'),
  profileId: 0,
  setProfileId: (id) => set(produce(state => {state.profileId = id})),


  setLoggedIn: (jwt, username) => set(state => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('username', username);

    return { ...state, isLoggedIn: !!jwt, username: username};
  }),

  logout: () => set(state => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    return { ...state, isLoggedIn: false, username: ""};
  }),
  
}))

export { useStore }