```
openIframe(item) {
        this.$layer.closeAll()  //先关闭其他弹框
        console.log(item)
        // let content = require(`${item.path}.vue`).default  
        if (!content) return
        this.$layer.iframe({
          content: {
            content: content, //传递的组件对象
            parent: this,//当前的vue对象
            data: {
              info: {},
            }//props
          },
          // id:'xxxxxx',
          // resize: true,
          top: 110,
          // left: 10,
          right: 10,
          // bottom: 10,
          icon: 0,
          // maxmin: true,
          btn: '确定',
          shade: false,//是否显示遮罩
          area: ['500px', '650px'],
          title: item.title ? item.title : '标题',
          cancel: () => {//关闭事件
            // alert('关闭iframe');
          }
        })
      }
```
