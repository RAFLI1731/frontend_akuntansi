<template>
  <form-kategori-produk :editMode="false" title="Tambah"/>
</template>
<script>
import formKategoriProduk from './form'
export default {
  components: {
    formKategoriProduk: formKategoriProduk
  }
}
</script>
