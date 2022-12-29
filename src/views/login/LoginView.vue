<template>
  <!-- background -->
  <div id="frmLogin">
    <!-- Main -->
    <div class="h-100 w-100 main">
      <!-- Form -->
      <div id="grid-login">
        <!-- left form -->
        <div class="half-ctn login__img"></div>
        <!-- right form -->
        <div class="half-ctn">
          <!-- The main of right form -->
          <div class="main-login-ctn">
            <!-- logo -->
            <div class="logo"></div>
            <!-- introduction text -->
            <div class="logo-text">
              {{ Resource.QLTS.login_with }}<b>{{ Resource.QLTS.logo }}</b>
            </div>
            <!-- Inputs -->
            <div id="normal-login">
              <div class="grid-login-normal">
                <!-- user name -->
                <div class="username-login login">
                  <input
                    id="iptUserName"
                    class="input-login"
                    :placeholder="Resource.Placeholder.login_account"
                    v-model="userName"
                  />
                </div>
                <!-- password -->
                <div class="password-login login">
                  <input
                    id="iptPassword"
                    class="input-login"
                    :type="onEye ? 'password' : 'text'"
                    :placeholder="Resource.Placeholder.password"
                    v-model="password"
                  />
                  <div
                    :class="['eye', { 'on-eye': onEye }, { 'off-eye': !onEye }]"
                    @click="toggle"
                  ></div>
                </div>
                <!-- login button -->
                <div class="button-login">
                  <button
                    class="button"
                    id="login"
                    @click="signIn"
                    @keydown.enter="signIn"
                  >
                    {{ Resource.ButtonName.login }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-right">{{ Resource.QLTS.copyright }}</div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
import { login } from "@/apis/user";
import Enum from "@/js/enum/enum";
// import API from "@/js/resource/api";

export default {
  name: "LoginScreen",
  watch: {
    userName: function () {
      console.log(this.userName);
    },
  },
  methods: {
    /**
     * @description Ẩn/hiện mật khẩu
     * @author NVThinh 28/12/2022
     */
    toggle: function () {
      this.onEye = !this.onEye;
    },

    signIn: async function () {
      try {
        // Khởi tạo đối tượng user
        const user = {
          userName: this.userName,
          password: this.password,
        };
        // Gọi API
        await login(user).then((res) => {
          if (res.status === Enum.API.OK) {
            console.log(res.request);
            // this.$router.push(API.Path.asset);
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  data() {
    return {
      Resource, // tài nguyên import từ bên ngoài
      onEye: true, // Trạng thái ẩn/hiện mật khẩu
      userName: "", // Tên đăng nhập
      password: "", // Mật khẩu
    };
  },
};
</script>

<style scoped>
@import url(@/css/views/login.css);
@import url(@/css/base.css);

.button-login {
  margin-top: 20px;
}

#frmLogin {
  height: 100vh;
  color: #4f4f4f;
  margin: 0;
  line-height: 1.6;
  background-color: #fff;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.h-100 {
  height: 100% !important;
}

.w-100 {
  width: 100% !important;
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(@/assets/imgs/login-background.png);
}

.half-ctn {
  width: 50% !important;
  text-align: center;
}

#mainContent {
  padding: 0px !important;
}

.hide {
  display: none !important;
}

.main-login-ctn {
  margin: 40px;
}

#grid-login {
  width: 770px;
  display: flex;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  position: absolute;
  height: 560px;
}

.grid-login-normal {
  text-align: center;
}

.logo {
  margin: 0px auto;
  background-repeat: no-repeat;
  height: 60px;
  width: 100px;
  background-size: cover;
  background-image: url(@/assets/imgs/MISA-logo.png);
  background-size: contain;
}

.logo-text {
  text-align: center;
  font-size: 13px;
}

.login__img {
  background-image: url(@/assets/imgs/login-img.png);
  width: 100%;
  height: 100%;
}

.login {
  font-family: inherit;
  position: relative;
}

.input-login {
  width: 100%;
  height: 44px;
  padding: 0px 20px;
  margin-top: 16px;
  border-radius: 4px;
  outline: none;
  border: 1px solid #dadce0;
  font-size: 13px;
  box-sizing: border-box;
  background-color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-login:focus {
  border-radius: 4px;
  border: 1px solid #39c0ed;
}

::placeholder {
  color: #abadb1;
  font-size: 13px;
  font-style: normal;
}

.password-login {
  position: relative;
}

.eye {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 10px;
  top: 28px;
  background-repeat: no-repeat;
  cursor: pointer;
}

.on-eye {
  background-image: url(@/assets/imgs/Icon-qlts-update.svg);
  background-position: -64px -328px;
}

.off-eye {
  background-image: url(@/assets/imgs/Icon-qlts-update.svg);
  background-position: -19px -329px;
}

.button {
  width: 100%;
  height: 44px;
  border-radius: 4px;
  font-size: 16px !important;
  outline: none;
  border: none;
  background-color: #1a73e8;
  color: #fff;
  cursor: pointer;
}

.button:hover {
  background-image: none;
}

button:hover {
  color: white;
}

.copy-right {
  width: 200px;
  height: 14px;
  position: absolute;
  bottom: 29px;
  color: #000;
  left: calc(50% - 100px);
  text-align: center;
  color: #fff;
}

@media (max-width: 1366px) {
  #grid-login {
    width: 770px;
    display: flex;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.16);
    overflow: hidden;
    position: absolute;
    height: 560px;
  }

  .logo-text {
    text-align: center;
    font-size: 15px;
  }

  .logo {
    margin: 0px auto;
    background-repeat: no-repeat;
    height: 60px;
    width: 100px;
    background-size: cover;
    /* background-image: url("/src/img/Logo MISA_VN.svg"); */
    background-size: contain;
  }

  .copy-right {
    width: 200px;
    height: 14px;
    position: absolute;
    bottom: 9px;
    color: #000;
    left: calc(50% - 100px);
    text-align: center;
    color: #fff;
  }
}

@media (max-width: 1536px) {
  .copy-right {
    width: 200px;
    height: 14px;
    position: absolute;
    bottom: 15px;
    color: #000;
    left: calc(50% - 100px);
    text-align: center;
    color: #fff;
  }
}
</style>