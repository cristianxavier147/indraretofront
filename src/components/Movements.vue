<template>
  <div class="container-movements">
    <span class="title-movements">ÚLTIMOS MOVIMIENTOS</span>
    <div class="movements">
      <Movement v-for="a in lastMovements" :key="a.id" :movement="a" />
    </div>
    <div class="view-more-container" v-if="verifyViewMore">
      <span class="view-more" @click="changeViewMore()">Ver todos</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movements"],
  data() {
    return {
      viewMore: true,
    };
  },
  computed: {
    lastMovements() {
      let counter = 0;
      let arr = [];
      if (this.viewMore) {
        this.movements.forEach((x) => {
          if (counter < 4) {
            arr.push(x);
            counter += x.data.length;
          }
        });
      } else {
        arr = this.movements;
      }
      return arr;
    },
    verifyViewMore() {
      let counter = 0;
      this.movements.forEach((x) => {
        counter += x.data.length;
      });
      return counter > 4 && this.viewMore;
    },
  },
  methods: {
    changeViewMore() {
      this.viewMore = false;
    },
  },
};
</script>

<style lang="scss">
.container-movements {
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title-movements {
    text-transform: uppercase;
    color: rgb(88, 88, 88);
    font-size: 14px;
    font-weight: 500;
  }
  .movements {
    display: flex;
    flex-direction: column;
    padding: 6px;
    gap: 6px;
  }
  .view-more-container {
    display: flex;
    justify-content: center;
    align-items: center;
    .view-more {
      color: rgb(64, 187, 224);
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
