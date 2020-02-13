

### Viewer : 创建Cesium的实例

![image-20191205095057155](./image/image-20191205095057155.png)
    	路由访问该组件或者引该组件作为别的组件的子组件，加载并设置Cesium容器的宽度和高度，通过上面的基本配置就可以显示基本的Cesium

#### screenSpaceEventHandler

​	处理用户输入事件。可以添加自定义函数，以便在用户输入输入时执行。

##### 	getInputAction方法：	

​			返回要在输入事件上执行的函数。
​			getInputAction(type, modifier)
​					type：Number类型。输入事件的ScreenSpaceEventType。
​					modifier：Number类型，可选 。类型事件发生时持有的KeyboardEventModifier键

##### 	setInputAction方法：

​			设置要在输入事件上执行的函数。
​			setInputAction(action, type, modifier)
​					action：function类型。要在输入事件发生时执行的函数。
​					type：Number类型。输入事件的ScreenSpaceEventType。
​					modifier： Number类型，可选。类型事件发生时持有的KeyboardEventModifier键。

```js
// 初始化鼠标点击事件
    viewerInit() {
      let that = this;
      that.orginClickHandler = that.viewer.screenSpaceEventHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );
      that.viewer.screenSpaceEventHandler.setInputAction(
        that.onLeftClick,
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );
      that.viewer.screenSpaceEventHandler.getInputAction(
        Cesium.ScreenSpaceEventType.RIGHT_CLICK
      );
      that.viewer.screenSpaceEventHandler.setInputAction(
        that.onRightClick,
        Cesium.ScreenSpaceEventType.RIGHT_CLICK
      );
    },
```

#### Scene:

​	所有三维图形对象的容器和Cesium虚拟场景中的状态。一般来说，场景不是直接创建的;相反，它是由CesiumWidget隐式创建的。

##### pick方法:

​		返回一个带有“primitive”属性的对象，该属性包含场景中位于特定窗口坐标处的第一个primitive(顶部)，如果该位置没有任何内容，则返回未定义的primitive。其他属性可能根据primitive的类型进行设置，并可能用于进一步标识选中的对象。

​		当选中3D Tiles的一个特性时，pick将返回一个Cesium3DTileFeature对象。
​		pick(windowPosition, width, height)
​				windowPosition：Cartesian2类型。窗口坐标。
​				width：可选，NUmber类型，默认值3。选择矩形的宽度。
​				height：可选，NUmber类型，默认值3。选择矩形的宽度。

```
1屏幕坐标
通过：movement.position获取
2椭球面坐标
通过 viewer.scene.camera.pickEllipsoid(movement.position, ellipsoid)获取，可以获取当前点击视线与椭球面相交处的坐标，其中ellipsoid是当前地球使用的椭球对象：viewer.scene.globe.ellipsoid。
3场景坐标
通过viewer.scene.pickPosition(movement.position)获取，可以获取场中任意点击处的对应的世界坐标。
4地标坐标
通过viewer.scene.globe.pick(ray, scene)获取，可以获取点击处地球表面的世界坐标，不包括模型、倾斜摄影表面。其中ray=viewer.camera.getPickRay(movement.position)。
```



####  加载3D对象（Entity）

