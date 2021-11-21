<template>
    <q-page class="window-height window-width row justify-center items-center">
        <div class="column" style="margin-top: 25px">
        <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
            <q-img src="~assets/icon_selsafical.png" />
            <q-card-section>
                <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="nama" type="text" label="Full Name"
                :rules="[ val => val && val.length > 0 || 'Tolong Ketik Nama Lengkap Anda' ]" />
                <q-input square filled clearable v-model="email" type="email" label="Email"
                :rules="[ val => val && val.length > 0 || 'Tolong Ketik Email Anda' ]" />
                <q-input square filled clearable v-model="number" type="number" label="Phone Number"
                :rules="[ val => val && val.length > 0 || 'Tolong Ketik No Telepon Anda' ]" />
                <q-input square filled clearable v-model="password" type="password" label="Password"
                :rules="[ val => val && val.length > 0 || 'Tolong Ketik Password Anda' ]" />
                <q-input square filled clearable v-model="password2" type="password" label="Confirm Password"
                :rules="[ val => val && val.length > 0 || 'Tolong Ketik Password Anda' ]" />
                </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
                <q-btn unelevated color="primary" size="lg" class="full-width" label="REGISTER" :to="{name : 'loginUser'}" @click="showLoading"/>
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6">Have an Account <q-btn class="btnHover bg-transparent" :to="{name : 'loginUser'}" flat color="blue">login Now</q-btn></p>
            </q-card-section>
            </q-card>
        </div>
        </div>
    </q-page>
</template>

<style>
.q-card {
  width: 360px;
}
</style>
<script>
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })

    return {
      name: 'Login',
      data () {
        return {
          email: '',
          password: '',
          nama: '',
          number: '',
          password2: ''
        }
      },
      showLoading () {
        $q.loading.show()

        // hiding in 2s
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 2000)
      }
    }
  }
}
</script>
