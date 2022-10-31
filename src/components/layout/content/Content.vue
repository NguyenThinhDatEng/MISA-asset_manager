<template>
  <div class="content">
    <!-- Function bar  -->
    <FunctionBar></FunctionBar>
    <!-- Table  -->
    <div class="table">
      <table>
        <!-- Table columns -->
        <colgroup>
          <col style="min-width: 40px" />
          <!-- 1 -->
          <col style="min-width: 40px" />
          <!-- 2 -->
          <col />
          <!-- 3 -->
          <col style="min-width: 90px" />
          <!-- 4 -->
          <col style="min-width: 70px" />
          <!-- 5 -->
          <col style="min-width: 100px" />
          <!-- 6 -->
          <col style="min-width: 60px" />
          <!-- 7 -->
          <col />
          <!-- 8 -->
          <col style="min-width: 90px" />
          <!-- 9 -->
          <col style="min-width: 80px" />
          <!-- 10 -->
          <col style="width: 80px" />
          <!-- 11 -->
        </colgroup>
        <!-- Table Header  -->
        <thead>
          <tr>
            <th class="text-align_left checkbox__wrapper">
              <input id="checkbox-header" type="checkbox" class="checkbox" />
            </th>
            <th class="text-align_left" title="số thứ tự">STT</th>
            <th class="text-align_left">Mã tài sản</th>
            <th class="text-align_left">Tên tài sản</th>
            <th class="text-align_left">Loại tài sản</th>
            <th class="text-align_left">Bộ phận sử dụng</th>
            <th class="text-align_right">Số lượng</th>
            <th class="text-align_right">Nguyên giá</th>
            <th id="HMKH" class="text-align_right">HM/KH lũy kế</th>
            <th class="text-align_right">Giá trị còn lại</th>
            <th class="text-alin_center">Chức năng</th>
          </tr>
        </thead>
        <!-- Table body  -->
        <tbody hidden>
          <!-- Records  -->
          <!-- Row 01 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">1</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell inspiron 3467</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">1</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>894000</td>
            <td class="text-align_right" money>19106000</td>
            <td>
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 02 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">2</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Máy tính xách tay Fujitsu</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng tài chính tổng hợp</td>
            <td class="text-align_right">20</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 03 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">3</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell Latitude E 5450</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">4</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 01 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">1</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell inspiron 3467</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">1</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>894000</td>
            <td class="text-align_right" money>19106000</td>
            <td>
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 02 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">2</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Máy tính xách tay Fujitsu</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng tài chính tổng hợp</td>
            <td class="text-align_right">20</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 03 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">3</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell Latitude E 5450</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">4</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 01 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">1</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell inspiron 3467</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">1</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>894000</td>
            <td class="text-align_right" money>19106000</td>
            <td>
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 02 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">2</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Máy tính xách tay Fujitsu</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng tài chính tổng hợp</td>
            <td class="text-align_right">20</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 03 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">3</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell Latitude E 5450</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">4</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 01 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">1</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell inspiron 3467</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">1</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>894000</td>
            <td class="text-align_right" money>19106000</td>
            <td>
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 02 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">2</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Máy tính xách tay Fujitsu</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng tài chính tổng hợp</td>
            <td class="text-align_right">20</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 03 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">3</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell Latitude E 5450</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">4</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 01 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">1</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell inspiron 3467</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">1</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>894000</td>
            <td class="text-align_right" money>19106000</td>
            <td>
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 02 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">2</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Máy tính xách tay Fujitsu</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng tài chính tổng hợp</td>
            <td class="text-align_right">20</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 03 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">3</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell Latitude E 5450</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">4</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 01 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">1</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell inspiron 3467</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">1</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>894000</td>
            <td class="text-align_right" money>19106000</td>
            <td>
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 02 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">2</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Máy tính xách tay Fujitsu</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng tài chính tổng hợp</td>
            <td class="text-align_right">20</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Row 03 -->
          <tr>
            <td class="checkbox__wrapper">
              <input type="checkbox" class="checkbox" />
            </td>
            <td class="text-align_center STT">3</td>
            <td>55H7WB72/2022</td>
            <td class="td--asset-name td">Dell Latitude E 5450</td>
            <td class="td--asset-type td">Máy vi tính xách tay</td>
            <td class="td--department td">Phòng hành chính kế toán</td>
            <td class="text-align_right">4</td>
            <td class="text-align_right" money>20000000</td>
            <td class="text-align_right" money>1225000</td>
            <td class="text-align_right" money>19730000</td>
            <td class="data--feature">
              <div class="feature">
                <div class="icon icon-table icon_edit"></div>
                <div class="icon icon-table icon_duplicate"></div>
              </div>
            </td>
          </tr>
          <!-- Table footer  -->
        </tbody>

        <tfoot class="table__footer" hidden>
          <tr>
            <td colspan="6">
              <div class="footer__left">
                <div class="total-of-records__wrapper">
                  <p class="total-of-records">Tổng số: <b>200</b> bản ghi</p>
                </div>
                <!-- Combobox: Limit of records  -->
                <div
                  id="combobox--limit"
                  class="combobox"
                  title="Giới hạn số lượng bản ghi"
                >
                  <input
                    type="text"
                    class="input combobox__input"
                    value="20"
                    readonly="true"
                  />
                  <div class="combobox__button">
                    <div class="icon center icon_down"></div>
                  </div>
                  <div id="combobox__data--limit" class="combobox__data" hidden>
                    <div class="data">10</div>
                    <div class="data">20</div>
                    <div class="data">30</div>
                  </div>
                </div>
                <!-- Paging  -->
                <div class="paging">
                  <div class="paging__icon--wrapper">
                    <div class="icon center icon-footer icon_left-arrow"></div>
                  </div>
                  <div class="page-numbers">
                    <button class="number" value="1">1</button>
                    <button class="number" value="2">2</button>
                    <span class="number" value="">...</span>
                    <button class="number" value="10">10</button>
                  </div>
                  <div class="paging__icon--wrapper">
                    <div class="icon center icon-footer icon_right-arrow"></div>
                  </div>
                </div>
              </div>
            </td>
            <td style="font-family: MISA Bold" class="text-align_right">13</td>
            <td style="font-family: MISA Bold" class="text-align_right">
              249000000
            </td>
            <td style="font-family: MISA Bold" class="text-align_right">
              19716000
            </td>
            <td style="font-family: MISA Bold" class="text-align_right">
              229284000
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import FunctionBar from "./function-bar/FunctionBar.vue";
export default {
  name: "TheContent",
  created() {},
  components: { FunctionBar },
  props: {},
  emits: [],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url(@/css/base.css);
</style>