- [Primitive](https://blog.csdn.net/u013929284/article/details/52749865)
  代表场景(scene)中的几何体，这个几何体可以是一个几何体也可以是多个几何体构成的。
- Entity
  高级别数据启动的API。
  用一致设计的、高级别的对象来管理一组相关性的可视化界面，底层还是使用的Primitive API。

##### 1 直接添加

```js
var entity = viewer.entities.add({ 
    position : Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706), 
    model : { uri : '../Apps/SampleData/models/CesiumGround/Cesium_Ground.gltf' }
});
viewer.trackedEntity = entity; // 镜头追踪，将镜头固定在对象上
```

##### 2 添加primitives

```js
// 这种方式会以最大最小值为缩放边界，采用entity的方式会完全根据地图进行缩放
var scene = viewer.scene;
var modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-123.0745725, 44.0503706));
var model = scene.primitives.add(Cesium.Model.fromGltf({
    url: 'data/Cesium_Ground.gltf',
    //以下这些信息也均可在entity中设置
    color : Cesium.Color.fromAlpha(Cesium.Color.RED, parseFloat(0.5)),//模型颜色，透明度
    silhouetteColor : Cesium.Color.fromAlpha(Cesium.Color.GREEN, parseFloat(0.5)),//轮廓线
    colorBlendMode : Cesium.ColorBlendMode.MIX,//模型样式['Highlight', 'Replace', 'Mix']
    modelMatrix: modelMatrix,
    minimumPixelSize : 256, // 最小的缩放尺寸，256个像素，就是一个瓦片的尺寸。
    maxiumScale: 2 // 最大的缩放倍数
}));
```

​		其中modelMatrix定义了对象的位置，第一种添加方式模型会自动按照gltf设置好的动画进行播放，第二种方式则需要添加下述代码设置动画。

```js
//添加动画
Cesium.when(model.readyPromise).then(function (model) {
    model.activeAnimations.addAll({
        loop: Cesium.ModelAnimationLoop.REPEAT,//控制重复
        speedup: 0.5, // 速度，相对于clock
        reverse: true // 动画反转
    })
});
```

### 加载3D Tile

​		3D瓦片可以显示建筑物、地标乃至森林广告牌等等以及其对应的属性信息。每个3D瓦片就是一个3D对象，具体的数据范围等等信息在tileset.json中定义。

##### [Cesium3DTileset](https://cesium.com/docs/cesiumjs-ref-doc/Cesium3DTileset.html?classFilter=Cesium3DTileset)

​		3DTiles数据集是cesium小组AnalyticlGraphics与2016年3月定义的一种数据集，3DTiles数据集以分块、分级渲染，将大数据量三维数据以分块，分层的形式组织起来，可以大量减轻浏览器和GPU的负担是一个优秀的，并且格式公开的数据格式。

​		3D Tiles将用于流式传输3D内容，包括建筑物，树木，点云和矢量数据。

##### boundingSphere属性：tileset的包围球。

##### modelMatrix属性：一个4X4转换矩阵，转换整个tileset。

tileset的包围球。

#### [zoomTo](https://cesium.com/docs/cesiumjs-ref-doc/Viewer.html?classFilter=Viewe)

​		zoomTo(target, offset)    异步设置摄像机以查看提供的实体、实体或数据源。如果数据源仍然在加载过程中，或者可视化仍然在加载，则此方法将在执行缩放之前等待数据就绪。

​		偏移量是在以边界球中心为中心的当地东北向上参考坐标系中的航向/俯仰/范围。航向和俯仰角是在当地的东北向上参考系中确定的。标题是从y轴向x轴递增的角度。俯仰是从xy平面旋转过来的。正螺距角在平面之上。负螺距角在平面以下。范围是到中心的距离。如果范围为零，则计算范围使整个包围球可见。

​		在2D中，必须有一个自顶向下的视图。摄像机将被放置在目标上方向下看。目标上方的高度将是范围。标题将从偏移量确定。如果无法从偏移量确定航向，则航向为北。

###### [HeadingPitchRange](https://cesium.com/docs/cesiumjs-ref-doc/HeadingPitchRange.html?classFilter=HeadingPitchRange)

​		new Cesium.HeadingPitchRange(heading, pitch, range)，heading表示以弧度表示的航向角；pitch表示以弧度表示的俯仰角；range表示到中心的距离，单位是米；三者都是可选参数，Number类型，默认为0。定义局部帧中的标题角、俯仰角和范围。航向是当地北方向的旋转，其正角向东增加。俯仰是从局部xy平面旋转过来的。正螺距角在平面之上。负螺距角在平面以下。范围是到框架中心的距离。


```js
var tileSet = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    // 同样url只定义编号前面的部分，具体的编号（数字或者非数字都有可能）在此URL下的tileset.json文件中定义，包括此3d瓦片图层的范围等等。
    url: ''
}));

tileSet.readyPromise.then(function (tileset) {
    viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, 0));
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
});
```

```js
var tileset = new Cesium.Cesium3DTileset({
    url: modelUrl
});
//获取将在加载tileset的根块并准备呈现tileset时解析的Promise。此Promise在框架的末尾解析，然后在第一个框架中呈现tileset。
tileset.readyPromise
    .then(function(tileset) {
    //Primitive代表场景(scene)中的几何体，这个几何体可以是一个几何体也可以是多个几何体构成的。
    //add(primitive, index) 向集合里边添加一个Primitive；其中第二个参数index是可选的，添加层的索引。如果省略，primitive将添加到所有现有primitive的底部。
    that.smViewer.scene.primitives.add(tileset);

    var offsetopt = {
        //   x: 103.983902,
        //   y: 1.346209,
        //   z: -252.9,
        x: 104.001936,
        y: 1.351504,
        z: -252.9,
        heading: 0
    };

    that.updateMatrix(tileset, offsetopt);

    that.smViewer.zoomTo(
        tileset,
        new Cesium.HeadingPitchRange(
            0.0,
            -0.5,
            tileset.boundingSphere.radius * 2.0
        )
    );
})
    .otherwise(function(error) {
    console.log(error);
});

that.changeMap(1);
},

```



#### CustomDataSource

可用于手动管理一组实体的数据源实现。参数为此实例的可读名称。

```js
var dataSource = new Cesium.CustomDataSource('myData');
var entity = dataSource.entities.add({
   position : Cesium.Cartesian3.fromDegrees(1, 2, 0),
   billboard : {
       image : 'image.png'
   }
});

viewer.dataSources.add(dataSource);
```

#### imageryLayers   图像层

有多个方法（https://cesium.com/docs/cesiumjs-ref-doc/ImageryLayerCollection.html）

add(layer, index)、contains(layer) → Boolean、get(index) →imageryLayer等等

##### removeAll：从该集合中删除所有图层

```
	  let that = this;
      that.activeMap = val;
      that.smViewer.imageryLayers.removeAll(true);
```

##### addImageryProvider(imageryProvider, index)

使用给定的图像提供程序创建一个新层并将其添加到集合中
imageryProvider：使用图像提供程序 创建的新层

index：添加层的索引。如果省略，该层将添加到所有现有层的顶部。

```
that.smViewer.imageryLayers.addImageryProvider(
     new GoogleImageryProvider(options)
 );
```

#### ArcGisMapServerImageryProvider：ArcGis地图服务器图像提供商

提供由ArcGIS MapServer承载的平铺图像。默认情况下，如果可用，将使用服务器预先缓存的块。

```js
//ArcGis
        let esri = new Cesium.ArcGisMapServerImageryProvider({
          url:          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        });
        that.smViewer.imageryLayers.addImageryProvider(esri);
```

#### [Matrix4](https://cesium.com/docs/cesiumjs-ref-doc/Matrix4.html?classFilter=Matrix4)

​		一个4x4矩阵，可作为一个列-主顺序数组索引。构造函数参数按行-主顺序排列，以保证代码的可读性。

##### fromArray方法：

​		从一个数组中的16个连续元素创建一个矩阵
​		Cesium.Matrix4.fromArray(array, startingIndex, result)
​			array：16个连续元素对应于矩阵位置的数组。相当于四个一维数组，从每个数组的第一项开始
​			startingIndex：可选，Number类型，默认值为0。第一个元素在数组中的偏移量，它对应于矩阵中第一列第一行的位置。
​			result：可选。存储结果的对象，需要是Matrix4类型	

##### getTranslation方法：

​		假设该矩阵是一个[仿射变换矩阵](https://blog.csdn.net/qq_29796317/article/details/74910733)，获取提供的矩阵的平移部分。

​		Cesium.Matrix4.getTranslation(matrix, result)
​			matrix：Matrix4类型。
​			result：Cartesian3类型。存储结果的对象

##### fromRotationTranslation方法：

​		从表示旋转的Matrix3（矩阵）和表示平移的 Cartesian3 （笛卡尔坐标系）中计算矩阵x4实例。
​		Cesium.Matrix4.fromRotationTranslation(rotation, translation, result)
​				rotation：Matrix3类型。表示旋转的矩阵的左上角。
​				translation：Cartesian3类型，默认值为Cartesian3.ZERO，可选。表示平移的矩阵的右上角。
​				result：Matrix4类型，可选。如果未定义，将创建一个新实例，则结果将存储在其中的对象。
​		返回值：修改后的结果参数，或者如果没有提供新的Matrix4实例，则使用新参数。

##### multiply方法：

​		计算两个矩阵的乘积。
​		Cesium.Matrix4.multiply(left, right, result)
​				left：Matrix4类型。第一个矩阵。
​				right：Matrix4类型。第二个矩阵。
​				result：Matrix4类型。存储结果的对象
​		返回值：修改后的结果参数。

##### fromTranslation方法：

​		从表示转换的Cartesian3创建一个Matrix4实例
​		Cesium.Matrix4.fromTranslation(translation, result)
​				translation：Cartesian3类型。
​				result：可选，Matrix4类型。如果未定义，将创建一个新实例，则结果将存储在其中的对象。

#### [Matrix3](https://cesium.com/docs/cesiumjs-ref-doc/Matrix3.html?classFilter=Matrix3)

​		一个3 * 3矩阵，可作为一个列-主序数组索引。构造函数参数按行-主顺序排列，以保证代码的可读性。

##### fromRotationZ方法：

​		创建一个绕z轴旋转的矩阵。
​		Cesium.Matrix3.fromRotationZ(angle, result)
​				angle：Number类型。以弧度表示的旋转角度。正角是逆时针的。
​				result：Matrix3类型，可选。若未定义，将创建一个新实例，将结果存储在其中的对象。
​		返回值：修改后的结果参数，或者如果没有提供新的Matrix3实例，则提供一个。

#### Cartographic

##### 		fromCartesian方法：

​			笛卡尔坐标位置创建一个新的制图实例。结果对象中的值将以弧度表示。
​			Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result)
​				cartesian：要转换为地图表示的笛卡尔坐标位置。
​				ellipsoid：可选，Ellipsoid类型，默认值为Ellipsoid.WGS84。位置所在的椭球面。
​				result：可选，Cartographic类型。
​			返回值：修改后的结果参数，如果没有提供新的制图实例，或者如果笛卡尔位于椭球体的中心，则未定义。

#### Cartesian3

​		三维笛卡尔坐标点。

##### 		fromDegrees方法：

​		返回以度为单位的经度和纬度值的Cartesian3位置。
​		Cesium.Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result)
​			longitude：经度，以度为单位
​			latitude：纬度，以度为单位
​			height：可选，Number类型，默认值0.0。高度，一米为单位
​			ellipsoid：可选，Ellipsoid类型，默认值Ellipsoid.WGS84。位置所在的椭球面
​			result：可选，Cartesian3类型。
​		返回值：坐标点

