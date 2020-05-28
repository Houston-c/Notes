<template>
  <div
    class="vl-notify vl-notify-main vl-notify-iframe"
    :class="cls"
    @mousemove="move"
    @mouseup="moveEnd"
    @focus="resetZIndex"
    tabindex="1"
    :id="options.id"
    :style="getBaseStyle"
  >
    <h2 class="vl-notice-title" @mousedown="moveStart">
      <span v-html="options.title" class="lv-title"></span>
      <template v-if="options.maxmin == true">
        <span class="lv-icon-maxmini">
          <template v-if="maxMiniState === 0">
            <i class="iconfont icon-zuixiaohua4-copy" @click="mini"></i>
            <i class="iconfont icon-quanping" @click="max"></i>
          </template>
          <template v-else-if="maxMiniState === 1">
            <i class="iconfont icon-huanyuan" @click="maxmini"></i>
          </template>
          <template v-else-if="maxMiniState === 2">
            <i class="iconfont icon-huanyuan" @click="maxmini"></i>
          </template>
        </span>
      </template>
      <i class="close-layer iconfont icon-fa-remove" @click="close"></i>
    </h2>
    <slot></slot>
    <span
      class="vl-drag-resize"
      @mousedown="resizeHand"
      @mouseup="resizeHandMoveEnd"
      v-if="options.resize"
    ></span>
  </div>
