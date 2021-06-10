<template>
  <div class="list-container">
    <div class="list-items" v-for="(product,index) in products" :key="index">
      <list-item :product="product"/>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  name: 'List',
  data() {
    return {
      products: [],
    };
  },
  components: {
    ListItem,
  },

  created() {
    fetch('https://nonchalant-fang.glitch.me/listing').then((res) => res.json()).then((res) => {
      this.products = res;
    });
  },
};
</script>

<style lang="scss" scoped>
.list-container{
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(204, 204, 204,0.3);
  border-left: 1px solid rgba(204, 204, 204,0.3);
  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

}
</style>
