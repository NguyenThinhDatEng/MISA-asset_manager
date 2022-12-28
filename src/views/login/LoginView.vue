<template>
  <!-- background -->
  <div id="frmLogin">
    <!-- Main -->
    <div class="h-100 w-100 main">
      <!-- Form -->
      <div class="" id="grid-login">
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
              {{ Resource.QLTS.login }}<b>{{ Resource.QLTS.logo }}</b>
            </div>
            <!-- Inputs -->
            <div id="normal-login">
              <div class="grid-login-normal">
                <!-- user name -->
                <div class="username-login login">
                  <input
                    id="iptUserName"
                    class="input-login"
                    placeholder="Username, email hoặc số điện thoại"
                  />
                </div>
                <!-- password -->
                <div class="password-login login">
                  <input
                    id="iptPassword"
                    type="password"
                    placeholder="Mật khẩu"
                    class="input-login"
                  />
                  <div class="eye on-eye"></div>
                </div>
                <!-- sign in button -->
                <div class="button-login" style="margin-top: 20px">
                  <button class="button" id="login" style="">Đăng nhập</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-right">Copyright © 2020 MISA JSC</div>
  </div>
</template>

<script>
import Resource from "@/js/resource/resource";
export default {
  name: "LoginScreen",
  data() {
    return {
      Resource,
    };
  },
};
</script>

<style scoped>
@import url(@/css/views/login.css);
@import url(@/css/base.css);

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

#province-input {
  margin-top: 4px;
}

#province-icon {
  top: 18px;
}

.ctn-login-recently {
  margin-bottom: 16px;
  height: 60px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.16);
  display: flex;
  position: relative;
  cursor: pointer;
}

.ctn-img-user {
  width: 60px;
  height: 60px;
  text-align: center;
}

.img-user {
  height: 40px;
  width: 40px;
  margin: 9px;
}

.custom-user-logo {
  height: 60px;
  width: 60px;
  margin: 16px;
}

.user-image {
  background-size: contain;
  /* background-image: url("../../../img/ic_UserIcon.svg");  */
}

.main-user-info {
  width: calc(100% - 80px);
  padding-right: 20px;
  align-self: center;
}

.fullName {
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.organizationName {
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #7b7b7c;
}

.icon-delete {
  width: 20px;
  height: 20px;
  position: absolute;
  background-repeat: no-repeat;
  cursor: pointer;
  right: 10px;
  top: 21px;
  /* background-image: url("../../../img/Icon-qlts-update.svg"); */
  background-position-x: -1122px;
  background-position-y: -66px;
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
  font-size: 14px;
  font-style: normal;
}

.active {
  border-radius: 4px;
  border: 1px solid #39c0ed;
}

.forgot-password {
  font-size: 15px;
  color: #1a73e8;
  text-decoration: none;
  margin-top: 20px;
  cursor: pointer;
}

.notify-form {
  width: 400px;
  background: white;
  border-radius: 0.25rem;
  padding: 1rem;
  padding-top: 1.5rem;
  font-weight: 400;
  color: black;
  font-size: 15px;
  margin: auto;
}

.notify-icon {
  /* background-image: url("../../../img/QLTS-icon-2.svg"); */
  background-position-x: -605px;
  background-position-y: -24px;
  width: 52px;
  height: 40px;
}

.change-success {
  /* background-image: url("../../../img/QLTS-icon-2.svg"); */
  background-position-x: -535px;
  background-position-y: -24px;
  width: 42px;
  height: 40px;
}

.close-notify:active {
  border: none;
}

.close-notify:focus {
  border: none;
}

.notify-text {
  margin-left: 20px;
}

.notify-body {
  display: flex;
}

.close-notify {
  vertical-align: bottom;
  border: 0;
  font-weight: 500;
  padding: 0.625rem 1.8rem 0.5rem 1.8rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #fff;
  border-radius: 4px;
  background-color: #1aa4c8;
  margin-left: auto;
  cursor: pointer;
}

.notify-footer {
  margin-top: 10px;
  display: flex;
}

.reload-capcha {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 120px;
  top: 28px;
  background-size: 450px;
  background-repeat: no-repeat;
  cursor: pointer;
  /* background-image: url("../../../img/qlts-icon.svg"); */
  background-position: -95px -56px;
}

.password-login {
  position: relative;
}
/*popup thông báo*/
#popupLogin {
  border-radius: 22.5px;
  width: 350px;
  height: 46px;
  color: #fff;
  margin-top: 16px;
  overflow-wrap: break-word;
  text-align: center;
  background-color: #ffa900;
  font-size: 14px;
  font-family: Roboto;
  line-height: 46px;
}

