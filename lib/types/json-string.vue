<script>
import { isJsonString } from '../utils';
const REG_LINK = /^\w+:\/\//;

export default {
  name: "JsonString",
  functional: true,
  render(h,{listeners,parent}) {
    let value = parent.itemValue;
    const islink = REG_LINK.test(value);
    let domProps;
    if (islink) {
      value = `<a href="${value}" target="_blank" style="color: #0366d6;">${value}</a>`;
      domProps = {
        innerHTML: `"${value.toString()}"`,
      };
    } else {
      const deepJsonShow = parent.depth < parent.deep;//深度展示json字符串
      if(parent.jsonStringExpand && deepJsonShow){
          const isJson = isJsonString(value)
          if(!!isJson){
            listeners.expandJson(isJson)
            return 
          }
      }
      domProps = {
        innerText: `"${value.toString()}"`,
      };
      
    }

    return h("span", {
      class: {
        "jv-item": true,
        "jv-string": true,
      },
      domProps: {
        ...domProps,
      },
    });
  },
};
</script>
