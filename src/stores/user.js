// Utilities
import { defineStore } from "pinia";
import { getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const auth = getAuth(getApp())

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      displayName: null,
      email: null,
      uid: null,
      photoURL: null
    },
  }),
  getters:{
    isAuthenticated(){
        return !!this.user.uid
    }
  },
  actions: {
    async signIn() {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      this.user = userCredential.user;
    },

    async signOut() {
      await signOut(auth);
      this.user = {};
    },
  },
});
