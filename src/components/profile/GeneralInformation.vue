<template>
  <div class="box center">
    <h3 class="title is-4">General Information</h3>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" :class="{ 'is-danger': nameError}" type="text" placeholder="Enter your full name" v-model="name" >
        <p v-if="nameError"><strong><small class="has-text-danger">{{ nameError }}</small></strong></p>
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="Enter your email " v-model="email" disabled>
      </div>
    </div>
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" :class="{ 'is-danger': usernameError}" type="text" placeholder="Enter your username" v-model="username" >
        <p v-if="usernameError"><strong><small class="has-text-danger">{{ usernameError }}</small></strong></p>
      </div>
    </div>
    <div class="control">
        <button class="button is-success is-small is-pulled-right" @click="submit">Submit</button><br>
    </div><br>
  </div>
</template>

<script>
  import { updateProfile } from '../../repository/index';
  import { mapGetters} from 'vuex';

  export default {
    name: 'general-information',
    props: {  },
    components: {
    },
    mounted(){
      this.name = this.user.name
      this.username = this.user.username;
      this.email = this.user.email;
    },
    data(){
      return {
        name: "",
        username: "",
        email: "",
        usernameError: false,
        nameError: false
      }
    },
    methods: {
      validate(){
        let isValid = this.name && this.username;
        !this.name ? this.nameError = "Please Enter your name":  this.nameError = "";
        !this.username ? this.usernameError = "Please Enter a username":  this.usernameError = "";
        return isValid;
      },
      submit(event){
        event.preventDefault();
        if ( !this.validate() ) { return; }
        this.loading = true;
        updateProfile(this.$data)
          .then(data => {
            this.loading = false;
            this.$toasted.show(data.message, { 
               theme: "outline", 
               position: "bottom-right", 
               duration : 5000,
               icon: "check_circle"
            });
            this.$store.dispatch('UPDATE_USER', data.user);
          })
          .catch(err => {
            if (!err.response) {
                return this.$toasted.show( err.message, { 
                       theme: "bubble", 
                       position: "bottom-right", 
                       duration : 2500,
                       icon: "report_problem"
                  });
              }
              let { errors } = err.response.data.errors;
              for (var i = 0; i < errors.length; i++) {
                this[errors[i].path + "Error"] = errors[i].message;
              }
              this.$toasted.show((err.response && err.response.data.message || err.message), { 
                     theme: "bubble", 
                     position: "bottom-right", 
                     duration : 2500,
                     icon: "report_problem"
                  })
              this.toggleLoading()
          })
      }
    },
    computed:{
      ...mapGetters(['user'])
    },
    watch:{
      user(){
        this.name = this.user.name;
        this.username = this.user.username;
        this.email = this.user.email;
      }
    }
  }
</script>

<style>

</style>

