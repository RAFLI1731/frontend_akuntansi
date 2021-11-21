<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" active-color="secondary" class="text-blue-10">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Laporan" icon="summarize" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="q-gutter-y-md" style="max-width: 1600px; width: 100%">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              style="color: #588157"
              active-color="#588157"
              indicator-color="#588157"
              align="left"
              narrow-indicator
            >
              <q-tab name="usaha" label="Laporan Usaha" />
              <q-tab name="penjualan" label="Penjualan" />
              <q-tab name="pembelian" label="Pembelian" />
              <q-tab name="pengeluaran" label="Pengeluaran" />
              <q-tab name="modal" label="Modal" />
              <q-tab name="mitra" label="Mitra" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="usaha">
                <div class="row q-mt-lg">
                  <div class="col">
                    <div class="row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Laba rugi</div>
                            <div class="text-caption text-grey">
                              Menampilkan setiap tipe transaksi dan jumlah total untuk pendapatan dan pengeluaran anda.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="trending_up" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-start q-gutter-md q-ml-sm">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Ringkasan bisnis</div>
                            <div class="text-caption text-grey">
                              Laporan Ringkasan Bisnis Menampilkan ringkasan dari laporan keuangan standar beserta wawasannya.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="analytics" class="rounded-borders" style="font-size: 120px;color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                    <div class="q-ml-sm row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Buku besar</div>
                            <div class="text-caption text-grey">
                              Laporan ini menampilkan semua transaksi yang telah dilakukan untuk suatu periode yang telah dilakukan oleh perusahaan Anda.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="real_estate_agent" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="penjualan">
                <div class="row q-mt-lg">
                  <div class="col">
                    <div class="row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Penjualan</div>
                            <div class="text-caption text-grey">
                              Menunjukkan daftar kronologis dari semua faktur dan pembayaran untuk rentang tanggal yang dipilih.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="local_mall" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-start q-gutter-md q-ml-sm">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Piutang pelanggan</div>
                            <div class="text-caption text-grey">
                              Menampilkan tagihan yang belum dibayar untuk setiap pelanggan, termasuk nomor dan tanggal faktur, tanggal jatuh tempo yang terhutang pada Anda.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="receipt_long" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                    <div class="q-ml-sm row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Perjualan per produk</div>
                            <div class="text-caption text-grey">
                              Menampilkan daftar kuantitas penjualan per produk, termasuk jumlah retur, net penjualan, dan harga penjualan rata-rata.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="alternate_email" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="pembelian">
                <div class="row q-mt-lg">
                  <div class="col">
                    <div class="row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Pembelian</div>
                            <div class="text-caption text-grey">
                              Menampilkan daftar kronologis untuk semua pembelian dan pembayaran Anda untuk rentang tanggal yang dipilih.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="shopping_basket" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-start q-gutter-md q-ml-sm">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Piutang supplier</div>
                            <div class="text-caption text-grey">
                              Menampilkan tagihan yang belum dibayar untuk setiap supplier, termasuk nomor dan tanggal faktur, tanggal jatuh tempo yang terhutang pada Anda.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="receipt_long" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                    <div class="q-ml-sm row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Pembelian per produk</div>
                            <div class="text-caption text-grey">
                              Menampilkan daftar kuantitas pembelian per produk, termasuk jumlah retur, net penjualan, dan harga penjualan rata-rata.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="inventory" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="pengeluaran">
                <div class="row q-mt-lg">
                  <div class="col">
                    <div class="row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Pengeluaran</div>
                            <div class="text-caption text-grey">
                              Menampilkan daftar kronologis untuk semua pengeluaran Anda untuk rentang tanggal yang dipilih.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="takeout_dining" class="rounded-borders" style="font-size: 120px;color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row items-start q-gutter-md q-ml-sm">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">Pengeluaran per produk</div>
                            <div class="text-caption text-grey">
                              Menampilkan daftar kuantitas pengeluaran per produk, dan harga penjualan rata-rata.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="pie_chart_outline" class="rounded-borders" style="font-size: 120px; color: #588157" />
                          </q-card-section>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions>
                          <q-btn flat style="color: #588157">
                            Lihat Laporan
                          </q-btn>
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="modal">
                <div class="row q-mt-lg">
                  <div class="col">
                    <div class="row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs text-red">Belum Tersedia</div>
                            <div class="text-caption text-grey">
                              Sedang dalam pengembangan sistem.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="new_releases" class="text-red rounded-borders" style="font-size: 120px;" />
                          </q-card-section>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                  </div>
                  <div class="col">
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="mitra">
                <div class="row q-mt-lg">
                  <div class="col">
                    <div class="row items-start q-gutter-md">
                      <q-card class="my-card" flat bordered>
                        <q-card-section horizontal>
                          <q-card-section class="q-pt-xs">
                            <div class="text-overline">Laporan</div>
                            <div class="text-h5 q-mt-sm q-mb-xs text-red">Belum Tersedia</div>
                            <div class="text-caption text-grey">
                              Sedang dalam pengembangan sistem.
                            </div>
                          </q-card-section>

                          <q-card-section class="col-5 flex flex-center">
                            <q-icon name="new_releases" class="text-red rounded-borders" style="font-size: 120px;" />
                          </q-card-section>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                  <div class="col">
                  </div>
                  <div class="col">
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
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
      tab: 'usaha',
      splitterModel: 10
    }
  }
}
</script>

<style scoped>

</style>
