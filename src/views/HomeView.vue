<template>
  <body id="body">
    <NavigationTemp></NavigationTemp>
    <div class="container">
      <div>
        <h1 class="header">YouTube</h1>
        <h1 class="header">Transcript</h1>
      </div>

      <div class="inputGroup">
        <input
          type="text"
          id="inputURL"
          placeholder="Paste URL here"
          v-model="youtubeURL"
          v-on:keyup.enter="callAPI()"
        />
        <button v-on:click="callAPI()" class="convertBtn">Convert</button>
      </div>

      <p class="pText">
        Youtube Transcript is a free online tool to give you transcript of any
        YouTube video using only its YouTube link. You can summarize the
        transcript automatically with our T5-based summarization model.
      </p>
      <!-- <button v-on:click="callTest()">test</button> -->
      <p v-if="!isLoading"></p>
      <LoadingScreen v-if="isLoading"></LoadingScreen>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import NavigationTemp from "../components/NavigationTemp.vue";
import LoadingScreen from "../components/LoadingScreen";

export default {
  name: "App",
  components: {
    NavigationTemp,
    LoadingScreen,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      youtubeURL: "",
      fullTranscrip: "",
      summarizeTranscript: "",
      isLoading: false,
    };
  },
  mounted() {
    // location.reload();
  },
  methods: {
    async callAPI() {
      console.log("click");
      if (this.youtubeURL.includes("https://www.youtube.com/watch?v=")) {
        this.isLoading = true;
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/api/summarize?youtube_url=${this.youtubeURL}`
          );
          console.log(response.data.fullTranscript);
          this.fullTranscrip = response.data.fullTranscript;
          this.summarizeTranscript = response.data.summarizeTranscript;
        } catch (error) {
          console.error(error);
        }
        document.getElementById("inputURL").value = "";
        this.$router.push({
          name: "TranscriptView",
          params: {
            callFullTranscrip: this.fullTranscrip,
            callSummarizeTranscript: this.summarizeTranscript,
            getYoutubeURL: this.youtubeURL,
          },
        });
      } else {
        alert("Please input YouTube URL!!");
      }
    },
    async callTest() {
      try {
        const response = await axios.get("http://localhost:8080/api");
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
#body {
  background-image: url("../assets/background.jpg");
  min-height: 100vh;
  max-height: 200vh;
  background-size: cover;

  /* background-repeat: repeat; */
}

.container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#inputURL {
  /* position: absolute; */
  width: 756px;
  height: 55px;
  border-radius: 90px;
  border: none;
  padding-left: 50px;
}

.header {
  font-family: "Inter", sans-serif;
  color: white;
  font-weight: 900;
}

.inputGroup {
  margin-top: 60px;
  margin-bottom: 30px;
}

.convertBtn {
  font-family: "Inter", sans-serif;
  color: white;
  font-size: 24px;
  font-weight: 600;

  position: absolute;
  width: 144px;
  height: 55px;
  left: 40em;
  /* top: 544px; */
  background: #8f8e8e;
  border-radius: 90px;
  border: none;
}

.pText {
  font-family: "Inter", sans-serif;
  color: white;
  font-size: 17px;
  width: 740px;
}
</style>
