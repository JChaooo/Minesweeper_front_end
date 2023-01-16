import {createStore} from "vuex";

export default createStore({
    state: {
        user: {},
        records: []
    },
    mutations: {
        setUser(state, user) {
            console.log(state, user)
            state.user = user
        },
        setRecords(state, records) {
            console.log("setRecords:", records)
            state.records = records
        }
    },
    actions: {},
    modules: {}
})