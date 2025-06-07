<script setup lang="ts">

</script>

<template>
<h1>FLOAT</h1>
  <div class="left">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu tortor eu erat imperdiet lacinia. Suspendisse dignissim finibus est, ac scelerisque sapien sollicitudin a. Donec eget venenatis ipsum, sit amet luctus nulla. Fusce consectetur odio
    vitae risus rhoncus tempor. Suspendisse et vehicula massa, non luctus mauris. Mauris porta ornare nibh, sit amet condimentum sapien aliquet sit amet. Integer id tristique magna. Sed sed lectus sed neque ultrices maximus at quis mi.
    <img src="@/assets/images/photo/Виктория%20Яровенко-100.jpg" height="400" width="250"> Pellentesque ornare sollicitudin ultricies. Curabitur nisi mauris, eleifend eu egestas a, dictum in massa. Fusce non velit in eros malesuada ornare eget eget elit. Maecenas eget vulputate
    enim. Integer elementum sit amet tellus sed rhoncus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar, arcu eu elementum volutpat, purus mi pulvinar magna, sit amet imperdiet urna tellus et massa. Quisque nec volutpat
    nunc. Sed laoreet aliquet nisi non dignissim. Suspendisse leo mauris, luctus sit amet tristique quis, ultricies sed libero. Praesent condimentum lorem non imperdiet ultricies. Proin auctor viverra ex ut convallis. Quisque rutrum vitae felis sit amet
    eleifend. Cras ac viverra nisi. Mauris sed bibendum eros.
  </div>
</template>

<style scoped>
.left,
.right {
  display: block;
  width: 100%;
  font-size: 12px;
}

.left img,
.right img {
  display: inline-block;
  margin: 10px;
}

.left img {
  float: left;
  margin-left: 0;
}

.right img {
  float: right;
  margin-right: 0;
}
</style>
