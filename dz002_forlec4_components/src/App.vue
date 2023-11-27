<script setup>
import Good from './components/Good.vue'
import { reactive, ref, onMounted, computed } from "vue"
import axios from 'axios';

const products = ref([])
const isLoading = ref(true)
const elementsOnRow = 3

const productsRowCount = computed(()=>  {
    return Math.ceil(products.value.length / elementsOnRow)
})
const productsForRow=computed((numRow)=>{
  if (products.value.length>=(numRow - 1) * elementsOnRow) {
    return products.value.slice((numRow - 1) * elementsOnRow, numRow * elementsOnRow)
  } else {
    return []
  }
  // v-for="item in productsForRow(numRow)" :key="item.id"
})


// (async () => {  
//   try{
//     debugger
//     let response  = axios.get('/products.json')
//     products = response.data
//   }
//   catch (error) {
//     console.log(error);
//   }
// })()


onMounted(async () => {
      try {
        const response = await axios.get('/products.json');
        setTimeout(function(){
          const productsArray = response.data
          // Распределить массив на вложенные
          // debugger
          // products.value = productsArray.slice(1,4).reduce(function(acc,item,index) {
          //   if (index % 2 == 0)  {
          //     return [...acc,[item]]
          //   } else {
          //     return [...acc.slice(1,acc.length),[...(...acc.slice(acc.length,acc.length+1)),item]] 
          //   }
          // },[]
          // )
          let nestedArray = []
          let innerArray = []
          productsArray.forEach(function(item, index) {
            if (index % elementsOnRow == 0)  {
              if (innerArray.length > 0) {
                nestedArray = [...nestedArray, innerArray]
              }
              innerArray = []
            }
            innerArray = [...innerArray,item]
          })
          if (innerArray.length > 0) {
            nestedArray = [...nestedArray, innerArray]
          }
          
          products.value = nestedArray    
          isLoading.value = false
        } , 1000)        
      } catch (error) {
        console.log(error);
      }
    });



</script>

<template>
  <!-- <div v-if="isLoading">Загружается...</div>
   <ul v-else>
    <ol v-for="itemRow, index in products">{{ index }}
      <ul>
        <li v-for="item in itemRow" :key="item.id">{{ item.id }}</li>
      </ul>
    </ol>
   </ul>  -->

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
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center" v-for="itemRow, index in products">
      <Good v-for="item in itemRow" :key="item.id" v-bind:item="item"></Good>
    </div>
  </div>
  
</template>

<style scoped>

</style>
