#### [基于Webpack的Cesium+Vue应用](https://blog.csdn.net/m0_37972557/article/details/79768408)

##### 创建Webpack模板的项目

我们选用webpack模块进行创建，命令很简单，如下:

```
vue init <template-name> <project-name> 
```


这里的<template-name>我们改成webpack，而<project-name>就是各位的项目名称了，输入以后会进行下载模板，在创建过程中依次填写一些配置信息

**安装Cesium环境**
还是在当前文件夹根目录，使用如下命令就可以安装cesium了，在安装完后可以进入node_modules看到cesium的目录结构.

```node
npm install cesium
```

Cesium是一个非常复杂的库，很难去直接打包，我们无法通过在main.js中像引入Vue那样直接进行引入Cesium，因为:

- **Cesium是用异步模块定义（AMD）的格式编写源码的**
- **它包括一些事先编译好的基于AMD的第三方库**
- **Cesium中web worker的使用率很高**
- **一些代码使用了多行字符串**

关于Webpack与Cesium的整合在Cesium官网中有一篇[教程](https://cesiumjs.org/tutorials/cesium-and-webpack/)，教程指出了两种使用Cesium的方式，我们是基于源码的基础上来配置的

**手动复制Cesium编译好的静态文件到static文件夹中**
`进入node_modules\cesium\Build文件夹中，将编译好的Cesium文件复制到根目录下的static中，并把其中Cesium.js删除`
完成后效果如下:
	![image-20191211110009469](./image/image-20191211110009469.png)

这里涉及到几个知识点:
`1.static文件夹的作用是存放静态文件的，Webpack在打包时会将其打包到生成dist文件夹中`
`2.CopyWebpackPlugin是Webpack的插件，他的作用就像咱们刚才手动复制文件到另一个文件夹的过程`

```
//在webpack.dev.conf和webpack.prod.conf有如下配置
 new CopyWebpackPlugin([
     {
       from: path.resolve(__dirname， '../static')，
       to: config.dev.assetsSubDirectory，
       ignore: ['.*']
     }
 ])
```

**设置Webpack的配置项，使其支持Cesium**
1.在build/webpack.base.conf.js下的output中加入sourcePrefix: ' '，让Webpack正确缩进多行字符串。

```
output: {
    path: config.build.assetsRoot，
    filename: '[name].js'，
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath，
    sourcePrefix: ' '
 }
```


2.在build/webpack.base.conf.js下的module中加入unknownContextCritical: false，让Webpack打印载入特定库时候的警告。
3.在build/webpack.base.conf.js下的module中加入unknownContextRegExp: /^.\/.*$/，为了解决Error: Cannot find module "."该错误

```
 module: {
    rules: [
     .....
    ]，
    unknownContextRegExp: /^.\/.*$/，
    unknownContextCritical: false
  }
```

### 编写Vue组件

​		我们已经将Cesium所需要的静态资源打包并放到正确的位置了，但是Cesium并不知道如何找到他们，我们需要让Cesium知道它的静态资源存放在哪里。那么这里Cesium已经提供了一个API，就是buildModuleUrl函数。当完成这一步完成后我们就可以进行Vue+Cesium的正常开发了


新建一个cesiumViewer的组件
在src下新建一个名为cesiumViewer.vue的组件，代码如下:

```vue
<template>
    //放置Cesium的容器
    <div id="cesiumContainer"></div>
</template>

<script>
//导入Cesium源码中的Viewer组件，注意这里是用的Viewer组件的方式加载，而不是加载整个Cesium
import Viewer from "cesium/Source/Widgets/Viewer/Viewer";
//我们刚才所说的如何让Cesium知道静态资源在哪里的API
import buildModuleUrl from "cesium/Source/Core/buildModuleUrl"
//导入必须的样式表
import "cesium/Source/Widgets/widgets.css";

export default{
    name:"cesiumContainer"，
    mounted:function () {
        //设置静态资源目录
        buildModuleUrl.setBaseUrl('../static/Cesium/')
        //创建viewer实例
        this.viewer = new Viewer('cesiumContainer');
    }，
    data () {
        return {
            'viewer' : {}
        }
    }
}
</script>

<style scoped>

</style>
```

**在App.vue中注册组件**

```vue
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import cesiumViewer from "./components/cesiumViewer.vue"
export default {
  name: 'App'，
  components : {
    'cesiumViewer' : cesiumViewer
  }
}
</script>

<style>
//保证浏览器全屏幕显示，没有多余的白边
html， body， #cesiumContainer {
 width: 100%; 
 height: 100%; 
 margin: 0; 
 padding: 0; 
 overflow: hidden;
}
#app {
  font-family: 'Avenir'， Helvetica， Arial， sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
```


修改router/index.js文件

```
import Vue from 'vue'
import Router from 'vue-router'
import cesiumViewer from '@/components/cesiumViewer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/'，
      name: 'cesiumViewer'，
      component: cesiumViewer
    }
  ]
})
```

