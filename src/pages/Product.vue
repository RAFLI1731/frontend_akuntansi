<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Produk" icon="emoji_events" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row col-12">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col-12 q-pa-sm">
                <q-table
                  title="Master Data Produk"
                  aria-label="Text"
                  class="text-h5"
                  :rows="product.rows"
                  flat
                  :columns="product.columns"
                  row-key="name"
                  :filter="filter"
                >

                <template v-slot:top>
                  <div class="col">
                    <div class="col-2 q-table__title">Master Data Produk</div>
                    <p class="text-caption">Data produk yang terdaftar di dalam sistem salsafical.</p>
                  </div>

                  <q-space />

                  <q-btn flat round color="primary" icon="search" @click="visible = !visible" size="md" class="q-mr-sm" />
                  <q-slide-transition>
                    <div v-show="visible">
                      <q-input outlined debounce="300" placeholder="Cari.." style="width:300px" color="primary" v-model="filter" dense />
                    </div>
                  </q-slide-transition>
                  <q-btn
                    dense
                    icon="add"
                    class="q-ml-md q-pr-md q-mr-md"
                    color="blue-13"
                    :to="{ name: 'product_add' }"
                    label="Tambah Produk"
                    size="md"
                    outline
                  />
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="product_id" :props="props">
                      {{ props.row.product_id }}
                    </q-td>
                    <q-td key="namaProduk" :props="props">
                      {{ props.row.nama_product }}
                    </q-td>
                    <q-td key="kategori" :props="props">
                      {{ props.row.kategori }}
                    </q-td>
                    <q-td key="jenis" :props="props">
                      {{ props.row.jenis }}
                    </q-td>
                    <q-td key="hpp" :props="props">
                      <q-badge outline color="primary">
                        {{ this.$formatPrice(props.row.hpp) }}
                      </q-badge>
                    </q-td>
                    <q-td key="hargaJual" :props="props">
                      <q-badge outline color="negative">
                        {{ this.$formatPrice(props.row.harga_jual) }}
                      </q-badge>
                    </q-td>
                    <q-td key="keuntungan" :props="props">
                      <q-badge outline color="green">
                        {{ this.$formatPrice(props.row.keuntungan_per_product) }}
                      </q-badge>
                    </q-td>
                    <q-td key="stok" :props="props">
                      {{ props.row.stok }}
                    </q-td>
                    <q-td key="foto" :props="props">
                      <q-item clickable v-ripple>
                        <q-item-section side>
                          <q-avatar rounded size="88px">
                            <q-img :src="`${$imgUrl}/${props.row.foto_product}`" />
                            <q-badge floating color="blue-10">{{ this.$parseDate(props.row.created_at).fullDate }}</q-badge>
                          </q-avatar>
                        </q-item-section>
                      </q-item>
                    </q-td>
                    <q-td key="keterangan" :props="props">
                      {{ this.$subString(props.row.keterangan) }}
                    </q-td>
                    <q-td key="aksi" :props="props">
                      <q-btn round outline color="green" size="sm" icon="edit" :to="{ name:'product_edit', params:{ id: props.row._id } }"  no-caps />
                      <q-btn round outline color="red" size="sm" icon="delete" @click="this.deleteProduct(props.row._id)" no-caps class="q-ml-sm" />
                    </q-td>
                  </q-tr>
                </template>

                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row q-mt-md fit q-gutter-sm">

          <div class="col">
            <q-card class="my-card" flat bordered>
                <q-card-section horizontal>
                  <q-card-section class="col q-pa-sm">
                    <q-table
                      title="Master Data Jenis Produk"
                      aria-label="Text"
                      class="text-h5"
                      :rows="jenis.rows"
                      flat
                      :columns="jenis.columns"
                      row-key="name"
                    >

                    <template v-slot:top>
                      <div class="col">
                        <div class="col-2 q-table__title">Master Data Jenis Produk</div>
                        <p class="text-caption">Data jenis produk yang terdaftar di dalam sistem salsafical.</p>
                      </div>

                      <q-btn
                        dense
                        icon="add"
                        class="q-ml-md q-pr-md"
                        color="blue-13"
                        :to="{ name: 'product_jenis_add' }"
                        label="Tambah Jenis"
                        size="md"
                        outline
                      />
                    </template>

                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="type_id" :props="props">
                          {{ props.row.type_id }}
                        </q-td>
                        <q-td key="name" :props="props">
                            {{ props.row.name }}
                        </q-td>
                        <q-td key="aksi" :props="props">
                          <q-btn round outline color="green" size="sm" icon="edit" :to="{ name:'product_jenis_edit', params:{ id: props.row._id } }"  no-caps />
                          <q-btn round outline color="red" size="sm" icon="delete" @click="this.delete(props.row._id)" no-caps class="q-ml-sm" />
                        </q-td>
                      </q-tr>
                    </template>

                  </q-table>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>

          <div class="col">
            <q-card class="my-card" flat bordered>
                <q-card-section horizontal>
                  <q-card-section class="col q-pa-sm">
                    <q-table
                      title="Master Data Kategori Produk"
                      aria-label="Text"
                      class="text-h5"
                      :rows="kategori.rows"
                      flat
                      :columns="kategori.columns"
                      row-key="name"
                    >

                    <template v-slot:top>
                      <div class="col">
                        <div class="col-2 q-table__title">Master Data Kategori Produk</div>
                        <p class="text-caption">Data kategori produk yang terdaftar di dalam sistem salsafical.</p>
                      </div>

                      <q-space />

                      <q-btn
                        dense
                        icon="add"
                        class="q-ml-md q-pr-md"
                        color="blue-13"
                        size="md"
                        :to="{ name: 'product_kategori_add' }"
                        label="Tambah Kategori"
                        outline
                      />
                    </template>

                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="type_id" :props="props">
                          {{ props.row.type_id }}
                        </q-td>
                        <q-td key="name" :props="props">
                          {{ props.row.name }}
                        </q-td>
                        <q-td key="aksi" :props="props">
                          <q-btn round outline color="green" size="sm" :to="{ name: 'product_kategori_edit', params: { id: props.row._id } }" icon="edit" no-caps />
                          <q-btn round outline color="red" size="sm" icon="delete" @click="this.delete(props.row._id)" no-caps class="q-ml-sm" />
                        </q-td>
                      </q-tr>
                    </template>

                  </q-table>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>

        </div>

      </div>
    </div>
  </q-page>

