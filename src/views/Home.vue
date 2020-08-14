<template>
  <Layout :unwrap="true">
    <section class="section is-hero index-section">
      <div class="container">
        <div class="columns is-vcentered column has-text-centered-mobile">
          <div class="column is-6">
            <div class="section-media has-text-centered">
              <img role="presentation" src="/img/slide-Free-text-to-speech.png" srcset>
              <p class="has-text-grey">
                <small>
                  Text to speech conversion using
                  <a
                    href
                    class="has-text-grey-light"
                  >Google wavenet API</a>
                </small>
              </p>
            </div>
          </div>
          <div class="column is-6 is-5-fullhd is-offset-1-fullhd">
            <div class="section-header">
              <h1 class="title is-spaced is-2 is-4-mobile has-text-primary is-hidden-mobile">
                Narrately
                <span class="tag is-white">Beta</span>
              </h1>
              <p class="is-hidden-mobile under-line"></p>
              <h1 class="title is-spaced is-4">Convert text to speech with ease</h1>
              <h2 class="subtitle is-5 is-spaced">
                Narrately is a speech engine powered by Artificial intelligence.
                <br>
                <br>Narrately converts your existing articles into Podcast. The podcast is a great way to revive and repurpose your content. It gives you an opportunity to re-share, re-distribute and re-publish your articles again with your audience but this time with audio.
                <br>
              </h2>
              <div class="field">
                <router-link
                  tag="a"
                  to="/dashboard"
                  class="button is-primary is-medium"
                  style="margin-bottom: 10px"
                >Get Started</router-link>&nbsp;&nbsp;&nbsp;
                <a
                  href="#how-it-works"
                  class="button is-white is-medium"
                >How does it work?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero section is-hero is-primary">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-6 is-5-fullhd is-offset-1-fullhd">
            <div class="section-header">
              <h2 class="title is-2 is-spaced">
                Human like speech
                <span class="spacer is-horizontal is-05"></span>
              </h2>
              <h2
                class="subtitle is-5"
              >You get Real Human-like Voices for your YoutubeVideos, Article podcasts, Explainer Videos and more.</h2>
              <div class="field is-grouped">
                <div class="control">
                  <a class="button is-white is-medium" href>Start Converting</a>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="section-media">
              <img class="full-width" role="presentation" src="/img/0_Z9_fXrSQakao0pLo.png">
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero section is-hero">
      <div class="container">
        <div class="columns mobile">
          <div class="column is-1">
            <img src="/img/settings.svg">
          </div>
          <div class="column is-11" style="display: flex; align-items: center">
            <h2
              class="subtitle"
            >Currently, narrately is in Beta Phase, it means we are working hard to improve user experience and adding more features.</h2>
          </div>
        </div>
      </div>
    </section>
    <section class="has-background-secondary is-usp is-medium" id="video_intro">
      <div class="container">
        <h1 class="title is-spaced is-2 is-4-mobile has-text-centered">Spot the difference?</h1>

        <div class="columns is-marginless">
          <div class="column">
            <div class="box" style="height: 100%">
              <h3 class="title is-4 is-spaced">Regular Text to Speech</h3>
              <iframe
                style="height: 100%;"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/gqBftW6z2Ko&t=72s"
              ></iframe>
            </div>
          </div>
          <div class="column">
            <div class="box" style="height: 100%">
              <h3 class="title is-4 is-spaced">Narrately</h3>
              <iframe
                style="height: 100%;"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/PlEkR_dsdCQ"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section is-usp has-background-inverse is-medium" id="how-it-works">
      <div class="container">
        <h1 class="title is-spaced is-2 is-4-mobile has-text-centered">How it works</h1>
        <br>
        <div class="columns how_to">
          <div class="column is-3">
            <div class style="height: 100%">
              <img role="presentation" src="/img/create_acct.svg">
              <br>
              <h3 class="title is-4 is-spaced">Create an account</h3>
            </div>
          </div>
          <div class="column is-3">
            <div style="height: 100%">
              <img role="presentation" src="/img/document.svg">
              <br>
              <h3 class="title is-4 is-spaced">Enter Your Text</h3>
            </div>
          </div>
          <div class="column is-3">
            <div style="height: 100%">
              <img role="presentation" src="/img/select.svg">
              <br>
              <h3 class="title is-4 is-spaced">Select Voice/Convert</h3>
            </div>
          </div>
          <div class="column is-3">
            <div style="height: 100%">
              <img role="presentation" src="/img/download.svg">
              <br>
              <h3 class="title is-4 is-spaced">Download</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-12 is-10-fullhd">
              <div class="columns is-vcentered">
                <div class="column is-half">
                  <div class="title">📬 Newsletter</div>
                  <div class="subtitle">Receive and feature updates must-read articles</div>
                </div>
                <div class="column is-half">
                  <form>
                    <div class="field has-addons">
                      <div class="control is-expanded">
                        <input
                          class="input is-medium"
                          name="EMAIL"
                          placeholder="Enter your email"
                          required
                          type="email"
                          value
                        >
                      </div>
                      <div class="control">
                        <button
                          class="button is-primary is-inverted is-medium"
                          type="submit"
                        >Subscribe</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="section is-usp has-background-light is-medium">
            <div class="container">
            	<h1 class="title is-spaced is-2 is-4-mobile has-text-centered" >Contact Us</h1><br>
                <div class="column is-6 is-offset-3 box contact-box">
					<div class="field">
					  <div class="control">
					  	<label class="label">Email:</label>
					  	<input class="input" type="email" placeholder="email" required>
					  </div>
					</div>
					<div class="field">
					  <div class="control">
					  	<label class="label">Message Title:</label>
					  	<input class="input" type="text" placeholder="Message title" required>
					  </div>
					</div>
					<div class="field">
					  <div class="control">
					  	<label class="label">Message Content:</label>
					    <textarea class="textarea" rows="3" placeholder="Enter message here ..." required ></textarea>
					  </div>
					</div>
                </div>
            </div>
    </section>-->
  </Layout>
