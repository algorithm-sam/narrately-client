<template>
  <div id="app" ref="appContainer">
    <div id="nav">
    </div>
    <router-view/>
    <UpgradePlan v-if="$store.state.upgradePlanNotify" />
  </div>
</template>

<script>
import 'bulma/css/bulma.css';
import LocaleCode from "locale-code";
import { getAuthUser, getQuota, getVoices } from "./repository";
import UpgradePlan from "./components/notification/upgrade";

export default {
  name: 'App',
  components: {UpgradePlan},
  mounted() {
  	const token = localStorage.getItem('x-access-token');
  	const expiration = localStorage.getItem('x-access-token-expiration');

  	if (token && (expiration > Date.now()) && !this.$store.state.user ) {
      let loader = this.$loading.show({
        opacity: 0.95
      });
  		getAuthUser()
        .then(data => {
          this.$store.dispatch("LOGIN_USER", {token: {token, expiration}, user: data.user});
          getQuota()
            .then(data => {
              this.$store.dispatch("UPDATE_QUOTA", data.quota)
              if (!data.quota.conversions || !data.quota.characters) {
                this.$store.dispatch('SET_UPGRADE_PLAN_NOTIFICATION', true);
              }
              loader.hide();
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
  	}
    getVoices()
        .then(({voices}) => {
          let languages = [];
          voices.map(voice => {
            let lang = LocaleCode.getLanguageName(voice.languageCodes[0]);
            if(lang.toLowerCase() === "english")  {
              lang += ` (${LocaleCode.getCountryCode(voice.languageCodes[0])})`
            }
            voice.language = lang;
            languages.push(lang)
          })
          languages = Array.from(new Set(languages));
          this.$store.dispatch("ADD_VOICES", voices);
          this.$store.dispatch("ADD_LANGUAGES", languages);
        }).catch(err => console.log(err))
  }
}
</script>

