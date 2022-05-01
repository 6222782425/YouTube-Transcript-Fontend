<template>
  <body>
    <router-link to="/" style="text-decoration: none; color: inherit">
      <div class="navText">YouTube Transcript</div>
    </router-link>

    <!-- <router-link to="userlibrary" v-if="isLogin"> -->
    <img
      src="@/assets/cat.png"
      alt="user icon"
      class="userIcon"
      v-on:click="checkIfLogin()"
    />
    <!-- </router-link> -->
  </body>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    checkIfLogin() {
      this.isLogin = true;
      this.$router.push("/userlibrary");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-left: 50px;
  padding-right: 50px;

  height: 60px;

  background: #ffffff;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.25);
}
.navText {
  font-family: "Inter", sans-serif;
  font-size: 17px;
  font-weight: 900;
  color: black;
  /* text-decoration: none; */
}

.userIcon {
  width: 45px;
  height: 45px;
  /* margin-left: -50%; */
  /* border-radius: 50%;
  border-style: solid;
  border-color: black; */
}

.userIcon:hover {
  cursor: pointer;
}
</style>
