<template>
  <div class="container-accounts">
    <span class="title-accounts">{{ title }}</span>
    <div class="accounts">
      <AccountOrCard v-for="a in dataComputed" :key="a.id" :account="a" />
    </div>
  </div>
</template>

<script>
import AccountOrCard from "@/components/AccountOrCard";
export default {
  components: {
    AccountOrCard,
  },
  props: ["data", "title"],
  computed: {
    dataComputed() {
      return this.data.filter((x) => x.status == "ACTIVE");
    },
  },
};
</script>

<style lang="scss">
.container-accounts {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  .title-accounts {
    text-transform: uppercase;
    color: gray;
    font-size: 16px;
    font-weight: 500;
  }
  .accounts {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
