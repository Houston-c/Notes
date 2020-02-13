```
问题如下：
1.如何将ActiveX控件引入Vue，并且在页面上成功渲染；
2.如何调用ActiveX已提供的方法；
3.如何监听ActiveX的动作；
```

1.动态生成的方式渲染到页面上

```js
	let obj = document.createElement("object");
    obj.setAttribute("id", "ebring_test");
    obj.setAttribute("classid", `clsid:${this.clsid}`);//data中的clsid
    obj.setAttribute("width", 1500);
    obj.setAttribute("height", 800);
    var _obj = document.getElementById("app");
    _obj.appendChild(obj);
```

​	也可以直接将object标签粘贴上去：需要将style属性中的宽度和高度作为object标签的属性进行添加：

```HTML
<object
      width="1900"
      height="800"
     id= "ebring_test"
     classid= "clsid:0E4613EE-4EF4-40CD-A2F9-CB7D50CF318E" align="center">
</object>
```

2.调用ActiveX已提供的方法

```
IE的浏览器需要做以下设置
设置：设置-Internet选项-安全/自定义级别-Active控件和插件-对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本，选择"启用"或者"提示"）
```

3.监听ActiveX的动作。

```html
<script language="javascript" for="ebring_test" EVENT="OnRealBimOcxInited()" type="text/javascript">
    var objOcx = document.getElementById("ebring_test");
    objOcx.SwitchBIMSceneSimple("D:/dacheng_gl/", "Resource_guangliantest");
</script>
```

methods中的initOnRealBimOcxInited方法

```js
 //   初始化完成调用绘制图像
    initOnRealBimOcxInited() {
      var ring = document.createElement("script");
      ring.setAttribute("for", "ebring_test");
      ring.event = "OnRealBimOcxInited()";
      ring.appendChild(document.createTextNode("activeXListener.draw()"));
      document.body.appendChild(ring);
    },
```

draw方法

```js
// 场景数据
    draw() {
      var objOcx = document.getElementById("ebring_test");
      objOcx.SwitchBIMSceneSimple(this.SceneResLocation, this.SceneResName);
      console.log("receive");
      // objOcx.SwitchBIMSceneSimple("http://realbim.zicp.vip:19876/","Resource_SZCS");
    },
```

然后在mounted里面调用initOnRealBimOcxInited方法，此方法会将<script>function</script>渲染到页面上，但是想执行Vue的methods的方法的话，还需要在mounted里加上一句代码：` window.activeXListener= this;`
这段代码的作用是将Vue的this所指向赋值给全局的变量activeXListener，这个变量，可随意。

此时场景渲染完成

**将html文件中的button以及对应的点击方法复制过来时，需要将onclick改为click并且绑定对应的点击事件处理方法**

**保存标记**时需要知道点击时的坐标  ---->  OnPickPosition方法
**删除标记**时需要所选标注的name  ---->  OnSymbolSelected方法（？？？？）