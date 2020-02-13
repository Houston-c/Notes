#### 	 **热加载** 

​		使用 webpack 的 Hot Module Replacement API，Vuex 支持在开发过程中热重载 mutation、module、action 和 getter。也可以在 Browserify 中使用 browserify-hmr 插件。

　　对于 mutation 和模块，需要使用 `store.hotUpdate()` 方法：

```js
if (module.hot) {
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    ["./modules/cesium", "./modules/supermap", "./modules/user"],
    () => {
      //加载新模块
      index.hotUpdate({
        modules: {
          cesium: require("./modules/cesium").default,
          supermap: require("./modules/supermap").default,
          user: require("./modules/user").default
        }
      });
    }
  );
}
```

