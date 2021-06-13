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
    <modal v-if="showModal" @close="showModal = false">
      <div v-if="isError" class="modal-item-container" slot="header">
        <IconError class="icon"/>
        <div> Error </div>
      </div>
      <div v-if="isError"  slot="body">
        <div> {{ error.message }} </div>
      </div>
      <div v-if="isSuccess" class="modal-item-container" slot="header">
        <IconSuccess class="icon"/>
        <div> Successful</div>
      </div>
      <div v-if="isSuccess" slot="body">
        Your order have been received
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import OrderItem from '@/components/OrderItem.vue';
import Modal from '@/components/Modal.vue';
import IconSuccess from '@/icons/succes.svg';
import IconError from '@/icons/error.svg';
import axios from 'axios';

export default {
  name: 'OrderList',
  components: {
    OrderItem,
    Modal,
    IconSuccess,
    IconError,
  },
  data() {
    return {
      isError: false,
      isSuccess: false,
      error: {},
      showModal: false,
      modalType: '',
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
    ...mapActions([
      'removeAllItems',
    ]),
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
          this.showModal = true;
          this.removeAllItems();
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data;
            this.showModal = true;
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
    //min-width: 840px;
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

  .modal-item-container {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 10px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