##### fromRadians方法：

​		返回以弧度表示的经度和纬度值的Cartesian3位置。
​		Cesium.Cartesian3.fromRadians(longitude, latitude, height, ellipsoid, result)  同上

##### subtract方法：

​		计算两个C3实例的相减(分量差)后的C3实例
​		Cesium.Cartesian3.subtract(left, right, result)

### Transforms

​		包含将位置转换为各种参考系的函数。

##### 		eastNorthUpToFixedFrame方法：

​				从以给定原点为中心的东北向上轴的坐标系到给定椭球体的固定坐标系计算4x4变换矩阵。
​		Cesium.Transforms.eastNorthUpToFixedFrame(origin, ellipsoid, result)
​		origin：局部参考系的中心点。

index：添加层的索引。如果省略，该层将添加到所有现有层的顶部。

## [S3MTilesLayer](https://www.jianshu.com/p/6718532cd731)

​	与Cesium不同的是，WebGL中添加缓存，不是使用Primitives，而是使用S3MTilesLayer进行添加的。

#### addS3MTilesLayerByScp:

​		添加单个图层，我们通过viewer.scene.addS3MTilesLayerByScp方法进行添加，返回的是一个promise异步加载对象。
![image-20191212111313228](./image/image-20191212111313228.png)

要设置S3MTilesLayer的参数，首先我们需要获取到S3MTilesLayer图层，
 **Cesium.when回调获取该图层**
   如果添加的是单个图层，则通过函数返回的是单个layer图层，直接用就可以了

