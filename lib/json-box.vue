<script>
import JsonString from "./types/json-string";
import JsonUndefined from "./types/json-undefined";
import JsonNumber from "./types/json-number";
import JsonBoolean from "./types/json-boolean";
import JsonObject from "./types/json-object";
import JsonArray from "./types/json-array";
import JsonFunction from "./types/json-function";
import JsonDate from "./types/json-date";
import { debounce } from "./utils.js";

export default {
  name: "JsonBox",
  inject: ["clickEvent"],
  props: {
    value: {
      type: [Object, Array, String, Number, Boolean, Function, Date],
      default: null,
    },
    keyName: {
      type: String,
      default: "",
    },
    sort: Boolean,
    depth: {
      type: Number,
      default: 0,
    },
    deep: {
      type: Number,
      default: 0,
    },
    parentJsonString: {
      type: String,
      default: "",
    },
    jsonStringExpand:Boolean,
    highlightMouseoverNode:Boolean,
  },
  data() {
    return {
      expand: true,
      itemValue:this.value,
      isMouseover:false,
    };
  },
  watch: {
    value(newVal) {
      this.itemValue = newVal
    },
    deep(val){
      this.expand = this.depth >= this.deep ? false : true
    }
  },
  mounted() {
    this.expand = this.depth >= this.deep ? false : true
    this.mousehendel = this.highlightMouseoverNode && this.highlightMouseoverNode && debounce(this.mouseHendel.bind(this),50);
  },
  methods: {
    toggle() {
      this.expand = !this.expand;
      try {
        this.$el.dispatchEvent(new Event("resized"));
      } catch (e) {
        // handle IE not supporting Event constructor
        var evt = document.createEvent("Event");
        evt.initEvent("resized", true, false);
        this.$el.dispatchEvent(evt);
      }
    },
    mouseHendel(flag = true){
      this.$nextTick(() => {
        this.isMouseover = flag
      })
    }
  },
  render(h) {
    let elements = [];
    let dataType;

    if (this.itemValue === null || this.itemValue === undefined) {
      dataType = JsonUndefined;
    } else if (Array.isArray(this.itemValue)) {
      dataType = JsonArray;
    } else if (Object.prototype.toString.call(this.itemValue) === "[object Date]") {
      dataType = JsonDate;
    } else if (typeof this.itemValue === "object") {
      dataType = JsonObject;
    } else if (typeof this.itemValue === "number") {
      dataType = JsonNumber;
    } else if (typeof this.itemValue === "string") {
      dataType = JsonString;
    } else if (typeof this.itemValue === "boolean") {
      dataType = JsonBoolean;
    } else if (typeof this.itemValue === "function") {
      dataType = JsonFunction;
    }
    const toggle =
      this.keyName &&
      this.itemValue &&
      (Array.isArray(this.itemValue) ||
        (typeof this.itemValue === "object" &&
          Object.prototype.toString.call(this.itemValue) !== "[object Date]"));

    if (toggle) {
      elements.push(
        h("span", {
          class: {
            "jv-toggle": true,
            open: !!this.expand,
          },
          on: {
            click: this.toggle,
          },
        })
      );
    }

    if (this.keyName) {
      elements.push(
        h("span", {
          class: {
            "jv-key": true,
          },
          domProps: {
            innerText: `${this.keyName}:`,
          },
        })
      );
    }

    elements.push(
      h(dataType, {
        class: {
          "jv-push": true,
        },
        props: {
          jsonValue: this.itemValue,
          keyName: this.keyName,
          sort: this.sort,
          depth: this.depth,
          expand: this.expand,
          parentJsonString: this.parentJsonString,
          jsonStringExpand: this.jsonStringExpand,
          highlightMouseoverNode:this.highlightMouseoverNode,
          deep:this.deep
        },
        on: {
          "update:expand": (value) => {
            this.expand = value;
          },
          "expandJson":(value)=>{
            this.itemValue = value
          }
        },
      })
    );

    return h(
      "div",
      {
        class: {
          "jv-node": true,
          "toggle": toggle,
          'is-mouseover': this.isMouseover,
          "leftline":!!this.expand && toggle
        },
        on: {
          click: (e) => {
            e.stopPropagation();
            // e.preventDefault();
            this.clickEvent(this.parentJsonString, this.itemValue);
          },
          mouseover:(e)=>{
            e.stopPropagation()
            e.preventDefault()
            this.highlightMouseoverNode && this.mousehendel(true)
          },
          mouseout:(e)=>{
            e.stopPropagation()
            e.preventDefault()
            this.highlightMouseoverNode && this.mousehendel(false)
          }
        },
      },
      elements
    );
  },
};
</script>

<style lang="scss">
.jv-node {
  position: relative;
  &:after {
    content: ",";
  }
  &:last-of-type {
    &:after {
      content: "";
    }
  }

  &.toggle {
    margin-left: 13px !important;
  }
  & .leftline {
    border-left: 1px dashed #ccc;
  }
  & .jv-node {
    margin-left: 25px;
  }
  & .is-mouseover{
    background-color: #e6f7ff;
  }
}
</style>
