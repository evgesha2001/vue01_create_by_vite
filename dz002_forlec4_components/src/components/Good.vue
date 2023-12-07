<template>
      <div class="col">
      <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 font-weight-normal">{{ item.title }}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">$ {{ item.price }}</h1>
        <ul class="list-unstyled mt-3 mb-4">
          <li>{{ item.category }}</li>
          <li>{{ item.description }}</li>
        </ul>
        <button type="button" class="btn btn-lg btn-block btn-outline-primary">Купить</button>
      </div>
    </div>
    </div>
</template>

<script setup>
// import { defineProps } from 'vue';

// const props = defineProps('item')

defineProps({
    item: Object,
})

</script>
