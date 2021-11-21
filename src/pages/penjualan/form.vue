<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Penjualan" icon="storefront" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Penjualan" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Penjualan" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-sm q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Penjualan</div>
                  <p class="text-caption">Form {{this.title}} data penjualan salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.id_penjualan"
                        label="Penjualan ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                  </div>
                  <div v-for="(product, i) in form.products" :key="i">
                    <div class="row q-gutter-sm">
                      <div class="col">
                        <q-select
                          filled
                          v-model="product.product"
                          label="Nama Product"
                          option-value="_id"
                          option-label="nama_product"
                          :options="options.products"
                          use-input
                          @filter="filterProduct"
                          outlined
                          dense
                        >
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                Produk tidak ditemukan
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          v-model="product.jumlah_penjualan"
                          label="Jumlah penjualan"
                          lazy-rules
                          dense
                          :rules="[ val => val && val > 0 || 'Jumlah penjualan tidak boleh 0 / kosong !']"
                        />
                      </div>
                    </div>

                    <q-separator class="q-mt-xs q-mb-xs"/>

                    <div class="row q-gutter-sm">
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Kategori Produk</div>
                          {{ product.product ? product.product.kategori : '--' }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Jenis Produk</div>
                          {{ product.product ? product.product.jenis : '--' }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Harga Jual</div>
                          {{ this.$formatPrice(product.product ? product.product.harga_jual : 0) }}
                      </div>
                      <div class="col">
                        <div class="text-caption text-h6 text-grey-6">Total</div>
                          {{ this.$formatPrice(product.product ? product.product.harga_jual * product.jumlah_penjualan : 0) }}
                      </div>
                    </div>

                    <div class="row q-gutter-sm q-mb-md q-mt-xs">
                      <div class="col">
                        <q-btn size="sm" outline class="q-mr-md" icon="add" type="submit" color="green" @click="add(i)" v-show="i == form.products.length-1" />
                        <q-btn size="sm" outline icon="delete_outline" type="submit" color="red" @click="remove(i)" v-show="i || ( !i && form.products.length > 1)" />
                      </div>
                      <div class="col">
                      </div>
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="form.status_penjualan" dense lazy-rules filled :options="options.status" label="Status penjualan" />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.pelanggan"
                        label="Pelanggan"
                        lazy-rules
                        dense
                        :rules="[ val => val && val !== null || 'Lengkapi data pelanggan']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.nomor_telepon"
                        label="Nomor Telepon"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nomor telepon']"
                      />
                    </div>
                    <div class="col">
                    </div>
                  </div>

                  <div class="row q-gutter-sm" v-if="this.form.status_penjualan === 'Hutang'">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.alamat_penagihan"
                        label="Alamat penagihan"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data alamat penagihan']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        v-model="form.tanggal_jatuh_tempo"
                        filled
                        label="Tanggal jatuh tempo"
                        dense
                        :rules="['YYYY-MM-DD']"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="form.tanggal_jatuh_tempo" :breakpoint="600">
                              <q-date v-model="form.tanggal_jatuh_tempo" mask="YYYY-MM-DD" filled ref="date">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Ok" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>

                  <div>
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Reset" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
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
                  <p class="text-caption">Cara pengisian form penjualan.</p>
                </div>

                <div class="row q-gutter-sm items-center">
                  <div class="col">
                    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 250px" />
                  </div>
                  <div class="col">
                    <q-timeline color="secondary">

                      <q-timeline-entry subtitle="Tahap I" side="left">
                        <div>
                          Silahkan pilih produk yang akan di jual.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 2" side="right">
                        <div>
                          Sistem akan mengeluarkan data produk terdaftar berdasarkan pilihan.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 3" side="right">
                        <div>
                          Masukan jumlah produk yang akan di jual.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 4" side="right">
                        <div>
                          Sistem akan memberikan total penjualan yang telah dilakukan, selanjutnya tekan tombol submit.
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

let listProduk = []

export default {
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
        id_penjualan: this.$generateId(),
        products: [
          {
            product: null,
            jumlah_penjualan: null
          }
        ],
        tanggal_jatuh_tempo: null,
        alamat_penagihan: null,
        nomor_telepon: null,
        pelanggan: null,
        keterangan_product: null,
        status_penjualan: null
      },
      options: {
        products: [],
        status: [
          'Lunas', 'Hutang'
        ]
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2
    }
  },
  created () {
    this.getProduct()
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
    getProduct () {
      this.$api.get('product/get')
        .then(res => {
          listProduk = res.data.result
          // listProduk = list.map(product => {
          //   return product.nama_product
          // })
        })
    },
    filterProduct (val, update) {
      if (val === '') {
        update(() => {
          this.options.products = listProduk
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options.products = listProduk.filter(v => v.nama_product.toLowerCase().indexOf(needle) > -1)
      })
    },
    onSubmit () {
      const products = []
      let grandTotal = 0

      for (const i in this.form.products) {
        products.push({
          object_id: this.form.products[i].product._id,
          nama_product: this.form.products[i].product.nama_product,
          harga_jual: this.form.products[i].product.harga_jual,
          jumlah_penjualan: this.form.products[i].jumlah_penjualan,
          total: this.form.products[i].product.harga_jual * this.form.products[i].jumlah_penjualan,
          stokBaru: this.form.products[i].product.stok - this.form.products[i].jumlah_penjualan
        })
      }
      products.forEach(product => {
        grandTotal += product.total
      })

      const sendData = {
        id_penjualan: this.form.id_penjualan,
        products: products,
        grandTotal: grandTotal,
        tanggal_jatuh_tempo: this.form.tanggal_jatuh_tempo,
        alamat_penagihan: this.form.alamat_penagihan,
        nomor_telepon: this.form.nomor_telepon,
        pelanggan: this.form.pelanggan,
        status_penjualan: this.form.status_penjualan
      }

      try {
        this.$api.post('penjualan/add', sendData)
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.$router.go(-1)
              this.$showNotif('Data penjualan berhasil di input !', 'positive')
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    onReset () {
      for (const i in this.form.products) {
        this.form.products[i].product = null
        this.form.products[i].jumlah_penjualan = null
        if (i > 0) {
          this.form.products.splice(i, 1)
        }
      }
      this.form.tanggal_jatuh_tempo = null
      this.form.alamat_penagihan = null
      this.form.nomor_telepon = null
      this.form.pelanggan = null
      this.form.status_penjualan = null
    },
    add (index) {
      this.form.products.push({
        product: null,
        jumlah_penjualan: null
      })
    },
    remove (index) {
      this.form.products.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
