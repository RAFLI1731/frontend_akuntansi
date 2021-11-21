<template>
  <form-jenis-produk :editMode="false" title="Tambah"/>
</template>
<script>
import formJenisProduk from './form'
export default {
  components: {
    formJenisProduk: formJenisProduk
  }
}
</script>
