<template>
  <div class="item-container">
    <div class="self-center"><img width="60" height="60" :src="product.image" alt=""></div>
    <div class="self-center">{{ product.name }}</div>
    <div class="item-footer">
      <div class="item-price">{{ parseFloat(product.price).toFixed(2) }} TRY</div>
      <button
        v-if="!orderItems.find((item) => item.id === this.product.id)"
        @click="addToBasket">
        <IconAddCart class="icon-sm"/>
        Add To Basket
      </button>
      <button
        v-else
        :disabled="true"
      >
        <IconOnCart class="icon-sm"/>
        On Basket
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import IconAddCart from '@/icons/add-to-cart.svg';
import IconOnCart from '@/icons/on-cart.svg';

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
  components: {
    IconAddCart,
    IconOnCart,
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
