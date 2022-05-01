<template>
  <body id="body">
    <div class="signinContainer">
      <div class="signinGroup">
        <h1 class="signinTitle">Sign In</h1>
        <h4 class="signinText">Email</h4>
        <input
          type="text"
          placeholder="Email"
          class="signinInput"
          v-model="user.email"
        />
        <h4 class="signinText">Password</h4>
        <input
          type="Password"
          placeholder="Password"
          class="signinInput"
          style="margin-bottom: 0"
          v-model="user.password"
        />
        <a
          href=""
          style="align-self: end; margin-bottom: 40px"
          v-on:click="forgetpwd()"
          >Forget Password?</a
        >

        <button class="signinBtn" v-on:click="login()">Log in</button>

        <span>
          <p class="signinText">
            Have not sign up yet?
            <strong
              ><router-link
                to="signup"
                style="text-decoration: none; color: inherit"
                >Sign up</router-link
              ></strong
            >
          </p>
        </span>
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
        email: "",
        password: "",
      },
      submitted: false,
    };
  },
  // mounted() {
  //   localStorage.clear();
  // },
  methods: {
    forgetpwd() {
      alert("Please send email to 6222782425@g.siit.tu.ac.th <3");
    },
    async login() {
      var data = {
        email: this.user.email,
        password: this.user.password,
      };
      await UserDataService.login(data)
        .then((response) => {
          // console.log(response.data);
          this.submitted = true;
          // console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          alert("Worng email or password!!");
        });
    },
  },
};
</script>

<style>
.signinContainer {
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
  margin-bottom: 30px;
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
  margin-bottom: 40px;

  width: 250px;
  height: 55px;

  background: #8f8e8e;
  border-radius: 90px;
  border: none;
}
</style>