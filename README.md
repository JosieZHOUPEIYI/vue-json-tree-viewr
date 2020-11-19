# vue-json-tree-viewr

简单易用的json内容展示组件，支持vue@2.0+，支持SSR，组件支持增量渲染即使大文件json也可以快速渲染

`vue-json-viewer`基础上二次开发的json可视化工具
新增功能：
* 1、鼠标移动背景高亮
* 2、点击事件，可获取路径path和值value
* 3、深度解析json字符串（当展示深度大于json字符串所在的深度时，也自动解析成json）


## 安装
使用 npm:
```
$ npm install @vue-json-tree-viewr
```

## 示例

``` html
<json-viewer :value="JSONData"></json-viewer>

<hr />

<json-viewer 
:value="JSONData" 
:deep="deep" 
@click="click" 
:jsonStringExpand="true" 
:highlightMouseoverNode='true'
></json-viewer>
```

``` js
import Vue from 'vue'
import JsonViewer from '@vue-json-tree-viewr'

// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)
or 
components: {JsonViewer}

new Vue({
  el: '#app',
  data() {
    return {
      jsonData: {
        total: 25,
        limit: 10,
        skip: 0,
        links: {
          previous: undefined,
          next: function () {},
        },
        data: [
          {
            id: '5968fcad629fa84ab65a5247',
            firstname: 'Ada',
            lastname: 'Lovelace',
            awards: null,
            known: [
              'mathematics',
              'computing'
            ],
            position: {
              lat: 44.563836,
              lng: 6.495139
            },
            bornAt: '1815-12-10T00:00:00.000Z',
            diedAt: '1852-11-27T00:00:00.000Z'
          }, {
            id: '5968fcad629fa84ab65a5246',
            firstname: 'Grace',
            lastname: 'Hopper',
            awards: [
              'Defense Distinguished Service Medal',
              'Legion of Merit',
              'Meritorious Service Medal',
            ],
          }
        ]
      }
    }
  }
})
```
### 支持SSR
``` js
import JsonViewer from '@vue-json-tree-viewr/ssr'

// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)
// or 
components: {JsonViewer}
```
and

``` js
import '@vue-json-tree-viewr/style.css'
```

## 选项

| 属性 | 描述 | 默认值 |
| ----------- |:------------- | ----------- |
| `value` | json对象的值，可以使用v-model，支持响应式 | **必填** |
| `deep` | 默认展开的层级 | `1`  |
| `copyable` | 展示复制按钮，默认文案为：copy、copied!, 你可以设置一个对象`{copyText: 'copy', copiedText: 'copied'}` 来自定义复制按钮文案 | `false`  |
| `sort` | 按照key排序展示 | `false` |
| `boxed` | 为组件添加一个盒样式 | `false` |
| `theme` | 添加一个自定义的样式class用作主题 | `jv-light` |
| `expanded` | 默认展开视图 | `false` |
| `timeformat` | 自定义时间格式函数 | time => time.toLocaleString() |
| `jsonStringExpand` | 如果value中存在json字符串，当属性`deep`大于json字符串所在的深度的时候是否深度展示该json字符串 | `false` |
| `highlightMouseoverNode` | 鼠标悬停时高亮显示当前节点 | `true` |

## 事件
| 属性 | 描述 | 回调参数 |
| ----------- |:------------- | ----------- |
| `click` | 节点被点击时的回调 | 共两个参数，`path`是当前节点的路径 ，`value`是当前节点的值 |

```