</template>

<script>
import Layout from "../components/layout/secondary.vue";
import { activateUser } from "../repository";

export default {
  name: "home",
  components: {
    Layout
  },
  mounted() {
    if (this.$route.name === "activate-user" || this.$route.params.token) {
      activateUser(this.$route.params.token)
        .then(() => {
          this.$toasted.show("You have been activated successfully!", {
            theme: "outline",
            position: "bottom-right",
            duration: 2500,
            icon: "check_circle"
          });
          if (this.$store.state.user) {
            this.$store.dispatch("ACTIVATE_USER");
            this.$router.push("/dashboard");
          }
          //dettach loader
        })
        .catch(err => {
          this.$toasted.show(
            (err.response && err.response.data.message) || err.message,
            {
              theme: "bubble",
              position: "bottom-right",
              duration: 2500,
              icon: "report_problem"
            }
          );
          //dettach loader
        });
    }
  }
};
</script>

<style scoped>
.index-section {
  padding: 9rem 1.5rem;
  background: #f6f6f6;
}

.contact-box {
  padding: 4rem;
}

.field {
  margin-top: 1.5rem;
}
.how_to.columns .column {
  text-align: center;
}
.how_to.columns .column img {
  height: 200px;
}

#video_intro {
  background: #fbfbfb;
  padding: 50px 0;
}

#video_intro .columns {
  padding: 20px 0;
}
#video_intro .columns .column {
  height: 400px;
}

@media screen and (max-width: 768px) {
  .index-section {
    padding: 5rem 1.5rem;
  }

  .title.is-2 {
    font-size: 1.75rem;
  }

  .contact-box {
    padding: 1rem 2rem;
    padding-bottom: 3rem;
  }

  .under-line {
    border-top: solid 5px #00d1b2;
    max-width: 100px;
    margin-bottom: 1.5rem;
    margin-top: -1rem;
  }

  .section {
    padding: 3rem 0.75rem;
  }
}
</style>