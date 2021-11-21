const routes = [
  {
    path: '/auth',
    component: () => import('layouts/Signin.vue'),
    children: [
      { path: '', name: 'signin', component: () => import('src/pages/Access/Signin.vue') }
    ],
    meta: {
      authGuest: true
    }
  },
  {
    path: '/login',
    component: () => import('layouts/login.vue'),
    children: [
      { path: 'loginUser', name: 'loginUser', component: () => import('pages/loginUser.vue') },
      { path: 'registerUser', name: 'registerUser', component: () => import('pages/registerUser.vue') }
    ]
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/Index.vue') },
      { path: '/product', name: 'product', component: () => import('pages/Product.vue') },
      { path: '/product/input', name: 'product_add', component: () => import('pages/product/input.vue') },
      { path: '/product/edit/:id', name: 'product_edit', component: () => import('pages/product/edit.vue') },
      { path: '/kategoriproduk/input', name: 'product_kategori_add', component: () => import('pages/kategori_product/input.vue') },
      { path: '/kategoriproduk/edit/:id', name: 'product_kategori_edit', component: () => import('pages/kategori_product/edit.vue') },
      { path: '/jenisproduk/input', name: 'product_jenis_add', component: () => import('pages/jenis_product/input.vue') },
      { path: '/jenisproduk/edit/:id', name: 'product_jenis_edit', component: () => import('pages/jenis_product/edit.vue') },
      { path: '/penjualan', name: 'penjualan', component: () => import('pages/Penjualan.vue') },
      { path: '/penjualan/input', name: 'penjualan_add', component: () => import('pages/penjualan/input.vue') },
      { path: '/pembelian', name: 'pembelian', component: () => import('pages/Pembelian.vue') },
      { path: '/pengeluaran', name: 'pengeluaran', component: () => import('pages/Pengeluaran.vue') },
      { path: '/retur', name: 'retur', component: () => import('pages/Retur.vue') },
      { path: '/modal', name: 'modal', component: () => import('pages/Modal.vue') },
      { path: '/laporan', name: 'laporan', component: () => import('pages/Laporan.vue') },
      { path: '/profile', name: 'profile', component: () => import('pages/Profile.vue') }
    ],
    meta: {
      authAdmin: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () =>
      import('pages/Error404.vue')
  }
]

export default routes
