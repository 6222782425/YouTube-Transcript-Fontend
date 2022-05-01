<template>
  <body id="body" class="userLirary">
    <NavigationTemp></NavigationTemp>
    <div class="libraryBody">
      <div class="menuContainer">
        <img src="@/assets/cat.png" alt="logo" class="userLogo" />
        <br />
        <h4 class="userName">{{ username }}</h4>

        <div class="libraryGroup">
          <img
            src="@/assets/books.png"
            alt="library icon"
            class="libraryIcon"
          />
          <h4 class="libraryText">Library</h4>
        </div>

        <div class="deletGroup" v-on:click="deleteUser()">
          <img src="@/assets/bin.png" alt="deletIcon" class="deletIcon" />
          <h4 class="deletText">Delete User</h4>
        </div>
      </div>

      <div class="libraryListContianer">
        <h1 class="libraryListTitle">Your Library</h1>
        <LibraryList :library="library"></LibraryList>
      </div>
    </div>
  </body>
</template>

<script>
import NavigationTemp from "../components/NavigationTemp.vue";
import LibraryList from "../components/LibraryList.vue";
import UserDataService from "../services/UserDataService";
import LibraryDataService from "../services/LibraryDataService";
import TranscriptDataService from "../services/TranscriptDataService";

export default {
  components: {
    NavigationTemp,
    LibraryList,
  },
  data() {
    return {
      userId: "",
      username: "",
      submitted: false,
      library: [],
      count: 0,
    };
  },
  created() {
    this.getUserName();
    // this.getLibraryList();
  },
  updated() {
    if (this.count < 3) {
      this.getLibraryList();
      this.count = this.count + 1;
    }
    // this.getLibraryList();
  },
  methods: {
    deleteUser() {
      UserDataService.delete(this.userId)
        .then((response) => {
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
          alert("Cannot Delete");
        });
    },
    async getUserName() {
      await UserDataService.findMe()
        .then((response) => {
          // console.log(response.data);
          this.submitted = true;
          // console.log(response.data.firstlastname);
          this.userId = response.data.id;
          this.username = response.data.firstlastname;
        })
        .catch((e) => {
          console.log(e);
          alert("Cannot find me");
        });
    },
    async getLibraryList() {
      await LibraryDataService.findOne()
        .then((response) => {
          const data = response.data;
          var tempLib = [];
          data.forEach((element, index) => {
            this.findTranscript(element.transcriptId).then((res) => {
              tempLib[index] = res;
            });
          });
          this.library.push(tempLib);
        })
        .catch((e) => {
          console.log(e);
          alert("Cannot get library list");
        });
    },
    async findTranscript(id) {
      // console.log(id);
      var data = {
        id: id,
      };
      return await TranscriptDataService.findOne(data)
        .then((response) => {
          return response.data;
          // const item = Object.keys(response.data).map(function (key) {
          //   return item[key];
          // });
          // console.log(item);
          // console.log(response.data.thubnall);
          // this.library.push(response.data.id);
          // this.library.push(response.data.thubnall);
          // console.log("library list = " + this.library);
        })
        .catch((e) => {
          console.log(e);
          // alert("Cannot find transcript");
        });
    },
  },
};
</script>

<style>
.userLirary {
  padding-bottom: 0;
}
.libraryBody {
  display: flex;
  flex-direction: row;
}

.menuContainer {
  min-height: 100vh;
  max-height: 200vh;
  width: 300px;
  background-color: white;
  padding: 50px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.userLogo {
  height: 100px;
  width: 100px;
}

.userName {
  font-family: "Inter", sans-serif;
  font-weight: 600;
}

.libraryGroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  left: 0;
  width: 300px;
  margin-top: 100px;

  background-color: #efefef;
}

.libraryIcon {
  width: 20px;
  height: 20px;
}

.libraryText {
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #c00230;

  margin: 0;
  padding: 10px;
}

.deletGroup {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* position: absolute; */
  position: fixed;
  bottom: 0;
  margin-bottom: 30px;
}

.deletGroup:hover {
  cursor: pointer;
}

.deletIcon {
  width: 20px;
  height: 20px;
}

.deletText {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #777272;

  margin: 0;
  padding: 10px;
}

.libraryListContianer {
  width: 100%;
  display: column;
  flex-direction: row;
  padding: 5.5em;
  padding-top: 3em;
}

.libraryListTitle {
  font-family: "Inter", sans-serif;
  font-weight: 900;
  color: white;
  text-align: left;
  margin-bottom: 20px;
}
</style>