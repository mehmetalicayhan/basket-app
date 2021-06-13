<template>
  <div class="item-container">
    <template v-if="isLoading">
      <div class="self-center"><img width="60" height="60" :src="product.image" alt=""></div>
      <div class="self-center">{{ product.name }}</div>
      <div class="item-footer">
        <div class="item-price">{{ product.price }}TRY</div>
        <button @click="addToBasket">Add to Basket</button>
      </div>
    </template>
    <template class="skeleton-container" v-else>
      <div class="self-center">
        <div class="image__skeleton bg-animation"></div>
      </div>
      <div class="self-center name__skeleton bg-animation"></div>
      <div class="item-footer">
        <div class="item-price price__skeleton bg-animation"></div>
        <div class="button__skeleton  bg-animation"></div>
      </div>
    </template>
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
.item-container {
  display: flex;
  flex-direction: column;
  padding: 10px 10px;
  justify-content: center;
  border-right: 1px solid rgba($borderColor, 0.3);
  border-bottom: 1px solid rgba($borderColor, 0.3);

  div {
    margin-top: 15px;
  }

  .self-center {
    align-self: center;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;

    .item-price {
      font-weight: bold;
    }

    button {
      text-align: center;
      background-color: #ea6e35;
      padding: 10px;
      border-radius: 3px;
      color: #fff;

      &:hover {
        opacity: 0.8;
      }
    }

  }

  .bg-animation {
    position: relative;
    background-color: rgba($borderColor, 0.8);
    @keyframes loading {
      100% {
        transform: translateX(100%);
      }
    }

    &:after {
      display: block;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      background: -webkit-gradient(linear, left top,
        right top, from(transparent),
        color-stop(rgba(255, 255, 255, 0.2)),
        to(transparent));

      background: linear-gradient(90deg, transparent,
        rgba(255, 255, 255, 0.2), transparent);

      animation: loading 0.8s infinite;
    }
  }

  .image__skeleton {
    width: 60px;
    height: 60px;
  }

  .name__skeleton {
    width: 100px;
    height: 17px;
  }

  .price__skeleton {
    width: 45px;
    height: 22px;
  }

  .button__skeleton {
    width: 110px;
    height: 40px;
  }
}

</style>
