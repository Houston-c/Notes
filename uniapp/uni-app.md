## 禁用原生导航栏

![image-20200217105215560](..\image\image-20200217105215560.png)

##### 在pages.json中如下配置

```json
{
    "path" : "pages/login/login",
    "style" : {
        "app-plus":{
            "bounce":"none",    // 页面回弹效果，设置为 "none" 时关闭效果。
            "scrollIndicator":"none", // 滚动条显示策略，设置为 "none" 时不显示滚动条。
            "titleNView":false    // 导航栏 
        }
    }
}
```

## uni-app 自适应状态栏代码

```
	.height {
		height: var(--status-bar-height);
	}
```

### [CSS变量](https://uniapp.dcloud.io/frame?id=css变量)

uni-app 提供内置 CSS 变量

| CSS变量             | 描述                   | App                          | 小程序 | H5                   |
| :------------------ | :--------------------- | :--------------------------- | :----- | :------------------- |
| --status-bar-height | 系统状态栏高度         | 系统状态栏高度、nvue注意见下 | 25px   | 0                    |
| --window-top        | 内容区域距离顶部的距离 | 0                            | 0      | NavigationBar 的高度 |
| --window-bottom     | 内容区域距离底部的距离 | 0                            | 0      | TabBar 的高度        |

**注意：**

- `var(--status-bar-height)` 此变量在微信小程序环境为固定 `25px`，在 App 里为手机实际状态栏高度。
- 当设置 `"navigationStyle":"custom"` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。此时可以使用一个高度为 `var(--status-bar-height)` 的 view 放在页面顶部，避免页面内容出现在状态栏。
- 由于在H5端，不存在原生导航栏和tabbar，也是前端div模拟。如果设置了一个固定位置的居底view，在小程序和App端是在tabbar上方，但在H5端会与tabbar重叠。此时可使用`--window-bottom`，不管在哪个端，都是固定在tabbar上方。
- 目前 nvue 在App端，还不支持 `--status-bar-height`变量，替代方案是在页面onLoad时通过uni.getSystemInfoSync().statusBarHeight获取状态栏高度，然后通过style绑定方式给占位view设定高度。下方提供了示例代码

![image-20200217135742914](..\image\image-20200217135742914.png)



### 中间按钮的突出效果

![image-20200218155616208](..\image\image-20200218155616208.png)

##### 在tabbar配置中添加midButton属性（与list属性同级且list项需为偶数）：

```json
"midButton": {
			"height": "70px",
			"iconPath": "static/qietu/tap_icon_add@3x.png",
			"iconWidth": "50px"
		},
```

**midButton 属性说明**

| 属性            | 类型   | 必填 | 默认值 | 描述                                                         |
| :-------------- | :----- | :--- | :----- | :----------------------------------------------------------- |
| width           | String | 否   | 80px   | 中间按钮的宽度，tabBar 其它项为减去此宽度后平分，默认值为与其它项平分宽度 |
| height          | String | 否   | 50px   | 中间按钮的高度，可以大于 tabBar 高度，达到中间凸起的效果     |
| text            | String | 否   |        | 中间按钮的文字                                               |
| iconPath        | String | 否   |        | 中间按钮的图片路径                                           |
| iconWidth       | String | 否   | 24px   | 图片宽度（高度等比例缩放）                                   |
| backgroundImage | String | 否   |        | 中间按钮的背景图片路径                                       |

midButton按钮的点击事件需要在**App.vue**中的**onLaunch**中：

```js
		onLaunch: function() {
			uni.onTabBarMidButtonTap(() => {
				uni.navigateTo({
					url: "/pages/add/add"
				})
			})
		},
```

### 调用扫一扫

```js
richscan: function() {
    uni.scanCode({
        success: function(res) {
            console.log(JSON.stringify(res.result));
        }
    });
}
```

### 从本地相册选择图片或使用相机拍照

#### [uni.chooseImage(OBJECT)](https://uniapp.dcloud.io/api/media/image?id=chooseimage)

```js
	uni.chooseImage({
        count: 6, //可以选择图片的张数
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        // sourceType: ['album'], //从相册选择  默认是两个都有
        success: function(res) {
        	console.log(JSON.stringify(res.tempFilePaths));
        	//返回结果
    	}
    });
    // uni.previewImage(OBJECT)
```

| 参数名     | 类型          | 必填 | 说明                                                         | 平台差异说明                              |
| :--------- | :------------ | :--- | :----------------------------------------------------------- | :---------------------------------------- |
| count      | Number        | 否   | 最多可以选择的图片张数，默认9                                | 见下方说明                                |
| sizeType   | Array<String> | 否   | original 原图，compressed 压缩图，默认二者都有               | App、微信小程序、支付宝小程序、百度小程序 |
| sourceType | Array<String> | 否   | album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项 |                                           |
| success    | Function      | 是   | 成功则返回图片的本地文件路径列表 tempFilePaths               |                                           |
| fail       | Function      | 否   | 接口调用失败的回调函数                                       | 小程序、App                               |
| complete   | Function      | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                           |

- **count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。**
- ##### sourceType 在H5端对应`input`的`capture`属性，设置为`['album']`无效，依然可以使用相机。