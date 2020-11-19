<template>
  <div>
    展示深度:
    <el-input-number v-model="deep" :min="1" :max="10" label />
    <br />jsonString：
    <el-input v-model="value" type="textarea" :rows="3" placeholder="请输入json字符串" />
    <div class="errorText">{{ errorText }}</div>
    <json-viewer
      :value="JSONData"
      :deep="deep"
      :json-string-expand="true"
      :highlight-mouseover-node="true"
      @click="click"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      JSONData: {
        category_info: {
          base_info: {
            name: "小程序",
            search_interface_info: "",
            screen_item_info: "",
          },
          deleted: false,
        },
        field_info: {
          func_type: 1221,
          field_info_list: [
            {
              type: "INT UNSIGNED",
              name: "audit_id",
              click_events: '{"type":"0"}',
              data_type_info: '{"type":1}',
              fe_field:
                '{"is_visible":true,"is_list":false,"search_location":{"row":1,"col":0},"location":{"row":0,"col":1},"data_type_info":{"type":1,"show_info":[]},"click_events":{"type":0}}',
              data_source: 0,
              db_type: "DB_MYSQL",
            },
          ],
        },
        bornAt: new Date("1815-12-10T00:00:00.000Z"),
        diedAt: new Date("1852-11-27T00:00:00.000Z"),
        link: "http://google.com",
        position: {
          lat: 43.614624,
          lng: 3.879995,
        },
        receive_wait_num: "0",
        total_wait_num: "129",
      },
      deep: 2,
      errorText: "",
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal.trim() !== "") this.showJson(newVal);
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    click: (...arg) => {
      console.log("test.....", ...arg);
    },
    showJson(newVal) {
      let newData = newVal;
      try {
        this.errorText = "";
        this.JSONData = newData && newData.length > 0 && JSON.parse(newData);
      } catch (err) {
        try {
          this.errorText = "";
          newData = this.evil(`"${newData}"`);
          this.JSONData = newData && newData.length > 0 && JSON.parse(newData);
        } catch (e) {
          this.errorText = err;
          this.data = "";
          throw Error(err);
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.errorText {
  color: red;
}
</style>