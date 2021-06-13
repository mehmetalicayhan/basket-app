<template>
  <div class="item-container">
    <div class="self-center">
      <div class="image__skeleton bg-animation"></div>
    </div>
    <div class="self-center name__skeleton bg-animation"></div>
    <div class="item-footer">
      <div class="item-price price__skeleton bg-animation"></div>
      <div class="button__skeleton bg-animation"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'LoadingSkeleton',
};
</script>

<style lang="scss" scoped>
@import "../styles/list-item";
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

</style>
