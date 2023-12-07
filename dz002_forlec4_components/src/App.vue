<script setup>
import Good from './components/Good.vue'
import { reactive, ref, onMounted, computed } from "vue"
import getProducts from './services/products'

const products = ref([])
const isLoading = ref(true)

onMounted(()=> {  
    // debugger
    isLoading.value = true

    getProducts().then((result)=>{
      products.value = result
      isLoading.value = false
    })
})



</script>

<template>

  <div class="products-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
  <h1 class="display-4">Товары</h1>
  <p class="lead">Здесь вы можете видеть все товары.</p>  
  </div>

  <div v-if="isLoading" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else class="container">
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">      
      <Good v-for="item in products" :key="item.id" v-bind:item="item"></Good>
    </div>
  </div>
  
</template>

<style scoped>

</style>
