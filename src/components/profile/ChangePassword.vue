<template>
  <div class="box center">
    <h3 class="title is-4">Change Password</h3>
    <form @submit="submit">
      <div class="field">
        <label class="label">Old Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="old password" v-model="old_password" required>
        </div>
      </div>
      <div class="field">
        <label class="label">New Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Text input" v-model="password" required>
          <p v-if="error"><strong><small class="has-text-danger">{{ error }}</small></strong></p>
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm password </label>
        <div class="control">
          <input class="input" type="password" placeholder="Text input" v-model="confirmation" required>
        </div>
      </div>
      <div class="control">
          <div><button class="button is-success is-small is-pulled-right" :class="{'is-loading': loading }"  type="submit">Submit</button><br></div>
      </div>
    </form>
    <!-- <br><a><p class="is-pulled-right" @click="resetPassword">send password reset link instead</p></a> -->
    <br>
  </div>
</template>

<script>
  import { changePassword } from '../../repository';

  export default {
    name: 'change-password',
    props: {  },
    components: {
    },
    data(){
      return {
          old_password: '',
          password: '',
          confirmation: '',
          loading: false,
          error: ''
      }
    },
    methods: {
      validate(){
        let isValid = this.password === this.confirmation;
        !isValid ? this.error = "Password does not match!":  this.error = "";
        return isValid;
      },
      submit(event){
        event.preventDefault();
        if ( !this.validate() ) { return; }
        this.loading = true;
        changePassword(this.$data)
          .then(data => {
            this.loading = false;
            this.$toasted.show(data.message, { 
               theme: "outline", 
               position: "bottom-right", 
               duration : 2500,
               icon: "check_circle"
            });
            this.old_password = '';
            this.password = '';
            this.confirmation = '';
          })
          .catch(err => {
            this.loading = false;
            this.$toasted.show((err.response && err.response.data.message || err.message), { 
               theme: "bubble", 
               position: "bottom-right", 
               duration : 2500,
               icon: "report_problem"
            });
            
          })
      }
    }
  }
</script>

<style>

</style>

