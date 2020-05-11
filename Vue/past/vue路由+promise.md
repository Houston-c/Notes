**模块化：**
    任何一个文件都是一个模版，写了一个模版，需要把这个模版导出去，别人需要把这个模块导进来
    **commonjs方案**：  node
        导入：let http =require("http")
        导出：module.exports = {}
    **es6:**   vue react
        导入：import http from "http"
        导出： export default{}

router.js中的一个路由可以匹配多个组件
    需要在router-view标签上添加name属性，然后在components中通过这个name属性进行匹配

next()的第一个形参是vue实例

路由传参的方式：
    1.在路径后面加上  ?id=   然后通过this.$route.query.id获取参数值
        this.$router 后面跟方法  this.$route后面跟属性
    如：<router-link to="/user/detail?id=1">用户1</router-link>
        使用？的形式传参：{{this.$route.query.id}}     （detail组件）
    2.在配置路由时，在path属性后面加上  /:id   然后可以通过在路径后面加上参数值  最后通过$route.params.id获取
    如：     path: "detail/:id",        (router.js)
            <router-link to="/user/detail/2">用户2</router-link>   
            使用路径的形式传参：{{this.$route.params.id}}     (detail组件)

**监控路由的变化：**
    1.通过watch监控   hash模式下，才能使用watch监控到路径变化
    2.通过beforeRouteUpdate 钩子函数   可以在组件中使用，也可以在路由文件（router.js）中使用 

**路由的生命周期：**
    入口main.js中有两个钩子：beforeEach  beforeResolve
    离开一个组件时： beforeRouteLeave
    进入到一个新的页面：beforeEach
    router配置文件中也有路由钩子：beforeEnter
    进入新的组件：beforeRouteEnter
    解析完成：beforeResolve
    进入完毕：afterEach
    路径发生改变：beforeRouterUpdate

**路由权限验证：**
 可以在router.js中添加一个meta属性   meta:{needLogin:true}  //路由的元信息

 当验证的数据为对象时，必须写成如下形式:
		 type:Object,
		 default:()=>({})

**自定义组件：**
当使用组件时，写在标签中的为属性，所以不能直接使用v-mode进行双向数据绑定，只会将v-model属性传到组件中
    v-model是  :value  和 @input 的语法糖
    因此可以通过组件中的props属性进行接收传过来的value属性，通过@input 来监控输入框内容的变化，
    input事件发生的时候调用相应的方法，通过监听器的第一个参数（事件对象)拿到输入框中的数据 
    再通过$emit触发父组件中的input事件，并且将输入框中的数据传递过去
      传给子组件的数据存放在$attrs,所以可以通过 v-bind="$attrs"接收传送的数据

```
<k-input v-model="model.username" autocomplete="off" placeholder="输入用户名"></k-input>   （父组件）
<input :value="value" @input="onInput" v-bind="$attrs">       （子组件）
methods: {
  onInput(e) {//e是事件对象  当事件发生时，e中保存了事件发生时的信息
       this.$emit("input", e.target.value);
   }   
}
```

​    **ref被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的$refs对象上。**
​    如果在普通的DOM上使用，引用指向的就是DOM元素，如果用在子组件上，引用就指向组件实例
​    关于ref的注册时间：由于ref本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们-它们此时不存在。
​         **$refs也不是响应式的，因此不要试图用它在模版中做数据绑定**

​    **利用promise主要解决**：并发问题，链式调用问题，如果没有promise，就得依靠回调函数，可能会产生回调地狱
​    Promise是一个类，本身是同步的，使用时需要new，在new时，需要给Promise传递一个执行器，这个执行器会立即执行
​    在执行器中有两个参数：reject和resolve，它们是函数，可以把promise从等待态转换为成功态或失败态
​    promise有一个then方法，如果到成功态，它会调用then中的第一个函数，其中的参数就是成功的结果，如果到失败态，会调用then中的第二个函数

​    刚创建的promise默认处于pending状态        
​    throw一个Error对象  也会从pending状态转换成reject状态（失败态）

​    如果.then中有第二个函数，并且后面又有.catch，如果到失败态，它会走then的第二个函数
​    如果.then中没有第二个函数，并且后面又有.catch，如果到失败态，它会走catch

​    **body-parser:用来接收post请求的请求体内容**