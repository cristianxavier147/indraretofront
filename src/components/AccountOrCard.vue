<template>
  <div class="account">
    <div class="account-row">
      <span class="name" @click="redirectToDetail()">{{
        account.name.toLowerCase()
      }}</span>
      <span class="balance">{{ balance }}</span>
    </div>
    <div class="account-row">
      <span class="number">{{ accountNumber }}</span>
      <span class="status">{{ status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["account"],
  computed: {
    status() {
      if (this.account.type == "ACCOUNT") {
        return "Saldo disponible";
      } else {
        return "Línea de crédito";
      }
    },
    balance() {
      return `S/ ${this.account.balance}`;
    },
    accountNumber() {
      return `*${this.account.number.substr(6, 9)}`;
    },
  },
  methods: {
    redirectToDetail() {
      this.$router.push(`/account-detail/${this.account.id}`);
    },
  },
};
</script>

<style lang="scss">
.account {
  display: flex;
  flex-direction: column;
  padding: 8px 4px 16px 4px;
  &-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    span {
      font-weight: 500;
      font-size: 14px;
    }
    .name {
      color: rgb(64, 187, 224);
      text-transform: capitalize;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .balance {
      font-weight: 600;
    }
    .number {
      font-weight: 600;
      font-style: italic;
    }
    .status {
      color: rgb(185, 184, 184);
      font-style: 13px;
    }
  }
}
</style>
