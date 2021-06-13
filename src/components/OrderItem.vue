<template>
  <div class="order-container">
    <div class="order-container-inner">
      <div class="order-item-left-side">
        <img :src="orderItem.image" width="92" height="92" alt="orderItem">
        <div class="order-item-quantity">
          <button
            :disabled="orderItem.quantity === 1"
            @click="decrementItemQuantity" class="decrement">-
          </button>
          <input type="number" v-model="orderItem.quantity"/>
          <button @click="incrementItemQuantity" class="increment">+</button>
        </div>
      </div>
      <div class="order-item-right-side">
        <p class="order-item-name">{{ orderItem.name }}</p>
        <p class="order-item-price">{{
            parseFloat(orderItem.price*orderItem.quantity)
              .toFixed(2)
          }} TRY</p>
        <button @click="removeFromBasket"
                class="self-end remove-item-button">
          <IconRemoveFromCart class="icon-md"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import IconRemoveFromCart from '@/icons/remove-from-cart.svg';

export default {
  name: 'OrderItem',
  props: {
    orderItem: {
      type: Object,
      required: true,
    },
  },
  components: {
    IconRemoveFromCart,
  },
  methods: {
    ...mapActions([
      'removeItem',
      'updateItem',
    ]),
    removeFromBasket() {
      this.removeItem(this.orderItem.id);
    },

    incrementItemQuantity() {
      const updatedItem = {
        currency: this.orderItem.currency,
        id: this.orderItem.id,
        image: this.orderItem.image,
        price: this.orderItem.price,
        name: this.orderItem.name,
        quantity: this.orderItem.quantity + 1,
      };
      this.updateItem(updatedItem);
    },
    decrementItemQuantity() {
      const updatedItem = {
        currency: this.orderItem.currency,
        id: this.orderItem.id,
        image: this.orderItem.image,
        price: this.orderItem.price,
        name: this.orderItem.name,
        quantity: this.orderItem.quantity - 1,
      };
      if (updatedItem.quantity > 0) this.updateItem(updatedItem);
    },
  },

};
</script>

<style lang="scss" scoped>
.order-container {
  padding: 20px;
  font-size: 18px;
  border: 1px solid rgba($borderColor, 0.3);

  .order-container-inner {
    display: flex;
    align-items: center;

    .order-item-left-side {
      margin-right: 20px;

      .order-item-quantity {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;

        input {
          border: 1px solid rgba($borderColor, 0.8);
          width: 30px;
          border-radius: 5px;
          padding: 5px;
          text-align: center;

          &:focus {
            outline: none;
            border-color: rgba($borderColor, 1);
          }

          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0;
          }

          &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0;
          }
        }

        .increment {
          margin-left: 5px;
        }

        .decrement {
          margin-right: 5px;
        }

        button {
          border: 1px solid rgba($borderColor, 0.8);
          border-radius: 50%;
          width: 25px;
          height: 25px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            &:enabled {
              background-color: $borderColor;
            }
          }
        }
      }

      img {
        border: 1px solid rgba($borderColor, 0.3);
        padding: 4px;
      }
    }

    .order-item-right-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        margin-bottom: 20px;
      }

      .order-item-price {
        font-weight: bold;
      }

      .remove-item-button {
        border: 1px solid $removeRed;
        border-radius: 4px;
        padding: 8px;
        color: $removeRed;
        &:hover{
          background-color: $removeRed;
          color: #fff;
        }
      }

      .self-end {
        align-self: flex-end;
      }

    }
  }
}
</style>
