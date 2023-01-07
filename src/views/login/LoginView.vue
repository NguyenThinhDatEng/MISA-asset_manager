<template>
  <!-- background -->
  <div id="frmLogin">
    <LoaderVue :is-show="isShowLoader" />
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
                  <InputVue
                    :has-label="false"
                    :isLogin="true"
                    :labelContent="data.account.placeholder"
                    :placeholder="data.account.placeholder"
                    :field="fields.account"
                    :isError="data.account.isError"
                    :type="Enum.DataType.Text"
                    @update-input="updateInput"
                  />
                </div>
                <!-- password -->
                <InputVue
                  :has-label="false"
                  :isLogin="true"
                  :is-password="true"
                  :labelContent="data.password.placeholder"
                  :placeholder="data.password.placeholder"
                  :field="fields.password"
                  :type="Enum.DataType.Text"
                  :isError="data.password.isError"
                  @update-input="updateInput"
                ></InputVue>
                <!-- login button -->
                <div class="button-login">
                  <button
                    class="button"
                    id="login"
                    @click="handleOnClickButton"
                    @keydown.enter="handleOnClickButton"
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
  <!-- Toast -->
  <ToastVue
    v-if="toast.isShow"
    :action-status="Enum.ActionStatus.Error"
    :content="toast.content"
  ></ToastVue>
</template>

<script>
// Resources
import Resource from "@/js/resource/resource";
import { login } from "@/apis/user";
import Enum from "@/js/enum/enum";
// Components
import InputVue from "@/components/base/inputs/Input.vue";
import ToastVue from "@/components/base/toast/ToastVue.vue";
import LoaderVue from "@/components/base/more/Loader.vue";

export default {
  name: "LoginScreen",
  components: {
    InputVue,
    ToastVue,
    LoaderVue,
  },

  methods: {
    /**
     * @description API đăng nhập
     * @author NVThinh 4/1/2022
     */
    signIn: async function () {
      try {
        // Khởi tạo đối tượng user
        const user = {
          userName: this.data.account.value,
          password: this.data.password.value,
        };
        // Hiển thị loader
        this.openLoader();
        // Gọi API
        await login(user).then(() => {
          // Ẩn toast
          this.closeLoader();
          // Chuyển sang trang danh sách tài sản cố định
          this.$router.push(Resource.ItemContents.asset.router);
        });
      } catch (error) {
        // Ẩn toast
        this.closeLoader();
        this.toast.content = error.response
          ? Resource.ToastContent.Login
          : Resource.ToastContent.Error;
        console.log(error);
        // Hiển thị toast thông báo
        this.openToast();
      }
    },

    /**
     * @description Cập nhật dữ liệu nhận được từ component con (Input)
     * @param {String} value giá trị ô input được cập nhật
     * @param {String} field trường dữ liệu
     * @author NVThinh 04/01/2023
     */
    updateInput: function (value, field) {
      try {
        // Cập nhật giá trị ô input
        this.data[field].value = value;
        // Loại bỏ hiện thị báo lỗi
        this.data[field].isError = false;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Xử lý sự kiện khi ấn vào nút đăng nhập
     * @author NVThinh 4/1/2023
     */
    handleOnClickButton: function () {
      try {
        // Kiểm tra các trường yêu cầu nhập
        for (const key in this.fields) {
          if (!this.data[key].value) {
            this.data[key].isError = true;
          }
        }
        // Call API đăng nhập
        if (!this.data.account.isError && !this.data.password.isError) {
          this.signIn();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * @description Ẩn toast
     * @author NVThinh 4/1/2023
     */
    closeToast: function () {
      this.toast.isShow = false;
    },

    /**
     * @description Hiển thị toast
     * @author NVThinh 5/1/2023
     */
    openToast: function () {
      this.toast.isShow = true;
    },

    /**
     * @description Ẩn Loader
     * @author NVThinh 4/1/2023
     */
    closeLoader: function () {
      this.isShowLoader = false;
    },

    /**
     * @description Hiển thị Loader
     * @author NVThinh 5/1/2023
     */
    openLoader: function () {
      this.isShowLoader = true;
    },
  },

  data() {
    return {
      // Dữ liệu bao gồm tài khoản và mật khẩu
      data: {
        account: {
          placeholder: "Tên đăng nhập",
          value: "",
          isError: false,
        },
        password: {
          placeholder: "Mật khẩu",
          value: "",
          isError: false,
        },
      },
      // Toast
      toast: {
        isShow: false, // Ẩn/hiện toast
        content: "", // Nội dung hiển thị
      },
      // Loader
      isShowLoader: false,
      // Resources
      Resource,
      Enum,
      // Các trường dữ liệu
      fields: {
        account: "account",
        password: "password",
      },
    };
  },
};
</script>

<style scoped>
@import url(@/css/views/login.css);
@import url(@/css/base.css);
@import url(@/css/components/button.css);

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
  position: relative;
  padding-bottom: 8px;
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

.button {
  width: 100%;
  height: 44px;
  border-radius: 4px;
  margin-top: 4px;
  font-size: 16px !important;
  outline: none;
  border: none;
  background-color: #1a73e8;
  color: #fff;
  cursor: pointer;
}

.button:focus {
  border: 2px solid var(--border--focus);
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
</style>