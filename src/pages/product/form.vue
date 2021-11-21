<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Produk" icon="emoji_events" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Produk" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Produk" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Produk</div>
                  <p class="text-caption">Form {{this.title}} data produk salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.id_product"
                        label="Product ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.name_produk"
                        label="Nama produk"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nama produk']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select
                        filled
                        v-model="form.kategori_product"
                        use-input
                        input-debounce="0"
                        label="Kategori produk"
                        :options="options.options_kategori"
                        @filter="filterKategori"
                        outlined
                        dense
                        lazy-rules
                        behavior="menu"
                        :rules="[ val => val && val.length > 0 || 'Pilih Kategori produk']"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div class="col">
                      <q-select
                        filled
                        v-model="form.jenis_product"
                        use-input
                        input-debounce="0"
                        label="Jenis produk"
                        :options="options.options_jenis"
                        @filter="filterJenis"
                        outlined
                        dense
                        lazy-rules
                        behavior="menu"
                        :rules="[ val => val && val.length > 0 || 'Pilih jenis produk']"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.hpp_product"
                        label="HPP"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data hpp']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.hargajual"
                        label="Harga jual"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data harga jual']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.stok_produk"
                        label="Stok produk"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data stok produk']"
                      />
                    </div>
                    <div class="col">
                      <q-file filled bottom-slots dense v-model="form.image" label="Foto produk" >
                        <template v-slot:before>
                          <q-icon name="collections" />
                        </template>
                      </q-file>
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                    </div>
                    <div class="col">
                      <q-img v-if="this.editMode && this.oldImg !== null && this.form.image === null" :src="`${$imgUrl}/${oldImg}`"/>
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        v-model="form.keterangan_product"
                        filled
                        dense
                        label="Keterangan"
                        type="textarea"
                      />
                    </div>
                  </div>

                  <div class="q-mt-md">
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Cancel" v-if="this.editMode" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                    <q-btn label="Reset" v-else type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">Petunjuk penggunaan</div>
                  <p class="text-caption">Cara pengisian form produk.</p>
                </div>

                <div class="row q-gutter-sm items-center">
                  <div class="col">
                    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 250px" />
                  </div>
                  <div class="col">
                    <q-timeline color="secondary">

                      <q-timeline-entry subtitle="Tahap I" side="left">
                        <div>
                          Lakukan terlebih dahulu inputan untuk data kategori produk di dalam menu tambah kategori.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 2" side="right">
                        <div>
                          Lakukan terlebih dahulu inputan untuk data jenis produk di dalam menu tambah jenis produk.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 3" side="right">
                        <div>
                          Inputkan data produk sesuai dengan produk yang akan di daftarkan.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 4" side="right">
                        <div>
                          Pastikan data inputan sesuai dengan data yang ingin di daftarkan.
                        </div>
                      </q-timeline-entry>

                    </q-timeline>
                  </div>
                </div>

              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import Lottie from 'components/lottie'
import * as animationData from 'assets/lottie.json'

let listKategori = []
let listJenis = []

export default {
  name: 'PageIndex',
  components: {
    lottie: Lottie
  },
  props: {
    editMode: Boolean,
    title: String
  },
  data () {
    return {
      form: {
        id_product: this.$generateId(),
        name_produk: null,
        kategori_product: null,
        jenis_product: null,
        hpp_product: null,
        hargajual: null,
        stok_produk: null,
        image: null,
        keterangan_product: null
      },
      oldImg: null,
      options: {
        options_kategori: [],
        options_jenis: []
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    this.getKategori()
    this.getJenis()
    if (this.editMode) {
      try {
        this.$api.get('product/getbyid/' + this.$route.params.id)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              const data = res.data.result
              this.form.id_product = data.product_id
              this.form.name_produk = data.nama_product
              this.form.kategori_product = data.kategori
              this.form.jenis_product = data.jenis
              this.form.hpp_product = data.hpp.toString()
              this.form.hargajual = data.harga_jual.toString()
              this.form.stok_produk = data.stok.toString()
              this.form.keterangan_product = data.keterangan
              this.oldImg = data.foto_product
            }
          })
      } catch (e) {
        console.log(e.message)
        this.$showNotif('Terjadi ke !', 'negative')
      }
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    stop: function () {
      this.anim.stop()
    },
    play: function () {
      this.anim.play()
    },
    pause: function () {
      this.anim.pause()
    },
    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    },
    getKategori () {
      this.$api.get('type/gettype/Kategori')
        .then(res => {
          const list = res.data.result
          listKategori = list.map(kategori => {
            return kategori.name
          })
        })
    },
    filterKategori (val, update) {
      if (val === '') {
        update(() => {
          this.options.options_kategori = listKategori
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.options_kategori = listKategori.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    getJenis () {
      this.$api.get('type/gettype/Jenis')
        .then(res => {
          const list = res.data.result
          listJenis = list.map(jenis => {
            return jenis.name
          })
        })
    },
    filterJenis (val, update) {
      if (val === '') {
        update(() => {
          this.options.options_jenis = listJenis
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.options_jenis = listJenis.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      try {
        if (this.editMode) {
          const formData = new FormData()
          formData.append('foto', this.form.image)
          formData.append('data', JSON.stringify({
            product_id: this.form.id_product,
            nama_product: this.form.name_produk,
            kategori: this.form.kategori_product,
            jenis: this.form.jenis_product,
            hpp: this.form.hpp_product,
            harga_jual: this.form.hargajual,
            stok: this.form.stok_produk,
            keuntungan_per_product: Number(this.form.hargajual) - Number(this.form.hpp_product),
            keterangan: this.form.keterangan_product
          }))
          this.$api.put('product/update/' + this.$route.params.id, formData).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.$showNotif('Data produk berhasil diperbarui !', 'positive')
              this.$router.push({ name: 'product' })
            }
          })
        } else {
          const formData = new FormData()
          formData.append('foto', this.form.image)
          formData.append('data', JSON.stringify({
            product_id: this.form.id_product,
            nama_product: this.form.name_produk,
            kategori: this.form.kategori_product,
            jenis: this.form.jenis_product,
            hpp: this.form.hpp_product,
            harga_jual: this.form.hargajual,
            stok: Number(this.form.stok_produk),
            keuntungan_per_product: Number(this.form.hargajual) - Number(this.form.hpp_product),
            keterangan: this.form.keterangan_product
          }))
          this.$api.post('product/add', formData).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.$showNotif('Produk berhasil diinput !', 'positive')
              this.$router.push({ name: 'product' })
            }
          })
        }
      } catch (e) {
        console.error(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    onReset () {
      if (this.editMode) {
        this.$router.go(-1)
      } else {
        this.form.id_product = null
        this.form.name_produk = null
        this.form.kategori_product = null
        this.form.jenis_product = null
        this.form.hpp_product = null
        this.form.hargajual = null
        this.form.stok_produk = null
        this.form.keterangan_product = null
        this.form.image = null
      }
    }
  }
}
</script>

<style scoped>

</style>
