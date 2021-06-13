<template>
  <div class="item-container">
    <div class="self-center"><img width="60" height="60" :src="product.image" alt=""></div>
    <div class="self-center">{{ product.name }}</div>
    <div class="item-footer">
      <div class="item-price">{{ product.price }}TRY</div>
      <button @click="addToBasket">Add to Basket</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ListItem',
  props: {
    product: Object,
    isLoading: Boolean,
  },
  computed: {
    ...mapState([
      'orderItems',
    ]),
  },

  methods: {
    ...mapActions([
      'addItem',
    ]),

    addToBasket() {
      this.product.quantity = 1;
      this.addItem(this.product);
      this.$router.push({ name: 'Order' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/list-item";

</style>