</template>
<script>
  import helper from "../../helper/helper.js";

  export default {
    data() {
      return {
        moveLeft: 0, //左移的距离
        moveTop: 0, //上移的距离
        offsetTop: 0,
        offsetLeft: 0,
        ismove: false,
        id: "vlip" + new Date().getTime(),
        zindex: 1,
        addStyle: {},
        maxMiniState: 0, //0normal,1mini,2max
        resize: {
          isResize: false,
          oWidth: 0,
          oHeight: 0,
          moveLeft: 0,
          moveTop: 0,
          tt: {}
        }
      };
    },
    props: {
      options: {
        type: Object,
        default: function () {
          return {};
        }
      },
      cls: {
        type: Object,
        default: function () {
          return {
            "vl-notify-alert": true
          };
        }
      }
    },
    async mounted() {
      if (this.options.shade) {
        await helper.sleep(20);
        //是否显示遮罩
        document
          .getElementsByClassName("vl-notify-mask")[0]
          .addEventListener("mousemove", event => {
            this.move(event);
          });
        document
          .getElementsByClassName("vl-notify-mask")[0]
          .addEventListener("mouseup", event => {
            this.moveEnd(event);
          });
      } else {
        document.addEventListener("mousemove", event => {
          this.move(event);
        });
        document.addEventListener("mouseup", event => {
          this.moveEnd(event);
        });
      }
      this.resetZIndex();
    },
    computed: {
      getBaseStyle() {
        //获取z-index
        this.resetZIndex();
        const op = this.options;
        let styleBase
        if (op.left && op.top) {
          styleBase = {
            left: op.left + "px",
            top: op.top + "px",
            margin: op.offset[2],
            zIndex: this.zindex,
            width: op.area[0],
            height: op.area[1]
          };
        } else if (op.left && op.bottom) {
          styleBase = {
            left: op.left + "px",
            bottom: op.bottom + "px",
            margin: op.offset[2],
            zIndex: this.zindex,
            width: op.area[0],
            height: op.area[1]
          };
        } else if (op.right && op.top) {
          styleBase = {
            top: op.top + "px",
            right: op.right + "px",
            margin: op.offset[2],
            zIndex: this.zindex,
            width: op.area[0],
            height: op.area[1]
          };
        } else if (op.right && op.bottom) {
          styleBase = {
            right: op.right + "px",
            bottom: op.bottom + "px",
            margin: op.offset[2],
            zIndex: this.zindex,
            width: op.area[0],
            height: op.area[1]
          };
        }
        let a = helper.deepClone(styleBase);
        return this.mergeJson(a, this.addStyle);
      }
    },
    methods: {
      mergeJson(options, def) {
        for (let key in def) {
          options[key] = def[key];
        }
        return options;
      },
      getStyle(el, styleProp) {
        let x = document.getElementById(el);
        let y = 0;
        if (window.getComputedStyle) {
          y = document.defaultView
            .getComputedStyle(x, null)
            .getPropertyValue(styleProp);
        } else if (x.currentStyle) {
          y = x.currentStyle[styleProp];
        }
        return y;
      },
      resetZIndex() {
        let max = 500;
        let keys = Object.keys(this.cls);
        let doms = document.querySelectorAll("." + keys[0]); //vl-notify-iframe
        let domZindex = 0;
        for (let i = 0, len = doms.length; i < len; i++) {
          let value = parseInt(this.getStyle(doms[i].id, "z-index"));
          if (this.options.id == doms[i].id) {
            domZindex = value;
          }
          if (max < value) {
            max = value;
          }
        }
        if (domZindex == max && max != 500) {
          return;
        }
        //预留遮罩层z-index
        this.zindex = max + 2;
      },
      async close(event) {
        await helper.btncancel(event, this.options);
        helper.clickMaskCloseAll(event, this.options.layer, this.options.id);
      },
      mini() {
        //最小化窗口
        this.addStyle = {
          overflow: "hidden",
          bottom: 0,
          left: "130px",
          width: "100px",
          height: "40px",
          minHeight: "40px",
          top: "auto"
        };
        this.maxMiniState = 1;
      },
      max() {
        //最大化窗口
        let height = document.documentElement.clientHeight;
        if (height % 2 === 1) {
          height += 1;
        }
        this.addStyle = {
          overflow: "hidden",
          left: "0px",
          top: "0px",
          right: "0px",
          bottom: "0px",
          width: "100%",
          height: height + "px",
          minHeight: "40px"
        };
        this.maxMiniState = 2;
      },
      maxmini() {
        // document.getElementById(this.options.id).removeAttribute("style");
        if (this.options.left && this.options.top) {
          this.addStyle = {
            left: this.options.left + "px",
            top: this.options.top + "px",
          };
        } else if (this.options.left && this.options.bottom) {
          this.addStyle = {
            left: this.options.left + "px",
            bottom: this.options.bottom + "px",
          };
        } else if (this.options.right && this.options.top) {
          this.addStyle = {
            right: this.options.right + "px",
            top: this.options.top + "px",
          };
        } else if (this.options.right && this.options.bottom) {
          this.addStyle = {
            right: this.options.right + "px",
            bottom: this.options.bottom + "px",
          };
        }
        this.maxMiniState = 0;
      },
      moveStart(event) {
        helper.moveStart(event, this.options);
        // 记录鼠标初始位置
        let o = document.getElementById(this.options.id + "");
        this.offsetTop = o.offsetTop
        this.offsetLeft = o.offsetLeft
        this.moveLeft = event.clientX;
        this.moveTop = event.clientY;
        this.ismove = true;
      },
      move(event) {
        if (this.ismove) {
          // 鼠标横坐标  event.clientX
          // 鼠标纵坐标  event.clientY
          // 弹窗div
          let o = document.getElementById(this.options.id + "");
          // 弹框左侧坐标 o.offsetLeft
          // 弹框右侧坐标 o.offsetTop
          // window窗口高
          let docHeight = document.documentElement.clientHeight;
          // window窗口宽
          let docWidth = document.documentElement.clientWidth;
          let top = this.offsetTop + (event.clientY - this.moveTop);
          // 弹窗高
          let docOffsetHeight = o.offsetHeight;
          let left = this.offsetLeft + (event.clientX - this.moveLeft);
          // 弹窗宽
          let docOffsetWidth = o.offsetWidth;
          if (top <= 0) {
            //顶部边界
            top = 0;
          }
          if (left <= 0) {
            //左侧边界
            left = 0;
          }

          if (top >= docHeight - docOffsetHeight) {
            //底部边界
            top = docHeight - docOffsetHeight;
          }
          if (left >= docWidth - docOffsetWidth) {
            //右部边界
            left = docWidth - docOffsetWidth;
          }
          o.style.left = left + "px";
          o.style.top = top + "px";
          this.resetZIndex();
        }
      },
      moveEnd() {
        this.ismove = false;
      },
      resizeHand(event) {
        //拉伸操作
        let o = document.getElementById(this.options.id + "");
        this.resize.oWidth = o.offsetWidth;
        this.resize.oHeight = o.offsetHeight;
        this.resize.moveTop = event.clientY;
        this.resize.moveLeft = event.clientX;
        this.resize.isResize = true;
        document.body.addEventListener("mousemove", e => {
          this.resizeHandMove(e);
        });
      },
      resizeHandMove(event) {
        if (this.resize.isResize) {
          let o = document.getElementById(this.options.id + "");
          let top = event.clientY;
          let left = event.clientX;
          let oWidth = this.resize.oWidth + (left - this.resize.moveLeft);
          let oHeight = this.resize.oHeight + (top - this.resize.moveTop);

          if (oWidth < 200 || oHeight < 200) {
            return;
          }
          o.style.width = oWidth + "px";
          o.style.height = oHeight + "px";
        }
      },
      resizeHandMoveEnd() {
        setTimeout(() => {
          this.resize.isResize = false;
          document.body.removeEventListener("mousemove", e => {
            this.resizeHandMove(e);
          });
        }, 50);
      }
    }
  };
</script>

<style>
</style>

