<template>
  <form-penjualan :editMode="true" title="Edit"/>
</template>
<script>
import formPenjualan from './form'
export default {
  components: {
    formPenjualan: formPenjualan
  }
}
</script>
