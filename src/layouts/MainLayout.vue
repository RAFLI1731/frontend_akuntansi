/* eslint-disable */
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #588157">
      <q-toolbar>
        <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
        <q-toolbar-title style="font-family:customfont" class="text-h5">GAPARI</q-toolbar-title>
          <q-btn-dropdown flat label="Administrator" icon="manage_accounts" left stretch>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-btn outline color="primary" label="Profile" clickable :to="{ name: 'profile' }" size="sm" icon="manage_accounts" left />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="statics/img/gapari.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">Administrator</div>

                <q-btn
                  color="danger"
                  label="Logout"
                  flat
                  size="sm"
                  v-close-popup
                  @click="confirm = true"
                />

              </div>
            </div>

          </q-btn-dropdown>
        </q-toolbar>
    </q-header>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="sentiment_very_dissatisfied" text-color="primary" />
          <span class="q-ml-sm">Apakah anda yakin untuk keluar ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat @click="logout()" label="Logout" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="300"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable :to="{ name: 'dashboard' }" v-ripple style="color: #588157">

              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>

            <q-item>

              <q-item-section>
                MAIN MENU
              </q-item-section>

            </q-item>

            <q-item clickable :to="{ name: 'product' }" v-ripple style="color: #588157">
                <q-item-section avatar>
                  <q-icon name="category" />
                </q-item-section>

                <q-item-section>
                  Data Produk
                </q-item-section>
            </q-item>

            <q-item clickable :to="{ name: 'penjualan' }" v-ripple style="color: #588157">
                <q-item-section avatar>
                  <q-icon name="storefront" />
                </q-item-section>

                <q-item-section>
                  Penjualan
                </q-item-section>
            </q-item>

            <q-list class="rounded-borders">
              <q-expansion-item
                expand-icon-toggle
                expand-separator
                icon="extension"
                label="Data Barang"
                style="color: #588157"
              >
                <q-card>
                  <q-card-section>
                    <q-item clickable :to="{ name: 'pembelian' }" v-ripple>
                      <q-item-section avatar>
                        <q-icon name="shopping_bag" style="color: #588157" />
                      </q-item-section>

                      <q-item-section style="color: #588157">
                        Pembelian
                      </q-item-section>
                    </q-item>

                    <q-item clickable :to="{ name: 'pengeluaran' }" v-ripple>
                      <q-item-section avatar>
                        <q-icon name="outbox" style="color: #588157"/>
                      </q-item-section>

                      <q-item-section style="color: #588157">
                        Pengeluaran
                      </q-item-section>
                    </q-item>

                    <q-item clickable :to="{ name: 'retur' }" v-ripple>
                      <q-item-section avatar>
                        <q-icon name="cached" style="color: #588157" />
                      </q-item-section>

                      <q-item-section style="color: #588157">
                        Return
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-item>
              <q-item-section>
                EXTRAS
              </q-item-section>

              </q-item>

              <q-item clickable :to="{ name: 'modal' }" v-ripple style="color: #588157">
                <q-item-section avatar>
                  <q-icon name="payments" />
                </q-item-section>

                <q-item-section>
                  Modal
                </q-item-section>
              </q-item>

              <q-expansion-item
                expand-icon-toggle
                expand-separator
                icon="groups"
                label="Mitra"
                style="color: #588157"
              >
                <q-card>
                  <q-card-section>
                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-icon name="sentiment_satisfied_alt" style="color: #588157"/>
                      </q-item-section>

                      <q-item-section style="color: #588157">
                        Customer
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-ripple>
                      <q-item-section avatar>
                        <q-icon name="local_shipping" style="color: #588157" />
                      </q-item-section>

                      <q-item-section style="color: #588157">
                        Supplier / Vendor
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>

              <q-item clickable :to="{ name: 'laporan' }" v-ripple style="color: #588157">
                <q-item-section avatar>
                  <q-icon name="summarize" />
                </q-item-section>

                <q-item-section>
                  Laporan
                </q-item-section>
              </q-item>

              <q-item @click="confirm = true" clickable v-ripple style="color: #588157">
                <q-item-section avatar>
                  <q-icon name="sentiment_very_dissatisfied" />
                </q-item-section>

                <q-item-section>
                  Sign Out
                </q-item-section>
              </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="statics/img/bg2.jpg" style="height: 150px;">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="statics/img/gapari.png">
            </q-avatar>
            <div claSs="text-weight-bold">Administartor</div>
            <div>@admin_gapari</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer reveal class="bg-grey-3">
        <q-toolbar>
          <q-toolbar-title class="text-h6 text-body1" style="font-size:13px; color: #588157">Copyright 2021</q-toolbar-title>
        </q-toolbar>
      </q-footer> -->
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      confirm: false
    }
  },
  methods: {
    logout () {
      LocalStorage.remove('user', { path: '/auth' })
      this.$router.go({ name: 'signin' })
    }
  }
}
</script>
