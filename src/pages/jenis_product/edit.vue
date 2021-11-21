<template>
  <form-jenis-produk :editMode="true" title="Edit"/>
</template>
<script>
import formJenisProduk from './form'
export default {
  components: {
    formJenisProduk: formJenisProduk
  }
}
</script>
