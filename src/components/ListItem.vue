<template>
  <div class="item-container">
    <div class="self-center"><img width="60" height="60" :src="product.image" alt=""></div>
    <div class="self-center">{{product.name}}</div>
    <div class="item-footer">
      <div class="item-price">{{product.price}}TRY</div>
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
  .item-container{
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    justify-content: center;
    border-right: 1px solid rgba($borderColor,0.3);
    border-bottom: 1px solid rgba($borderColor,0.3);
    div{
      margin-top: 15px;
    }
    .self-center{
      align-self: center;
    }
    .item-footer{
      display: flex;
      justify-content: space-between;
      .item-price{
        font-weight: bold;
      }
      button{
        text-align: center;
        background-color: #ea6e35;
        padding: 10px;
        border-radius: 3px;
        color: #fff;
        &:hover{
          opacity: 0.8;
        }
      }

    }
  }

</style>