.select-label {
  padding-top: 0.4rem;
}

.form-control {
  height: 40px;
}

.select-arrow {
  top: 10px;
}

.copy-right {
  width: 200px;
  height: 14px;
  position: absolute;
  bottom: 29px;
  color: #000;
  font-size: 12px !important;
  left: calc(50% - 100px);
  text-align: center;
  color: #fff;
  font-family: "roboto-regular";
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
  /* background-image: url("../../../img/Icon-qlts-update.svg"); */
  background-position: -65px -329px;
}

.off-eye {
  background-size: 450px;
  /* background-image: url("../../../img/qlts-icon.svg"); */
  background-position: -17px -331px;
}

.login {
  font-family: inherit;
  position: relative;
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

.chart-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background-color: rgba(1, 1, 0, 0.2);
}

.chart-loading .mask-item {
  width: 64px;
  height: 64px;
  background-size: cover;
  display: inline-block;
  border: 3px solid #fff;
  border-radius: 50%;
  border-top-color: #2ea4f1;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
  margin: 0 auto;
  position: absolute;
  z-index: 99999999;
}

.icon {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 30px;
  background-repeat: no-repeat;
  cursor: pointer;
}

.icon-dropdown-up {
  /* background-image: url("../../../img/Icon-qlts-update.svg"); */
  background-position-x: -814px;
  background-position-y: -67px;
}

.icon-dropdown-down {
  /* background-image: url("../../../img/Icon-qlts-update.svg"); */
  background-position-x: -858px;
  background-position-y: -67px;
}

.dropdown {
  width: 300px;
  max-height: 250px;
  min-height: 44px;
  position: absolute;
  background-color: #fff;
  overflow: auto;
  z-index: 3;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.16);
  padding-top: 14px;
  padding-bottom: 14px;
  position: fixed;
}

.province-dropdown {
  display: none;
}

.orga-dropdown {
  display: none;
  width: 450px !important;
}

.show {
  display: block !important;
}

.custom-dropdown-item {
  font-size: 13px;
  line-height: 44px;
  padding-left: 20px;
  padding-right: 10px;
  /*align-items: center;*/
  /*display: flex;*/
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-dropdown-item:hover {
  background-color: #c4c4c44d;
  cursor: pointer;
}

.dropdown-item-active {
  background-color: #209fc633 !important;
}

.mask-login {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999998;
  display: none;
}

.loader-login {
  z-index: 999999;
  color: #39c0ed;
  font-size: 8px;
  top: 50%;
  left: 50%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.5s infinite linear;
  animation: load4 1.5s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.loader {
  color: #39c0ed;
  font-size: 6px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.5s infinite linear;
  animation: load4 1.5s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }

  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }

  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }

  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }

  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }

  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }

  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }

  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }

  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }

  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }

  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }

  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }

  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }

  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }

  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 1366px) {
  #grid-login {
    width: 770px;
    display: flex;
    /*align-items: center;*/
    /*flex-direction: column;*/
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
    /*margin: 12px auto;*/
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
    font-size: 12px !important;
    left: calc(50% - 100px);
    text-align: center;
    color: #fff;
    font-family: "roboto-regular";
  }
}

@media (max-width: 1536px) {
  .copy-right {
    width: 200px;
    height: 14px;
    position: absolute;
    bottom: 15px;
    color: #000;
    font-size: 12px !important;
    left: calc(50% - 100px);
    text-align: center;
    color: #fff;
    font-family: "roboto-regular";
  }
}

/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -150px;
  background-color: #f65335;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 6px 20px;
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 30px;
  font-size: 14px;
}

#snackbar.show {
  visibility: visible;
}
</style>