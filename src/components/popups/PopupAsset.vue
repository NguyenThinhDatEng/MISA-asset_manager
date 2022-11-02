<template>
  <div id="popup--add" class="popup-wrapper" v-if="!isHidden">
    <div class="center popup">
      <!-- Popup Header -->
      <div class="popup__header">
        <span>Title...</span>
        <button class="icon icon-18px icon--close"></button>
      </div>
      <!-- Popup body  -->
      <div class="popup__body">
        <!-- Row 01: Ma tai san & Ten tai san -->
        <div class="input-row">
          <div class="popup__body--left">
            <span mandatory>Mã tài sản <span style="color: red">*</span></span>
            <input
              type="text"
              class="input"
              mandatory
              id="asset-code"
              maxlength="15"
            />
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <span mandatory>Tên tài sản <span style="color: red">*</span></span>
            <input
              type="text"
              class="input"
              placeholder="Nhập tên tài sản"
              id="input--asset-name"
              maxlength="70"
            />
            <p class="error-message"></p>
          </div>
        </div>
        <!-- Row 02: Ma bo phan su dung & Ten bo phan su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <span mandatory
              >Mã bộ phận sử dụng <span style="color: red">*</span></span
            >
            <div id="combobox--departmentID" class="combobox combobox--checked">
              <input
                type="text"
                class="input combobox__input"
                placeholder="Chọn mã bộ phận sử dụng"
                id="input--departmentID"
                maxlength="20"
              />
              <div class="combobox__button">
                <div class="icon center icon_down"></div>
              </div>
              <div class="combobox__data" hidden>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Hello there</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Hi there</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Good morning</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Good afternoon</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Good evening</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>What's up</p>
                </div>
              </div>
            </div>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <span>Tên bộ phận sử dụng</span>
            <input type="text" class="input input--disabled" disabled />
          </div>
        </div>
        <!-- Row 03: Ma loai tai san & Ten loai tai san-->
        <div class="input-row">
          <div class="popup__body--left">
            <span mandatory
              >Mã loại tài sản <span style="color: red">*</span></span
            >
            <div id="combobox--assetTypeID" class="combobox combobox--checked">
              <input
                type="text"
                class="input combobox__input"
                placeholder="Chọn mã loại tài sản"
                id="input--asset-typeID"
              />
              <div class="combobox__button">
                <div class="icon center icon_down"></div>
              </div>
              <div class="combobox__data" hidden>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Hello there</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Hi there</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Good morning</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Good afternoon</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>Good evening</p>
                </div>
                <div class="data">
                  <div class="icon__wrapper">
                    <div class="icon center icon--check"></div>
                  </div>
                  <p>What's up</p>
                </div>
              </div>
            </div>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <span>Tên loại tài sản</span>
            <input type="text" class="input input--disabled" disabled />
          </div>
        </div>
        <!-- Row 04: So luong & Nguyen gia & So nam su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <span>Số lượng <span style="color: red">*</span></span>
            <div id="quantity" class="input--quantity">
              <input type="number" class="input" id="input--quantity" />
              <div class="icon_up_down">
                <div id="quantity--up" class="icon icon_up"></div>
                <div id="quantity--down" class="icon icon_down"></div>
              </div>
            </div>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <span mandatory
                  >Nguyên giá <span style="color: red">*</span></span
                >
                <input
                  type="number"
                  class="input text-align_right"
                  placeholder="0"
                  id="input--price"
                />
                <p class="error-message"></p>
              </div>
              <div class="popup__body--right-child">
                <span mandatory
                  >Số năm sử dụng <span style="color: red">*</span></span
                >
                <input
                  type="number"
                  class="input text-align_right"
                  placeholder="0"
                  id="input--years-use"
                />
                <p class="error-message"></p>
              </div>
            </div>
          </div>
        </div>
        <!-- Row 05: Ti le hao mon & Gia tri hao mon nam & Nam theo doi -->
        <div class="input-row">
          <div class="popup__body--left">
            <span mandatory
              >Tỉ lệ hao mòn (%) <span style="color: red">*</span></span
            >
            <div id="scale" class="input--quantity">
              <input type="number" class="input" value="0" maxlength="3" />
              <div class="icon_up_down">
                <div id="scale--up" class="icon icon_up"></div>
                <div id="scale--down" class="icon icon_down"></div>
              </div>
            </div>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <span mandatory
                  >Giá trị hao mòn năm <span style="color: red">*</span></span
                >
                <input
                  type="number"
                  class="input text-align_right"
                  placeholder="0"
                  id="input--amortization"
                />
                <p class="error-message"></p>
              </div>
              <div id="year-tracking" class="popup__body--right-child">
                <span mandatory>Năm theo dõi</span>
                <input
                  type="number"
                  class="input text-align_right input--disabled"
                  value="2021"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Row 06: Ngay mua & Ngay bat dau su dung -->
        <div class="input-row">
          <div class="popup__body--left">
            <span mandatory>Ngày mua <span style="color: red">*</span></span>
            <div class="popup-date">
              <input type="date" class="input" />
              <button class="button--icon__wrapper">
                <div class="icon icon-item center icon_calendar"></div>
              </button>
            </div>
            <p class="error-message"></p>
          </div>
          <div class="popup__body--right">
            <div class="input-row">
              <div class="popup__body--left">
                <span mandatory
                  >Ngày bắt đầu sử dụng <span style="color: red">*</span></span
                >
                <div class="popup-date">
                  <input type="date" class="input" value="2022-10-12" />
                  <button
                    class="button--icon__wrapper"
                    onclick="this.showPicker()"
                  >
                    <div class="icon icon-item center icon_calendar"></div>
                  </button>
                </div>
                <p class="error-message"></p>
              </div>
              <div class="popup__body--right-child"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Popup footer  -->
      <div class="popup__footer">
        <button class="button button--save">Lưu</button>
        <button class="button button--cancel">Hủy</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupAsset",
  created() {},
  components: {},
  props: {},
  emits: [],
  methods: { isHidden: Boolean },
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>