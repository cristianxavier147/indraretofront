<template>
  <div class="container-index">
    <div class="container-welcome">
      <div class="welcome">
        <span class="welcome-cheers">Hola Cristian</span>
        <span class="welcome-title">Bienvenido!</span>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>      
    </div>
    <div class="loading" v-else>
      <AccountsAndCards title="Cuentas" :data="accounts"/>
      <AccountsAndCards title="Tarjetas" :data="cards"/>
    </div>
  </div>
</template>

<script>
import AccountsAndCards from '@/components/AccountsAndCards'
import { mapActions } from 'vuex'
export default {
  components: {
    AccountsAndCards
  },
  data() {
    return {
      loading: true,
      accountsAndCards: []
    }
  },
  computed: {
    accounts(){
      return this.accountsAndCards.filter(x => x.type == "ACCOUNT")
    },
    cards(){
      return this.accountsAndCards.filter(x => x.type == "CREDIT_CARD")
    }
  },
  methods: {
    ...mapActions("accounts",['getAccounts']),
    async getAccountsService(){
      this.loading = true
      try {
        let res = await this.getAccounts()
        this.accountsAndCards = res
      } catch (error) {
        console.log("error",error)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.getAccountsService()
  }
}
</script>

<style lang="scss">
  .container-index{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 32px 16px;
    gap: 15px;
    .container-welcome{
      width: 100%;
      height: 230px;
      background-color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .welcome{
        display: flex;
        flex-direction: column;
        justify-content: center;
        &-cheers{
          font-size: 24px;
          font-weight: 600;
        }
        &-title{
          font-size: 18px;
          font-weight: 600;
          text-align: left;
          color: rgb(53, 53, 53);
        }
      }
    }
    .loading{
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
  }
</style>