```jsx
var       promise=scene.addS3MTilesLayerByScp("http://www.supermapol.com/realspace/services/3D-suofeiya_church/rest/realspace/datas/Config/config",
        {name:"suofeiyaOSGB",cullEnabled:false});
Cesium.when(promise,function (layer) {
     var s3mLayer=layer;
})
```



```js
component -> SuperMap -> SuperMap.js
/*
  @Author: BimLzz
  @pageName: smviewer
  @Date: 2019/11/6 13:36
  @events  @model-click   3dtiles模型点击事件
                          (arr)接收一个参数 所选择模型的属性数组
           @model2-click  超图模型点击事件
                          (selectedId)接收一个参数 所选择模型的id
           @point-click   覆盖物的点击事件
                          (entity)接收一个参数，所点击覆盖物的所有属性
*/
const Cesium = window.Cesium;
//天地图
import TdtImageryProvider from "@/components/Provider/tdt/TdtImageryProvider";
// google地图
import GoogleImageryProvider from "@/components/Provider/google/GoogleImageryProvider";
// 百度地图
import BaiduImageryProvider from "@/components/Provider/baidu/BaiduImageryProvider";
// 高德地图
import AmapImageryProvider from "@/components/Provider/amap/AmapImageryProvider";
// 腾讯地图
import TencentImageryProvider from "@/components/Provider/tencent/TencentImageryProvider";

import { mapState } from "vuex";

export const SuperMap = {
  data() {
    return {
      selected: {
        feature: undefined,
        originalColor: new Cesium.Color()
      },
      highlighted: {
        feature: undefined,
        originalColor: new Cesium.Color()
      },
      colorSelected: Cesium.Color.LIME,
      modellayer: undefined
    };
  },

  computed: {
    ...mapState({
      smCesium: state => state.supermap.smCesium,
      smViewer: state => state.supermap.smViewer,
      smDataSource: state => state.supermap.smDataSource
    })
  },

  watch: {},

  created() {},

  mounted() {
    let that = this;
    // 初始化Cesium
    that.$store.commit("supermap/SET_SMCESIUM", window.Cesium);
    // 初始化Viewer
    that.$store.commit(
      "supermap/SET_SMVIEWER",
      new that.smCesium.Viewer("SuperMapContainer", {})
    );
    // 初始化dataSource
    that.$store.commit(
      "supermap/SET_SMDATASOURCE",
      new that.smCesium.CustomDataSource()
    );
    that.changeMap(4);
    that.smViewerInit();
  },

  destroyed() {},

  methods: {
    updateMatrix(model, offsetopt) {
      if (model == null) return;

      console.log(" 模型修改后位置:" + JSON.stringify(offsetopt));

      let isOK = false;

      if (offsetopt.heading != 0 && model._root && model._root.transform) {
        console.log("SuperMap->updateMatrix");
        //有旋转角度heading 并且有自带世界矩阵矩阵 进行旋转操作。
        let mat = Cesium.Matrix4.fromArray(model._root.transform);
        let pos = Cesium.Matrix4.getTranslation(mat, new Cesium.Cartesian3());
        let wpos = Cesium.Cartographic.fromCartesian(pos);
        if (wpos) {
          let position = Cesium.Cartesian3.fromDegrees(
            offsetopt.x,
            offsetopt.y,
            offsetopt.z
          );
          mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
          let rotationX = Cesium.Matrix4.fromRotationTranslation(
            Cesium.Matrix3.fromRotationZ(
              Cesium.Math.toRadians(offsetopt.heading)
            )
          );
          Cesium.Matrix4.multiply(mat, rotationX, mat);
          model._root.transform = mat;
          isOK = true;
        }
      }

      if (!isOK) {
        let boundingSphere = model.boundingSphere;
        let catographic = Cesium.Cartographic.fromCartesian(
          boundingSphere.center
        );
        let surface = Cesium.Cartesian3.fromRadians(
          catographic.longitude,
          catographic.latitude,
          0.0
        );
        let offset = Cesium.Cartesian3.fromDegrees(
          offsetopt.x,
          offsetopt.y,
          offsetopt.z
        );

        let translation = Cesium.Cartesian3.subtract(
          offset,
          surface,
          new Cesium.Cartesian3()
        );
        model.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      }
    },

    // 加载模型 新加坡
    addModel2(modelUrl) {
      let that = this;
      that.smViewer.scene.globe.baseColor = Cesium.Color.BLACK;
      that.smViewer._cesiumWidget._creditContainer.style.display = "none";
      that.smViewer.scene.globe.depthTestAgainstTerrain = true;

      var options = {
        camera: that.smViewer.scene.camera,
        canvas: that.smViewer.scene.canvaas
      };
      that.smViewer.dataSources.add(
        Cesium.KmlDataSource.load("./xjpjc.kml", options)
      );

      var tileset = new Cesium.Cesium3DTileset({
        url: modelUrl
      });

      tileset.readyPromise
        .then(function(tileset) {
          that.smViewer.scene.primitives.add(tileset);

          var offsetopt = {
            //   x: 103.983902,
            //   y: 1.346209,
            //   z: -252.9,
            x: 104.001936,
            y: 1.351504,
            z: 52.9,
            heading: 0
          };

          that.updateMatrix(tileset, offsetopt);

          that.smViewer.zoomTo(
            tileset,
            new Cesium.HeadingPitchRange(
              0.0,
              -0.5,
              tileset.boundingSphere.radius * 2.0
            )
          );
        })
        .otherwise(function(error) {
          console.log(error);
        });

      that.changeMap(1);
    },

    // 加载模型
    addModel(modelUrl) {
      let that = this;
      that.smViewer.scene.globe.baseColor = Cesium.Color.BLACK;
      that.smViewer._cesiumWidget._creditContainer.style.display = "none";
      try {
        let scene = that.smViewer.scene;
        console.log("加载模型：SuperMap.js -> addModel "+ modelUrl);
        let promise = scene.addS3MTilesLayerByScp(modelUrl);
        Cesium.when(
          promise,
          function(vectorLayer) {
            vectorLayer.cullEnabled = false;
            vectorLayer.selectionFiltrateByTransparency = 0; // 不过滤透明度为0的物体，当前图层就不会被过滤
            vectorLayer.selectColorType = 1.0;
            vectorLayer.selectedColor = Cesium.Color.RED;
            that.modellayer = vectorLayer;
          },
          function(e) {
            console.log(e);
            let title = "渲染时发生错误，已停止渲染。";
            console.log(title);
          }
        );
      } catch (e) {
        let title = "渲染时发生错误，已停止渲染。";
        console.log(title);
      }
    },
    // 初始化鼠标点击事件
    smViewerInit() {
      let that = this;
      that.smViewer.dataSources.add(that.smDataSource);
      that.orginClickHandler = that.smViewer.screenSpaceEventHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );
      that.smViewer.screenSpaceEventHandler.setInputAction(
        that.onLeftClick,
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );
      that.doubleclickHandler = that.smViewer.screenSpaceEventHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      that.smViewer.screenSpaceEventHandler.setInputAction(
        that.onLeftdclick,
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    },
    // 左键单击
    onLeftClick(movement) {
      let that = this;
      if (that.modellayer && that.modellayer.getSelection().length > 0) {
        let selectedId = Number(that.modellayer.getSelection()[0]);
        console.log(selectedId);
        that.$emit("model2-click", selectedId);
      }

      // If a feature was previously selected, undo the highlight
      if (Cesium.defined(that.selected.feature)) {
        try {
          that.selected.feature.color = that.selected.originalColor;
        } catch (ex) {
          console.log(ex);
        }
        that.selected.feature = undefined;
      }
      let pickedFeature = that.smViewer.scene.pick(movement.position);
      // Pick a new feature
      if (!Cesium.defined(pickedFeature) && that.orginClickHandler) {
        that.orginClickHandler(movement);
        return;
      }
      // Select the feature if it's not already selected
      if (that.selected.feature === pickedFeature) {
        return;
      }
      if (pickedFeature && Cesium.defined(pickedFeature.id)) {
        let entity = pickedFeature.id;
        if (entity.click && typeof entity.click === "function") {
          entity.click(entity);
          return;
        }
      }
      if (!Cesium.defined(pickedFeature.getProperty)) return;
      that.selected.feature = pickedFeature;
      // Save the selected feature's original color
      if (pickedFeature === that.highlighted.feature) {
        Cesium.Color.clone(
          that.highlighted.originalColor,
          that.selected.originalColor
        );
        that.highlighted.feature = undefined;
      } else {
        Cesium.Color.clone(pickedFeature.color, that.selected.originalColor);
      }
      pickedFeature.color = that.colorSelected;
      let arr = that.getBimAttr(pickedFeature);
      console.log(arr);
      that.$emit("model-click", arr);
    },
    // 右键单击
    onRightClick(movement) {
      console.log(movement);
    },
    //左键双击
    onLeftdclick(movement) {
      console.log(movement);
    },
    // 获取模型属性
    getBimAttr(pickedFeature) {
      if (
        !pickedFeature.tileset.properties ||
        !pickedFeature.tileset.properties.length
      )
        return false;

      let fileParams;

      //如果有文件名，那么依据文件名
      if (pickedFeature.hasProperty("file")) {
        let file = pickedFeature.getProperty("file");

        for (let i = 0; i < pickedFeature.tileset.properties.length; i++) {
          let params = pickedFeature.tileset.properties[i];
          if (params.file == file) {
            fileParams = params.params;
          }
        }
      }
      //直接取第一个
      else {
        fileParams = pickedFeature.tileset.properties[0].params;
      }

      if (!fileParams) return false;

      //var selectedFeatures =[];
      // 名称和 id
      let arrAttr = [];

      function addItem(name, value) {
        if (value != null && value != "" && value != 0)
          arrAttr.push({ name: name, value: value });
      }

      if (pickedFeature.hasProperty("id"))
        addItem("id", pickedFeature.getProperty("id"));
      if (pickedFeature.hasProperty("name"))
        addItem("名称", pickedFeature.getProperty("name"));
      if (pickedFeature.hasProperty("LevelName"))
        addItem("楼层", pickedFeature.getProperty("LevelName"));
      if (pickedFeature.hasProperty("CategoryName"))
        addItem("分类", pickedFeature.getProperty("CategoryName"));
      if (pickedFeature.hasProperty("FamilyName"))
        addItem("族", pickedFeature.getProperty("FamilyName"));
      if (pickedFeature.hasProperty("FamilySymbolName"))
        addItem("族类型", pickedFeature.getProperty("FamilySymbolName"));
      if (pickedFeature.hasProperty("file"))
        addItem("文件名", pickedFeature.getProperty("file"));
      //依据group分类
      let groups = {};
      let names = pickedFeature._content.batchTable.getPropertyNames(
        pickedFeature._batchId
      );
      for (let k = 0; k < names.length; k++) {
        let n = names[k];

        if (n == "_properties") {
          //对于这种属性

          let properties = pickedFeature.getProperty(n);

          try {
            let sets = JSON.parse(properties);

            for (var b = 0; b < sets.length; b++) {
              let set = sets[b];

              var rows = groups[set.name];
              if (!rows) rows = [];

              for (let j = 0; j < set.properties.length; j++) {
                let p = set.properties[j];
                if (!p.value) continue;

                let row = { name: p.name, value: p.value };
                rows.push(row);
              }
              groups[set.name] = rows;
            }
          } catch (ex) {
            console.log("parse _properties failed:" + ex);
          }
        } else {
          //其他属性
          let name = n,
            value = pickedFeature.getProperty(n);
          let defp;
          for (let j = 0; j < fileParams.length; j++) {
            let fp = fileParams[j];
            if (name == fp.name) {
              defp = fp;
              break;
            }
          }
          if (!defp) continue;

          let rows = groups[defp.group];
          if (!rows) rows = [];
          let val = value;
          if (defp.type == "YesNo") val = value == 1 ? "是" : "否";
          if (defp.type == "Length") val = (value * 0.3048).toFixed(2) + "m";
          if (defp.type == "Area")
            val = (value * 0.3048 * 0.3048).toFixed(2) + "㎡";
          if (defp.type == "Volume")
            val = (value * 0.3048 * 0.3048 * 0.3048).toFixed(2) + "m³";

          if (!val) continue;

          let row = { name: defp.name, value: val };
          rows.push(row);
          groups[defp.group] = rows;
        }
      }

      function groupName(group) {
        if (group == "PG_IDENTITY_DATA") return "标识数据";
        if (group == "PG_GEOMETRY") return "尺寸标注";
        if (group == "PG_PHASING") return "阶段化";
        if (group == "PG_CONSTRAINTS") return "约束";
        if (group == "INVALID") return "其他";
        if (group == "PG_MATERIALS") return "材质和装饰";
        if (group == "PG_CONSTRUCTION") return "构造";
        return group;
      }

      for (let group in groups) {
        arrAttr.push({ type: "group", name: groupName(group) });

        let rows = groups[group];
        for (let i = 0; i < rows.length; i++) {
          arrAttr = arrAttr.concat(rows[i]);
        }
      }
      return arrAttr;
    },
    // 定位
    flytoPoint(config) {
      let that = this;
      let x = config.x;
      let y = config.y;
      let z = config.z + 2500;
      let heading = config.heading ? config.heading : 0;
      let pitch = config.pitch ? config.pitch : Cesium.Math.toRadians(-90);
      let roll = config.roll ? config.roll : 0;
      that.smViewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(x, y, z),
        orientation: { heading: heading, pitch: pitch, roll: roll }
      });
    },
    // 标点
    setPoint(item) {
      let that = this;
      let x = item.x,
        y = item.y,
        z = item.z;
      that.smDataSource.entities.add({
        name: item.name,
        position: Cesium.Cartesian3.fromDegrees(x, y, z),
        // point: {
        //   color: new Cesium.Color.fromCssColorString('#ffffff'),
        //   pixelSize: 36,
        //   outlineColor: new Cesium.Color.fromCssColorString('#ffffff'),
        //   outlineWidth: 2,
        //   // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,     //贴地
        //   scaleByDistance: new Cesium.NearFarScalar(1000, 1, 100000, 0.1),
        // },
        billboard: {
          image: item.icon
        },
        label: {
          text: item.name,
          font: "normal small-caps normal 28px 楷体",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: Cesium.Color.AZURE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -10), //偏移量
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition()
        },
        _isQyPoint: true, //标识下，事件中判断
        data: item,
        // popup: {
        //   html: inthtml1,
        //   anchor: [0, -15]
        // }
        click: function(entity) {
          that.$emit("point-click", entity);
        }
      });
    },
    // 标数字点
    setValuePoint(item) {
      let that = this;
      let x = item.x,
        y = item.y,
        z = item.z;
      let singleDigitPins = {};
      let pinBuilder = new Cesium.PinBuilder();
      pinBuilder.fromColor(Cesium.Color.RED, 20);
      singleDigitPins = pinBuilder
        .fromText(item.id, Cesium.Color.RED, 48)
        .toDataURL();
      let image = singleDigitPins;
      that.smDataSource.entities.add({
        name: item.name,
        position: Cesium.Cartesian3.fromDegrees(x, y, z),
        // point: {
        //   color: new Cesium.Color.fromCssColorString('#ffffff'),
        //   pixelSize: 36,
        //   outlineColor: new Cesium.Color.fromCssColorString('#ffffff'),
        //   outlineWidth: 2,
        //   // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,     //贴地
        //   scaleByDistance: new Cesium.NearFarScalar(1000, 1, 100000, 0.1),
        // },
        billboard: {
          image: image
        },
        label: {
          text: item.name,
          font: "normal small-caps normal 19px 楷体",
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: Cesium.Color.AZURE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -10), //偏移量
          // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            0.0,
            2000000
          )
        },
        _isQyPoint: true, //标识下，事件中判断
        data: item,
        // popup: {
        //   html: inthtml1,
        //   anchor: [0, -15]
        // }
        click: function(entity) {
          that.$emit("point-click", entity);
        }
      });
    },
    // 切换地图
    changeMap(val) {
      let that = this;
      that.activeMap = val;
      that.smViewer.imageryLayers.removeAll(true);

      if (val == 0) {
        //google
        let options = {
          style: "img"
        };
        that.smViewer.imageryLayers.addImageryProvider(
          new GoogleImageryProvider(options)
        );
      } else if (val == 1) {
        //ArcGis
        let esri = new Cesium.ArcGisMapServerImageryProvider({
          url:
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
        });
        that.smViewer.imageryLayers.addImageryProvider(esri);
      } else if (val == 2) {
        //microsoft必应地图
        let bing = new Cesium.BingMapsImageryProvider({
          url: "https://dev.virtualearth.net",
          key:
            "AtkX3zhnRe5fyGuLU30uZw8r3sxdBDnpQly7KfFTCB2rGlDgXBG3yr-qEiQEicEc",
          mapStyle: Cesium.BingMapsStyle.AERIAL
        });
        that.smViewer.imageryLayers.addImageryProvider(bing);
      } else if (val == 3) {
        //天地图
        let optionsimg = {
          style: "img",
          key: "e6d7470e4ad32b294ee60c4171f3ee6c"
        };
        that.smViewer.imageryLayers.addImageryProvider(
          new TdtImageryProvider(optionsimg)
        );

        let optionscia = {
          style: "cia",
          key: "e6d7470e4ad32b294ee60c4171f3ee6c"
        };
        that.smViewer.imageryLayers.addImageryProvider(
          new TdtImageryProvider(optionscia)
        );
      } else if (val == 4) {
        //高分
        var custom = new Cesium.UrlTemplateImageryProvider({
          url:
            "http://47.107.230.22/gisdata/guanglian/imagedata/{z}/{x}/{y}.jpg"
        });
        that.smViewer.imageryLayers.addImageryProvider(custom);
      } else if (val == 5) {
        //单张地图
      } else if (val == 6) {
        //百度地图
        let options = {
          style: "img"
        };
        that.view;
        that.smViewer.imageryLayers.addImageryProvider(
          new BaiduImageryProvider(options)
        );
      } else if (val == 6) {
        //高德地图
        let options = {
          style: "img"
        };
        that.smViewer.imageryLayers.addImageryProvider(
          new AmapImageryProvider(options)
        );
      } else if (val == 6) {
        //腾讯地图
        let options = {
          style: "img"
        };
        that.smViewer.imageryLayers.addImageryProvider(
          new TencentImageryProvider(options)
        );
      }
    }
  }
};

```

