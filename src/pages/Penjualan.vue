<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Penjualan" icon="storefront" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">Penjualan belum dibayar</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    semua penjualan yang belum dibayarkan.
                  </div>
                  <div class="row items-center">
                    <q-icon name="payment" />
                    <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='`${totalHutang}`' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
                  </div>
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">Data penjualan</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    berisi semua data penjualan salsafical.
                  </div>
                  <div class="row items-center">
                    <q-icon name="credit_score" />
                    <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='`${totalLunas}`' :duration='3' :autoinit='true' @finished='alert(`Counting finished!`)'/></div>
                  </div>
              </q-card-section>
            </q-card-section>
          </q-card>

        </div>

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    title="Master Data Produk"
                    aria-label="Text"
                    class="text-h5"
                    :rows="rows"
                    flat
                    :columns="columns"
                    row-key="name"
                    :filter="filterData"
                  >

                  <template v-slot:top>
                    <div class="col">
                      <div class="col-2 q-table__title">Master Data Penjualan</div>
                      <p class="text-caption">Data penjualan yang di lakukan di dalam sistem salsafical.</p>
                    </div>

                    <q-space />

                    <q-btn flat round color="primary" icon="search" @click="visibles = !visibles" size="md" class="q-mr-sm" />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input outlined debounce="300" placeholder="Placeholder" style="width:300px" color="primary" v-model="filterData" dense />
                      </div>
                    </q-slide-transition>
                    <q-btn
                      dense
                      icon="add"
                      class="q-ml-md q-pr-md"
                      color="blue-13"
                      :to="{ name: 'penjualan_add' }"
                      label="Tambah Penjualan"
                      size="md"
                      outline
                    />
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="id_penjualan" :props="props">{{props.row.id_penjualan}}</q-td>
                      <q-td key="produk" :props="props">
                        <q-btn @click="showDetail(props.row.pelanggan, props.row.products)" round outline color="red" size="sm" icon="delete" no-caps class="q-ml-sm" />
                      </q-td>
                      <q-td key="grandTotal" :props="props">{{this.$formatPrice(props.row.grandTotal)}}</q-td>
                      <q-td key="pelanggan" :props="props">{{props.row.pelanggan}}</q-td>
                      <q-td key="nomor_telepon" :props="props">{{props.row.nomor_telepon}}</q-td>
                      <q-td key="status_penjualan" :props="props">{{props.row.status_penjualan}}</q-td>
                      <q-td key="tanggal_jatuh_tempo" :props="props">{{this.$parseDate(props.row.tanggal_jatuh_tempo).fullDate}}</q-td>
                      <q-td key="alamat_penagihan" :props="props">
                        <label v-if="props.row.status_penjualan === 'Hutang'">{{props.row.alamat_penagihan}}</label>
                        <label v-else>{{'-'}}</label>
                      </q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn round outline color="red" @click="this.delete(props.row._id)" size="sm" icon="delete" no-caps class="q-ml-sm" />
                      </q-td>
                    </q-tr>
                  </template>

                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <q-dialog v-model="detail.visible">
          <q-card>
            <q-card-section>
              <div class="text-h6">Data Pembelian {{detail.pelanggan}}</div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll">
              <q-table
                :rows="detail.rows"
                flat
                :columns="detail.columns"
                row-key="name"
              />
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat label="Ok" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </div>
    </div>
  </q-page>

</template>

<script>
import Vue3autocounter from 'vue3-autocounter'

export default {
  name: 'PageIndex',
  components: {
    'vue3-autocounter': Vue3autocounter
  },
  data () {
    return {
      visibles: false,
      filterData: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        { name: 'id_penjualan', required: true, label: 'ID_Penjualan', align: 'left', field: 'id_penjualan', sortable: true },
        { name: 'produk', required: true, label: 'Produk', align: 'left', field: 'produk', sortable: true },
        { name: 'grandTotal', required: true, label: 'Grand Total', align: 'left', field: 'grandTotal', sortable: true },
        { name: 'pelanggan', required: true, label: 'Nama pelanggan', align: 'left', field: 'pelanggan', sortable: true },
        { name: 'nomor_telepon', required: true, label: 'Nomor telepon', align: 'left', field: 'nomor_telepon', sortable: true },
        { name: 'status_penjualan', required: true, label: 'Status penjualan', align: 'left', field: 'status_penjualan', sortable: true },
        { name: 'tanggal_jatuh_tempo', required: true, label: 'Tanggal jatuh tempo', align: 'left', field: 'tanggal_jatuh_tempo', sortable: true },
        { name: 'alamat_penagihan', required: true, label: 'Alamat penagihan', align: 'left', field: 'alamat_penagihan', sortable: true },
        { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
      ],
      rows: [],
      detail: {
        visible: false,
        pelanggan: null,
        columns: [
          { name: 'nama_product', required: true, label: 'Nama Produk', align: 'left', field: 'nama_product', sortable: true },
          { name: 'harga_jual', required: true, label: 'Harga Jual', align: 'left', field: 'harga_jual', sortable: true },
          { name: 'jumlah_penjualan', required: true, label: 'Jumlah Penjualan', align: 'left', field: 'jumlah_penjualan', sortable: true },
          { name: 'total', required: true, label: 'Subtotal', align: 'left', field: 'total', sortable: true }
        ],
        rows: []
      }
    }
  },
  created () {
    this.getPenjualan()
  },
  methods: {
    getPenjualan () {
      try {
        this.$api.get('penjualan/get')
          .then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              const data = res.data.result
              this.rows = data
              for (let i = 0; i < data.length; i++) {
                if (data[i].status_penjualan === 'Lunas') {
                  this.totalLunas += data[i].grandTotal
                }
                if (data[i].status_penjualan === 'Hutang') {
                  this.totalHutang += data[i].grandTotal
                }
              }
            }
          })
      } catch (e) {
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    delete (id) {
      this.$dialog.create({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.delete('/penjualan/delete/' + id).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.getPenjualan()
              this.$showNotif(res.data.message, 'positive')
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    showDetail (pelanggan, data) {
      this.detail.pelanggan = pelanggan
      this.detail.visible = true
      this.detail.rows = data
    }
  }
}
</script>
<style scoped>
</style>
