import { defineStore } from 'pinia'
import { createUserService } from '../services'


export const useUserGlobal = defineStore('userGlobal', {
  state: () => ({
    user: {},
    loggedIn: false
  }),
  actions: {
    initUserGlobal() {
      createUserService().getUserDetails().then((response: any) => {
        this.setUser(response)
      })
    },
    setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn
    },
    setUser(user: any) {
      this.user = user
    },
    getUser() {
      return this.user
    }
  }
})
