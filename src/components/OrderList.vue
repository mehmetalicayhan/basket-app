<template>
  <div class="order-container">
    <p class="order-length">MY CART ({{ getOrderCount }})</p>

    <div v-for="(item,index) in getOrderItems" :key="index">
      <order-item :order-item="item"/>
    </div>
    <div class="button-container">
      <button @click="goBack" class="order-button">Continue to Shopping</button>
      <button :disabled="getOrderCount===0"
              class="order-button colored"
              @click.prevent="placeOrder"
      >Place Order
      </button>
      <div>Total Price : {{ getTotalPrice }} TRY</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import OrderItem from '@/components/OrderItem.vue';
import axios from 'axios';

export default {
  name: 'OrderList',
  components: { OrderItem },
  data() {
    return {
      isError: false,
      isSuccess: false,
      error: {},
    };
  },
  computed: {
    ...mapState(['orderItems']),
    ...mapGetters([
      'getOrderItems',
      'getOrderCount',
      'getTotalPrice',
    ]),

  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Listing' });
    },
    placeOrder() {
      const orderArray = this.orderItems.map((item) => ({
        id: item.id,
        amount: item.quantity,
      }));
      axios.post('https://nonchalant-fang.glitch.me/order', orderArray)
        .then(() => {
          this.isSuccess = true;
          this.$router.push({ name: 'Listing' });
          // clear order Items from states
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data;
          }
          this.isError = true;
        });
    },
  },

};
</script>

<style lang="scss" scoped>
.order-container {
  padding-top: 30px;

  .order-length {
    padding: 10px 20px;
    border: 1px solid rgba($borderColor, 0.3);
    font-weight: bold;
    position: fixed;
    top: 0;
    width: 840px;
    background-color: #fff;
  }

  .button-container {
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 1px solid rgba($borderColor, 0.3);
    border-top: none;
    box-shadow: 0 -5px 5px -5px $borderColor;
    //position: fixed;
    //bottom: 0;
    background-color: #fff;
    //width: 100%;;

    .order-button {
      border: 1px solid rgba($borderColor, 0.8);
      border-radius: 3px;
      padding: 10px;

      &:disabled {
        opacity: 0.5;
      }
    }

    .colored {
      background-color: #ea6e35;
      color: white;
      border-color: #ea6e35;
    }
  }
}
</style>
