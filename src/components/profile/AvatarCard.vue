<template>
  <div class="box" style="text-align: center">
    <img style="max-width: 320px; margin: 0 auto; margin-bottom: 10px" :src="avatar" class="image img" alt="Profile picture">
    <div class="control m-b-15">
      <input id="fileUpload" type="file" hidden @change="selectFiles">
      <div class="is-clearfix">
        <button class="button is-success is-small is-pulled-right" @click="chooseFiles()">Change Avatar</button>
      </div>
      <progress v-if="uploadProgress" class="progress is-small is-success" style="margin-top: 10px" :value="uploadProgress" max="100"></progress>
      <hr>
      <div class="is-clearfix"><a class="is-primary is-pulled-right">subscribe for newsletter</a></div>
    </div>
  </div>
</template>

<script>
  import { uploadAvatar, BASE_URL } from '../../repository';

  export default {
    name: 'avatar-card',
    data(){
      return {
        image: null,
        uploadProgress: null
      }
    },
    methods: {
      chooseFiles() {
        document.getElementById("fileUpload").click()
      },
      selectFiles(event){
        let file = event.target.files.item(0);
        if (file.name.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
          uploadAvatar(file, this)
            .then(data => {
              this.$store.dispatch('UPDATE_AVATAR', data.avatar)
              this.uploadProgress = null;
              this.$toasted.show(data.message, { 
                 theme: "outline", 
                 position: "bottom-right", 
                 duration : 2500,
                 icon: "check_circle"
              });
            })
            .catch(err => {
              this.$toasted.show((err.response && err.response.data.message || err.message), { 
                 theme: "bubble", 
                 position: "bottom-right", 
                 duration : 2500,
                 icon: "report_problem"
              })
            })
        } else {
          this.$toasted.show("Please select a valid Image!" , { 
             theme: "bubble", 
             position: "bottom-right", 
             duration : 2500,
             icon: "report_problem"
          })
        }
      }
    },
    computed: {
      avatar(){
        return this.$store.state.user && this.$store.state.user.avatar ? BASE_URL + '/' + this.$store.state.user.avatar: "avatar-icon-default.jpg";
      }
    }
  }
</script>
