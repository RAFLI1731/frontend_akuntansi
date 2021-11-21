<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Produk" icon="emoji_events" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Kategori Produk" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Kategori Produk" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Kategori Produk</div>
                  <p class="text-caption">Form {{this.title}} data kategori produk salsafical.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="id_kategori_product"
                        label="Kategori ID"
                        lazy-rules
                        dense
                        readonly
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="name_kategori_produk"
                        label="Nama kategori produk"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nama kategori produk']"
                      />
                    </div>
                  </div>

                  <div>
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Cancel" v-if="this.editMode" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                    <q-btn label="Reset" v-else type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">Petunjuk penggunaan</div>
                  <p class="text-caption">Cara pengisian form kategori produk.</p>
                </div>

                <div class="row q-gutter-sm items-center">
                  <div class="col">
                    <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" style="height: 250px" />
                  </div>
                  <div class="col">
                    <q-timeline :side="side" color="secondary">

                      <q-timeline-entry subtitle="Tahap 1">
                        <div>
                          Inputkan data kategori produk sesuai dengan kategori produk yang akan di daftarkan.
                        </div>
                      </q-timeline-entry>

                      <q-timeline-entry subtitle="Tahap 2">
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
      id_kategori_product: this.$generateId(),
      name_kategori_produk: null,
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
      side: 'right'
    }
  },
  created () {
    if (this.editMode) {
      console.log(this.$route.params.id)
      try {
        this.$api.get('type/gettypebyid/' + this.$route.params.id).then(res => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, 'negative')
          } else {
            this.id_kategori_product = res.data.result.type_id
            this.name_kategori_produk = res.data.result.name
          }
        })
      } catch (e) {
        console.error(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
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
    onSubmit () {
      try {
        if (this.editMode) {
          this.$api.put('type/updatetype/' + this.$route.params.id, {
            name: this.name_kategori_produk
          }).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.$showNotif('Kategori produk berhasil diperbarui !', 'positive')
              this.$router.push({ name: 'product' })
            }
          })
        } else {
          this.$api.post('type/addtype', {
            type_id: this.id_kategori_product,
            type: 'Kategori',
            name: this.name_kategori_produk
          }).then(res => {
            if (res.data.status !== true) {
              this.$showNotif(res.data.message, 'negative')
            } else {
              this.$showNotif('Kategori produk berhasil diinput !', 'positive')
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
        this.name_kategori_produk = null
      }
    }
  }
}
</script>

<style scoped>

</style>
