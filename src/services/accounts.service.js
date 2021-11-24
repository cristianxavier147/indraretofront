export default {
    getAccounts: ($axios) => {
        return $axios.$get(`/accounts`)
    },
    getMovementsByAccount: ($axios, data) => {
        return $axios.$get(`/account-detail?id=${data.id}`)
    }
}