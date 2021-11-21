<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Profile" icon="manage_accounts" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">

                <q-card class="my-card" flat>
                  <q-card-section horizontal>
                    <q-card-section class="q-pt-xs">
                      <div class="text-overline">Profile</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">Administrator</div>
                      <div class="text-caption text-grey">
                        Administrator adalah orang yang bertugas untuk mengurusi hal-hal administrasi. Dalam dunia Internet, seorang administrator bertugas untuk mengelola hal-hal yang berhubungan dengan komputer.
                      </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                      <q-avatar size="150px">
                        <img src="statics/img/selsafical.png">
                      </q-avatar>
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-chip outline square color="primary" text-color="white" icon="support_agent">
                      07210277
                    </q-chip>
                    <q-chip outline square color="primary" text-color="white" icon="alternate_email">
                      Bandar Lampung
                    </q-chip>
                  </q-card-actions>
                </q-card>

              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">Perbaharui profile</div>
                  <p class="text-caption">Form input data profile.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="id_product"
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
                        v-model="name_produk"
                        label="Nama produk"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data nama produk']"
                      />
                    </div>
                  </div>

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="kategori_product" dense lazy-rules filled :options="options_kategori" label="Kategori" />
                    </div>
                    <div class="col">
                      <q-select outlined v-model="jenis_product" dense lazy-rules filled :options="options_jenis" label="Jenis barang" />
                    </div>
                  </div>

                  <div class="row q-py-sm q-gutter-sm">
                    <div class="col">
                      <q-input
                        v-model="keterangan_product"
                        filled
                        dense
                        label="Keterangan"
                        type="textarea"
                      />
                    </div>
                  </div>

                  <div class="q-mt-md">
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Reset" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                  </div>
                </q-form>

              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>

</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      hargamodal: null,
      hargajual: null,
      id_product: 'ID-981198',
      kategori_product: null,
      jenis_product: null,
      name_produk: null,
      hpp_product: null,
      keterangan_product: null,
      stok_produk: null
    }
  },
  methods: {
    onSubmit () {

    },
    onReset () {

    }
  }
}
</script>

<style scoped>

</style>
