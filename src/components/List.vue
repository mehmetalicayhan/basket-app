<template>
  <div class="list-container">
    <template v-if="!isLoading">
      <div class="list-items" v-for="index in 6" :key="index">
        <loading-skeleton/>
      </div>
    </template>
    <div class="list-items" v-for="(product,index) in products" :key="index">
      <list-item :product="product"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import LoadingSkeleton from '@/components/LoadingSkeleton.vue';
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

  created() {
    axios.get('https://nonchalant-fang.glitch.me/listing')
      .then((res) => {
        this.products = res.data;
        this.isLoading = true;
      });
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  display: grid;
  grid-template-columns: 1fr;
  //border-top: 1px solid rgba(204, 204, 204, 0.3);
  //border-left: 1px solid rgba(204, 204, 204, 0.3);
  margin-top: 50px;
  //border: 1px solid rgba($borderColor,0.3);
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;

  }
  .list-items{
    margin: 20px;
    border: 1px solid rgba($borderColor,0.3);
    box-shadow: 0 4px 8px 0 rgba($borderColor, 0.2), 0 6px 20px 0 rgba($borderColor, 0.19);

  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;

  }

}
</style>
