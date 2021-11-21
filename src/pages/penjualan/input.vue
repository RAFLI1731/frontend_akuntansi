<template>
  <form-penjualan :editMode="false" title="Tambah"/>
</template>
<script>
import formPenjualan from './form'
export default {
  components: {
    formPenjualan: formPenjualan
  }
}
</script>
