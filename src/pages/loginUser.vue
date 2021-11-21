<template>
    <q-page class="window-height window-width row justify-center items-center">
        <div class="column">
        <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
            <q-img src="~assets/icon_selsafical.png" />
            <q-card-section>
                <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="email" type="email" label="email" />
                <q-input square filled clearable v-model="password" type="password" label="password" />
                </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
                <q-btn unelevated color="primary" size="lg" class="full-width" label="Login" @click="showLoading" :to="{name : 'dashboard'}"/>
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
                <p class="text-grey-6">Not reigistered? <q-btn class="btnHover bg-transparent" :to="{name : 'registerUser'}" flat color="blue">Created an Account</q-btn></p>
            </q-card-section>
            </q-card>
        </div>
        </div>
    </q-page>
</template>
<script>
import { useQuasar } from 'quasar'
import { onBeforeUnmount, ref } from 'vue'

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
      showLoading () {
        $q.loading.show()

        // hiding in 2s
        timer = setTimeout(() => {
          $q.loading.hide()
          timer = void 0
        }, 2000)
      },
      email: ref(''),
      password: ref('')
    }
  }
}
</script>
<style>
.btnHover:hover {
  color: rgb(38, 11, 63);
  background-color: blueviolet;
}
.q-card {
  width: 360px;
}
</style>
