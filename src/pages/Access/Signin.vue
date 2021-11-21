<template>
  <q-page class="bg-images window-width row justify-center items-center fit">
    <div class="column col-lg-4 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card fit q-mr-md">
        <q-parallax :height="200">
          <template v-slot:media>
            <video width="720" height="440" poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>
              <source type="video/mp4" src="statics/video/bg.mp4">
            </video>
          </template>
          <q-card-actions vertical>
            <h3 class="text-white" style="font-family:customfont; height:20px">Salsafical.</h3>
            <q-btn rounded outline class="text-white" color="white" label="Sign in now" @click="visible = !visible" />
          </q-card-actions>
        </q-parallax>
      </q-card>

      <transition name="bounce">
        <div v-if="visible">
          <div class="row justify-center items-center">
            <div class="q-pr-md q-pt-md q-pb-md fit">
              <q-card class="my-card responsive bg-grey-1">
                <q-parallax
                  src="statics/img/orange.png"
                  :height="200"
                />

                <q-card-section>
                  <div class="text-h6 text-blue-10 text-weight-bolder">Sign in</div>
                  <div class="text-caption text-weight-regular">Masukan username dan password anda untuk masuk ke dalam sistem.</div>
                </q-card-section>

                <q-card-section>
                  <div class="justify-center items-center q-pl-lg q-pr-lg q-pb-md">
                    <q-form
                      @submit="onSubmit"
                      @reset="onReset"
                      class="q-gutter-sm"
                    >
                      <q-input
                        v-model="username"
                        label="Your username *"
                        lazy-rules
                        outlined
                        :rules="[ val => val && val.length > 0 || 'Lengkapi data username']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="badge" class="text-blue-10" />
                        </template>
                      </q-input>

                      <q-input v-model="password" label="Your password *" outlined :type="isPwd ? 'password' : 'text'" :rules="[ val => val && val.length > 0 || 'Lengkapi data password']" counter lazy-rules>
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                        <template v-slot:prepend>
                          <q-icon name="gpp_good" class="text-blue-10" />
                        </template>
                      </q-input>

                      <q-separator />

                      <q-card-actions class="justify-end">
                        <div>
                          <q-btn type="reset"  outline rounded label="Reset Data" style="width:155px" class="items-center" unelevated color="primary" />
                          <q-btn type="submit" rounded outline class="q-ml-sm items-center" style="width:155px" color="green" label="Sign in now" unelevated align="right" />
                        </div>
                      </q-card-actions>

                    </q-form>
                  </div>
                </q-card-section>

              </q-card>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </q-page>
</template>
<script>
import { LocalStorage } from 'quasar'
export default {
  data () {
    return {
      username: null,
      password: null,
      visible: false,
      isPwd: true
    }
  },
  methods: {
    onSubmit () {
      try {
        this.$api.post('users/signin', {
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.data.status !== true) {
            this.$showNotif(res.data.message, 'negative')
          } else {
            this.$showNotif('Berhasil Login!', 'positive')
            LocalStorage.set('user', res.data.result)
            this.$router.go({ name: 'dashboard' })
          }
        })
      } catch (e) {
        console.error(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    onReset () {
      this.username = null
      this.password = null
    }
  }
}
</script>

<style>
.bg-images{
  background-image: url("src/statics/5298525.jpg");
  background-size: cover;
}
.bounce-enter-active{
  animation: bounce-in 0.5s;
}
.bounce-leave-active{
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in{
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.25);
  }
  100%{
    transform: scale(1);
  }
}
</style>
