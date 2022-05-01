<template>
  <body id="body">
    <NavigationTemp></NavigationTemp>
    <div class="tranContianer">
      <div class="bngShadow">
        <h4 class="vdoText">YouTube Transcription</h4>
        <iframe class="video" :src="this.youtubeURL"> </iframe>

        <div class="convertGroup">
          <div class="dropdown">
            <button
              class="dropdownBtn dropdown-toggle"
              type="button"
              id="dropdownMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ this.dropDownInput }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
              <li
                id="1"
                class="dropdown-item"
                v-on:click="changeDropdownInput($event)"
              >
                Full Transcription
              </li>
              <li
                id="2"
                class="dropdown-item"
                v-on:click="changeDropdownInput($event)"
              >
                Summarize Transcript
              </li>
            </ul>
          </div>

          <button class="tranBtn" v-on:click="showTranscript()">Convert</button>
        </div>

        <div class="textBox">
          <button class="copyBtn" v-clipboard:copy="copyTranscript()">
            Copy
          </button>
          <p v-if="this.showFullTranscript" class="transcriptText">
            {{ fullTranscript }}
          </p>
          <p v-if="this.showSummarizeTranscript" class="transcriptText">
            {{ summarizeTranscript }}
          </p>
        </div>
      </div>

      <div class="starShadow">
        <img
          src="@/assets/star.png"
          alt="star"
          class="star"
          v-if="!clickStar"
          v-on:click="addToLibrary()"
        />
        <img
          src="@/assets/clickstar.png"
          alt="star"
          class="star"
          v-if="clickStar"
          v-on:click="removeToLibrary()"
        />
      </div>
    </div>
  </body>
</template>

<script>
// import router from "../router";
import NavigationTemp from "../components/NavigationTemp.vue";
import TranscriptDataService from "../services/TranscriptDataService";
import LibraryDataService from "../services/LibraryDataService";
import UserDataService from "../services/UserDataService";

export default {
  components: {
    NavigationTemp,
  },
  data() {
    return {
      fullTranscript: "",
      summarizeTranscript: "",
      getyoutubeURL: "",
      youtubeURLId: "",
      youtubeURL: "",
      dropDownInput: "Full Transcription",
      showFullTranscript: true,
      showSummarizeTranscript: false,
      id: "",
      clickStar: false,
      submitted: false,
      userId: "",
      transcriptId: "",
    };
  },
  // props: {
  //   fullTranscript: String,
  // },
  created() {
    this.fullTranscript = this.$route.params.callFullTranscrip;
    this.summarizeTranscript = this.$route.params.callSummarizeTranscript;
    this.getyoutubeURL = this.$route.params.getYoutubeURL;
    this.youtubeURLId = this.getyoutubeURL.slice(32);
    this.youtubeURL = `https://www.youtube.com/embed/${this.youtubeURLId}`;
  },
  // mounted() {
  // },
  methods: {
    changeDropdownInput(event) {
      this.id = event.currentTarget.id;
      if (this.id === "1") {
        this.dropDownInput = "Full Transcription";
      } else if (this.id === "2") {
        this.dropDownInput = "Summarize Transcription";
      }
      // console.log(this.dropDownInput);
    },
    showTranscript() {
      // console.log(this.dropDownInput);
      (this.showFullTranscript = false), (this.showSummarizeTranscript = false);
      if (this.dropDownInput === "Full Transcription") {
        (this.showFullTranscript = true),
          (this.showSummarizeTranscript = false);
      } else if (this.dropDownInput === "Summarize Transcription") {
        (this.showFullTranscript = false),
          (this.showSummarizeTranscript = true);
      }

      // console.log(this.showFullTranscript);
    },
    copyTranscript() {
      if (this.showFullTranscript === true) {
        return this.fullTranscript;
      } else if (this.showSummarizeTranscript === true) {
        return this.summarizeTranscript;
      }
    },
    async addToTranscriptDB() {
      var data = {
        fullTranscript: this.fullTranscript,
        summarizedTranscript: this.summarizeTranscript,
        thubnall: `https://img.youtube.com/vi/${this.youtubeURLId}/hqdefault.jpg`,
        url: this.youtubeURL,
      };
      await TranscriptDataService.create(data)
        .then((response) => {
          // console.log(response.data);
          this.transcriptId = response.data.id;
        })
        .catch((e) => {
          console.log(e);
          // alert("Please Login");
        });
    },
    removeToLibrary() {
      console.log("Remove this transcript in your library");
    },
    async getUserId() {
      await UserDataService.findMe()
        .then((response) => {
          // console.log(response.data);
          // this.submitted = true;
          // console.log(response.data.firstlastname);
          this.userId = response.data.id;
        })
        .catch((e) => {
          console.log(e);
          alert("Please Login");
          this.$router.push("/signin");
        });
    },
    async addToLibrary() {
      await this.getUserId();
      await this.addToTranscriptDB();
      // console.log("userId = " + this.userId);
      // console.log("transcriptId = " + this.transcriptId);
      var data = {
        userId: this.userId,
        transcriptId: this.transcriptId,
      };
      // console.log("userId = " + data.userId);
      // console.log("transcriptId = " + data.transcriptId);
      await LibraryDataService.create(data)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
          this.clickStar = true;
        })
        .catch((e) => {
          console.log(e);
          // alert("Please Login");
          // this.$router.push("/signin");
        });
    },
  },
};
</script>

<style>
.tranContianer {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
}

.bngShadow {
  /* position: absolute; */
  width: 700px;
  margin-top: 50px;
  padding: 25px;

  background: rgba(0, 0, 0, 0.45);
  border-radius: 31px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.vdoText {
  font-family: "Inter", sans-serif;
  color: white;
  /* font-size: 24px; */
  font-weight: 600;
  align-self: flex-start;
}

.video {
  width: 100%;
  height: 370px;
  border-radius: 25px;
  border: none;
  margin-top: 5px;
  margin-bottom: 25px;
}

.convertGroup {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
}

.dropdownBtn {
  width: 360px;
  height: 50px;
  border-radius: 90px;
  border: none;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
  text-align: start;
}

.dropdown-menu {
  width: 360px;

  border-radius: 90px;

  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.tranBtn {
  font-family: "Inter", sans-serif;
  color: white;
  font-weight: 600;
  font-size: 18px;
  width: 244px;
  height: 55px;
  border-radius: 90px;
  border: none;
  background-color: #be022f;
}

.textBox {
  width: 100%;
  min-height: 100px;
  max-height: 800px;

  border-radius: 32px;
  background-color: white;
  padding: 30px;
  padding-top: 50px;
}

.copyBtn {
  position: absolute;
  top: 665px;
  right: 420px;

  border: none;
  background-color: white;
  border-radius: 32px;

  color: blue;
}

.transcriptText {
  /* min-height: 100px; */
  max-height: 700px;
  /* white-space: nowrap; */
  overflow: scroll;
  text-overflow: ellipsis;
  text-align: left;
}

.starShadow {
  position: absolute;
  width: 45px;
  height: 50px;
  margin-left: 46.56em;
  margin-top: 200px;
  top: 0;

  background: rgba(0, 0, 0, 0.45);
  border-radius: 0px 15px 15px 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.star {
  width: 20px;
  height: 20px;
}
</style>