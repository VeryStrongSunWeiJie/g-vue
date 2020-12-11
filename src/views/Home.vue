<template>
  <div class="home">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
}
</style>
