<template>
  <div class="order-container">
    <p class="order-length">MY CART ({{ getOrderCount }})</p>

    <div v-for="(item,index) in getOrderItems" :key="index">
      <order-item :order-item="item"/>
    </div>
    <div class="button-container">
      <button @click="goBack" class="order-button">
        <IconLeftArrow class="icon-sm"/>
        <div class="mobile-none">Continue to Shopping</div>
      </button>
      <div>Total Price : {{ getTotalPrice }} TRY</div>

      <button :disabled="getOrderCount===0"
              class="order-button colored"
              @click.prevent="placeOrder"
      >
        <IconCheckout class="icon-sm"/>
        <div class="mobile-none">Place Order</div>
      </button>
    </div>
    <modal v-if="showModal" @close="showModal = false">
        <div class="modal-item-container" slot="header">
          <IconError v-if="isError" class="icon-bg"/>
          <IconSuccess v-if="isSuccess" class="icon-bg"/>
          <div> {{ modalData.status.toUpperCase() }} </div>
        </div>
        <div slot="body">
          <div> {{ modalData.message }}</div>
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
import IconLeftArrow from '@/icons/left-arrow.svg';
import IconCheckout from '@/icons/on-cart.svg';
import axios from '@/api/axios';

export default {
  name: 'OrderList',
  components: {
    OrderItem,
    Modal,
    IconSuccess,
    IconError,
    IconLeftArrow,
    IconCheckout,
  },
  data() {
    return {
      isError: false,
      isSuccess: false,
      modalData: {},
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
    async placeOrder() {
      const orderArray = this.orderItems.map((item) => ({
        id: item.id,
        amount: item.quantity,
      }));
      try {
        const response = await axios.placeOrder(orderArray);
        if (response && response.status === 200) {
          this.isSuccess = true;
          this.showModal = true;
          this.removeAllItems();
          this.modalData = response.data;
        }
      } catch (err) {
        if (err.response.status === 404) {
          this.isError = true;
          this.modalData = err?.response?.data;
          this.showModal = true;
        }
      }
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
    width: $maxWidth;
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
    background-color: #fff;
    //min-width: 840px;
    .order-button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba($borderColor, 0.8);
      border-radius: 3px;
      padding: 10px;

      &:hover{
        opacity: 0.5;
      }
      &:disabled {
        opacity: 0.5;
      }
    }

    .colored {
      background-color: #ea6e35;
      color: white;
      border-color: #ea6e35;
    }

    @media (max-width: $tablet) {
      position: fixed;
      bottom: 0;
      width: 100%;
      justify-content: space-around;
      padding: 10px;
      right: 0;
      left: 0;
      font-size: 12px;
      .icon-sm {
        margin: 0;
      }
      .mobile-none {
        display: none;
      }

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
