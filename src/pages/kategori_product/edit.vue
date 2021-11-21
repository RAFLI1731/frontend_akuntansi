<template>
  <form-kategori-produk :editMode="true" title="Edit"/>
</template>
<script>
import formKategoriProduk from './form'
export default {
  components: {
    formKategoriProduk: formKategoriProduk
  }
}
</script>
