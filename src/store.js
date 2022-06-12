import Vue from "vue";
import Vuex from "vuex"
import axios from "axios";
import { router } from "./router"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: "",
        fbAPIkey : "AIzaSyCrpJFc_P4YrnXW_XYZoKw8BpCkFpJa5Yw"
    },
    mutations : {
        setToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = ""
        }
    },
    actions : {
        initAuth({commit, dispatch}) {
          let token = localStorage.getItem("token")
            if(token) {
                let expirationDate = localStorage.getItem("expirationDate")
                let time = new Date().getTime()
                if(time >= +expirationDate) {
                    console.error("Session time out");
                    dispatch("logout")
                } else {
                    commit("setToken", token)
                    let timerSecond = +expirationDate - time
                    console.log(timerSecond)
                    dispatch("tokenTimer", timerSecond)
                    router.push("/")
                }
            } else {
                router.push("/auth")
                return false
            }
        },
        login({commit, dispatch, state}, authData){

            let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
            if(authData.isUser){
                authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
            }
            return axios.post(
                authLink + this.state.fbAPIkey,
                { email: authData.email, password: authData.password, returnSecureToken : true}
            ).then(response => {
                commit("setToken", response.data.idToken)
                localStorage.setItem("token", response.data.idToken)
                localStorage.setItem("expirationDate", new Date().getTime() + +response.data.expiresIn * 1000)

                dispatch("tokenTimer", +response.data.expiresIn * 1000)
            })
        },
        logout({commit, dispatch, state}) {
            commit("clearToken")
            localStorage.removeItem("token")
            localStorage.removeItem("expirationDate")
            router.replace("/auth")
        },
        tokenTimer({dispatch}, expiresIn) {
            setTimeout(() => {
                dispatch("logout")
            }, expiresIn)
        }
    },
    getters : {
        isAuthenticated(state) {
            return state.token !== ""
        }

    }
})

export default store