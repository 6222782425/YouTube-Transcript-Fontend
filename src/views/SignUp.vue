<template>
  <body id="body">
    <div class="signupContainer">
      <div class="signinGroup">
        <h1 class="signinTitle">Sign Up</h1>
        <h4 class="signinText">Name and Lastname</h4>
        <input
          type="text"
          placeholder="Name and Lastname"
          class="signinInput"
          v-model="user.firstlastname"
        />

        <h4 class="signinText">Email</h4>
        <input
          type="text"
          placeholder="Email"
          class="signinInput"
          v-model="user.email"
        />

        <h4 class="signinText">Password</h4>
        <input
          type="password"
          placeholder="Password"
          class="signinInput"
          v-model="user.password"
        />

        <h4 class="signinText">Re-enter Password</h4>
        <input
          type="password"
          placeholder="Re-enter Password"
          class="signinInput"
          v-model="user.repassword"
        />

        <button class="signinBtn" v-on:click="saveUser()">Submit</button>
      </div>
    </div>
  </body>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  components: {},
  data() {
    return {
      user: {
        id: null,
        firstlastname: "",
        email: "",
        password: "",
        repassword: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveUser() {
      if (this.password === this.repassword) {
        var data = {
          firstlastname: this.user.firstlastname,
          email: this.user.email,
          password: this.user.password,
        };
        UserDataService.create(data)
          .then((response) => {
            this.user.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            localStorage.setItem("token", response.data.token);
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        alert("Your input password and re-password are not the same.");
      }
    },
  },
};
</script>

<style>
.signupContainer {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signinGroup {
  width: 40em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signinTitle {
  font-family: "Inter", sans-serif;
  color: white;
  font-weight: 900;
  margin-bottom: 50px;
}

.signinText {
  font-family: "Inter", sans-serif;
  color: white;
  font-size: 20px;
  font-weight: 600;
  justify-content: start;
  align-self: start;
}

.signinInput {
  width: 100%;
  height: 55px;
  border-radius: 90px;
  border: none;
  padding-left: 50px;
  margin-bottom: 25px;
}

.signinBtn {
  font-family: "Inter", sans-serif;
  color: white;
  font-size: 24px;
  font-weight: 600;
  margin-top: 20px;

  width: 250px;
  height: 55px;

  background: #8f8e8e;
  border-radius: 90px;
  border: none;
}
</style>