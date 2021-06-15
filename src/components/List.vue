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
  </div>
</template>

<script>
import LoadingSkeleton from '@/components/LoadingSkeleton.vue';
import axios from '@/api/axios';
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
  },

  async created() {
    const response = await axios.getProducts();
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
</style>