</template>

<script>
import { exportFile } from 'quasar'

export default {
  name: 'PageIndex',
  data () {
    return {
      visible: false,
      filter: null,
      product: {
        columns: [
          { name: 'product_id', required: true, label: 'ID_Produk', align: 'left', field: 'produt_id', sortable: true },
          { name: 'namaProduk', required: true, label: 'Nama produk', align: 'left', field: 'namaProduk', sortable: true },
          { name: 'kategori', required: true, label: 'Kategori', align: 'left', field: 'kategori', sortable: true },
          { name: 'jenis', required: true, label: 'Jenis', align: 'left', field: 'jenis', sortable: true },
          { name: 'hpp', required: true, label: 'HPP', align: 'left', field: 'hpp', sortable: true },
          { name: 'hargaJual', required: true, label: 'Harga jual', align: 'left', field: 'hargaJual', sortable: true },
          { name: 'keuntungan', required: true, label: 'Keuntungan per product', align: 'left', field: 'keuntungan', sortable: true },
          { name: 'stok', required: true, label: 'Stok', align: 'left', field: 'stok', sortable: true },
          { name: 'foto', required: true, label: 'Foto produk', align: 'left', field: 'foto', sortable: true },
          { name: 'keterangan', required: true, label: 'Keterangan', align: 'left', field: 'keterangan', sortable: true },
          { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
        ],
        rows: []
      },
      jenis: {
        columns: [
          { name: 'type_id', required: true, label: 'ID_Jenis', align: 'left', field: 'type_id', sortable: true },
          { name: 'name', required: true, label: 'Nama jenis', align: 'left', field: 'name', sortable: true },
          { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
        ],
        rows: []
      },
      kategori: {
        columns: [
          { name: 'type_id', required: true, label: 'ID_Kategori', align: 'left', field: 'type_id', sortable: true },
          { name: 'name', required: true, label: 'Nama kategori', align: 'left', field: 'name', sortable: true },
          { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
        ],
        rows: []
      }
    }
  },
  created () {
    this.getJenis()
    this.getKategori()
    this.getProduct()
  },
  methods: {
    getProduct () {
      try {
        this.$api.get('product/get').then(res => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, 'negative')
          } else {
            this.product.rows = res.data.result
          }
        })
      } catch (e) {
        console.log(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    getJenis () {
      try {
        this.$api.get('type/gettype/' + 'Jenis').then(res => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, 'negative')
          } else {
            this.jenis.rows = res.data.result
          }
        })
      } catch (e) {
        console.log(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    getKategori () {
      try {
        this.$api.get('type/gettype/' + 'Kategori').then(res => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, 'negative')
          } else {
            this.kategori.rows = res.data.result
          }
        })
      } catch (e) {
        console.log(e)
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
          this.$api.delete('type/deletetype/' + id).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.getJenis()
              this.getKategori()
              this.$showNotif(res.data.message, 'positive')
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    deleteProduct (id) {
      this.$dialog.create({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$api.delete('product/delete/' + id).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.getProduct()
              this.$showNotif(res.data.message, 'positive')
            }
          })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => this.wrapCsvValue(col.label))].concat(
        this.rows.map(row => this.columns.map(col => this.wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    wrapCsvValue (val, formatFn) {
      let formatted = formatFn !== void 0
        ? formatFn(val)
        : val

      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

      formatted = formatted.split('"').join('""')
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    }
  }
}
</script>
<style scoped>

</style>
