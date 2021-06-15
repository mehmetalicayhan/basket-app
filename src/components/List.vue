<template>
  <div class="list-container">
    <template v-if="!isLoading">
      <div class="list-items" v-for="index in 6" :key="index">
        <loading-skeleton/>
      </div>
    </template>
    <div class="list-items" v-for="(product,index) in products" :key="index+product.name">
      <list-item class="list-item" :product="product"/>
    </div>
    <div class="bottom-bar">
      <button @click="goToBasket" class="go-to-basket-button">
        <div class="mobile-none">Go To Basket</div>
        <IconRightArrow class="icon-sm"/>
      </button>
    </div>
  </div>

</template>

<script>
import LoadingSkeleton from '@/components/LoadingSkeleton.vue';
import basketService from '@/api/basket-service';
import IconRightArrow from '@/icons/right-arrow.svg';
import ListItem from './ListItem.vue';

export default {
  name: 'List',
  data() {
    return {
      products: [],
      isLoading: false,
    };
  },
  components: {
    LoadingSkeleton,
    ListItem,
    IconRightArrow,
  },

  methods: {
    goToBasket() {
      this.$router.push({ name: 'Order' });
    },
  },
  async created() {
    const response = await basketService.getProducts();
    if (response) {
      this.products = response.data;
      this.isLoading = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 50px;
  margin-bottom: 50px;
  @media (min-width: $tablet) {
    grid-template-columns: 1fr 1fr;
  }

  .list-items {
    margin: 20px;
    border: 1px solid rgba($borderColor, 0.3);
    box-shadow: 0 4px 8px 0 rgba($borderColor, 0.2), 0 6px 20px 0 rgba($borderColor, 0.19);
  }

  @media (min-width: $desktop) {
    grid-template-columns: 1fr 1fr 1fr;

  }

}

.bottom-bar {
  padding: 20px 20px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid rgba($borderColor, 0.3);
  box-shadow: 0 -5px 5px -5px $borderColor;
  background-color: #fff;
  grid-column-start: 1;
  grid-column-end: 4;

  .go-to-basket-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba($borderColor, 0.8);
    border-radius: 3px;
    padding: 10px;

    &:hover {
      opacity: 0.5;
    }

    &:disabled {
      opacity: 0.5;
    }

    .icon-sm{
      margin-right: 0;
      margin-left: 5px;
    }

  }

  @media (max-width: $tablet) {
    position: fixed;
    bottom: 0;
    justify-content: center;
    padding: 10px;
    right: 0;
    left: 0;
    font-size: 12px;
    margin: 0;
    .icon-sm {
      margin: 0;
    }

  }

}
</style>
