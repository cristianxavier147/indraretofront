<template>
  <div class="movement">
    <div class="movement-row">
      <span class="movement-date">{{ movement.dateoperation }}</span>
    </div>
    <div
      class="movement-row movement-for"
      v-for="(m, i) in movement.data"
      :key="i"
    >
      <span class="movement-description">{{ m.description }}</span>
      <span class="movement-amount">{{ amount(m) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movement"],
  methods: {
    amount(m) {
      return `S/ ${m.amount}`;
    },
  },
};
</script>

<style lang="scss">
.movement {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 0px 0px 0px;
  &-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &.movement-for {
      align-items: center;
      padding: 4px 0px 12px;
      border-bottom: 1px solid #9f9f9f;
    }
  }
  &-date {
    font-weight: 500;
    font-style: italic;
  }
  &-description {
    font-size: 15px;
    color: rgb(64, 187, 224);
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 120px;
    overflow: hidden;
  }
  &-amount {
    font-size: 15px;
    font-weight: 500;
  }
  &:last-child {
    .movement-row {
      &.movement-for {
        border: none;
      }
    }
  }
}
</style>
