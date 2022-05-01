<template>
  <div class="list">
    <div v-for="(item, index) in library[0]" :key="item.id">
      <!-- <div> -->
      <!-- {{ item }} -->
      <!-- {{ item[0].summarizedTranscript }}
      {{ item[0].url }} -->
      <!-- {{ item[index].id }} -->
      <!-- {{ item.id }} -->
      <div class="librarListContainer">
        <img
          :src="item.thubnall"
          alt="youtube thumbnail"
          class="thumbnail"
          v-on:click="showTranscript(index)"
        />
        <div class="librarListDetail">
          <p class="youTubeTitle" v-on:click="showTranscript()">See Detail</p>
          <img
            src="../assets/bin.png"
            alt="bin"
            class="bin"
            v-on:click="deleteLibrary()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     libraryList: [],
  //   };
  // },
  props: {
    library: Array,
  },
  methods: {
    deleteLibrary() {
      console.log("deleteLibrary id");
    },
    showTranscript(index) {
      // console.log(this.library[0][index].summarizedTranscript);
      const para = {
        fullTranscript: this.library[0][index].fullTranscript,
        summarizeTranscript: this.library[0][index].summarizedTranscript,
        youtubeURL: this.library[0][index].url,
      };
      console.log(para);
      this.$router.push({
        path: "/transcriptViewLibrary",
        query: {
          data: para,
        },
      });
    },
    rerender() {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
.list {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  row-gap: 20px;
  column-gap: 10px;
}

.librarListContainer {
  display: flex;
  flex-direction: column;

  width: 300px;
  /* height: 50px; */
}

.thumbnail {
  width: 300px;
  height: 200px;

  border-radius: 25px 25px 0 0;
}

.thumbnail:hover {
  cursor: pointer;
}

.librarListDetail {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  padding: 10px 18px 10px 15px;
  border-radius: 0 0 25px 25px;
}

.youTubeTitle {
  margin: 0;
  max-width: 250px;

  text-align: left;
  overflow: hidden;
  text-overflow: clip;
}

.youTubeTitle:hover {
  cursor: pointer;
}

.bin {
  width: 15px;
  height: 15px;
}

.bin:hover {
  cursor: pointer;
}
</style>