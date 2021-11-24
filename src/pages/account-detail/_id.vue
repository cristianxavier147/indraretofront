<template>
  <div>
    <v-app-bar elevation="0"
    color="#331bcfd4">
      <div class="container-close" @click="$router.push('/')">
        <span>x</span>
      </div>
    </v-app-bar>
    <div class="container-page-detail">
      <div class="container-detail">
        <div class="detail">
          <span class="detail-name">{{ name }}</span>
          <span class="detail-balance">{{ balance }}</span>
          <span class="detail-status">{{ status }}</span>
        </div>
      </div>
      <div class="loading" v-if="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>      
      </div>
      <div v-else>
        <Movements :movements="movements"/>
      </div>
    </div>
  </div>
</template>

<script>
import helperGroupBy from '@/helper/groupBy'
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      detail: [],
      accountOrCard: null
    }
  },
  computed: {
    ...mapState("accounts",['accountsAndCards']),
    name(){
      if(this.accountOrCard){
        return this.accountOrCard.name.toLowerCase()
      }
      return ''
    },
    status(){
      if(this.accountOrCard){
        if(this.accountOrCard.type == 'ACCOUNT'){
            return 'Saldo disponible'
        }else{
            return 'Línea de crédito'
        }
      }
      return ''
    },
    balance(){
      if(this.accountOrCard){
        return `S/ ${this.accountOrCard.balance}`
      }
      return ''
    },
    movements(){
      return helperGroupBy.convertByProperty(this.detail, 'dateoperation');
    }
  },
  methods: {
    ...mapActions("accounts",['getMovementsByAccount']),
    async getMovementsByAccountService(){
      this.loading = true
      try {
        let json = {
          id: this.$route.params.id
        }
        let res = await this.getMovementsByAccount(json)
        this.detail = res
      } catch (error) {
        console.log("error",error)
      } finally {
        this.loading = false
      }
    },
    validateId(){
      this.accountOrCard = this.accountsAndCards.find(x => x.id == this.$route.params.id)
      if(this.accountOrCard){
        this.getMovementsByAccountService()
      }else{
        this.$router.back()
      }
    }
  },
  created() {
    if(!this.$route.params.id){
      this.$router.back()
    }
    this.validateId()
  }
}
</script>

<style lang="scss">
  .container-close{
    width: 30px;
    height: 30px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      color: black;
    }
  }
  .container-page-detail{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 32px 16px;
    gap: 15px;
    .container-detail{
      width: 100%;
      height: 230px;
      background-color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .detail{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        &-name{
          font-size: 15px;
          font-weight: 700;
          text-transform: capitalize;
          margin-bottom: 2px;
        }
        &-balance{
          font-size: 16px;
          font-weight: 500;
          text-align: left;
          color: rgb(53, 53, 53);
        }
        &-status{
          font-size: 13px;
          font-weight: 600;
          color: rgb(185, 184, 184);
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