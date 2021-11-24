import AccountsService from '@/services/accounts.service.js'

export const state = () => ({
    accountsAndCards: []
})

export const getters = {}

export const mutations = {
    SET_ACCOUNTS_AND_CARDS(state, data){
        state.accountsAndCards = data
    }
}

export const actions = {
    async getAccounts({state, commit}){
        let res = await AccountsService.getAccounts(this.$axios)
        commit('SET_ACCOUNTS_AND_CARDS',res)
        return res
    },
    async getMovementsByAccount({state, commit}, data){
        return await AccountsService.getMovementsByAccount(this.$axios, data)
    }
}