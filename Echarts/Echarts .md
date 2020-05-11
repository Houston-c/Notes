### [地理坐标系geo](https://blog.csdn.net/luanpeng825485697/article/details/76739684)

```js
mytextStyle={
    color:"#333",                //文字颜色
    fontStyle:"normal",         //italic斜体  oblique倾斜
    fontWeight:"normal",        //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
    fontFamily:"sans-serif",    //字体系列
    fontSize:18,                 //字体大小
};
mylineStyle={
    color:"#333",               //颜色，'rgb(128, 128, 128)'，'rgba(128, 128, 128, 0.5)'，支持线性渐变，径向渐变，纹理填充
    shadowColor:"red",          //阴影颜色
    shadowOffsetX:0,            //阴影水平方向上的偏移距离。
    shadowOffsetY:0,            //阴影垂直方向上的偏移距离
    shadowBlur:10,              //图形阴影的模糊大小。
    type:"solid",               //坐标轴线线的类型，solid，dashed，dotted
    width:1,                    //坐标轴线线宽
    opacity:1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
};
myareaStyle={
    color:['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)'],//分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
    shadowColor:"red",          //阴影颜色
    shadowOffsetX:0,            //阴影水平方向上的偏移距离。
    shadowOffsetY:0,            //阴影垂直方向上的偏移距离
    shadowBlur:10,              //图形阴影的模糊大小。
    opacity:1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
};
myitemStyle={
    color:"red",                //颜色
    borderColor:"#000",        //边框颜色
    borderWidth:0,              //柱条的描边宽度，默认不描边。
    borderType:"solid",         //柱条的描边类型，默认为实线，支持 'dashed', 'dotted'。
    barBorderRadius:0,          //柱形边框圆角半径，单位px，支持传入数组分别指定柱形4个圆角半径。
    shadowBlur:10,              //图形阴影的模糊大小。
    shadowColor:"#000",         //阴影颜色
    shadowOffsetX:0,            //阴影水平方向上的偏移距离。
    shadowOffsetY:0,            //阴影垂直方向上的偏移距离。
    opacity:1,                  //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
};
 
geo=[{
    show:true,                                  //是否显示
    map:"china",                                //地图类型。world世界地图，china中国地图
    roam:false,                                 //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
    center:[115.97, 29.71],                     //当前视角的中心点，用经纬度表示
    aspectScale:0.75,                           //这个参数用于 scale 地图的长宽比。
    boundingCoords: [[-180, 90], [180, -90]],  //二维数组，定义定位的左上角以及右下角分别所对应的经纬度
    zoom:1,                                     //当前视角的缩放比例
    scaleLimit:{                                //所属组件的z分层，z值小的图形会被z值大的图形覆盖
        min:1,                                  //最小的缩放值
        max:1,                                  //最大的缩放值
    },
    nameMap:{                                   //自定义地区的名称映射
        'China' : '中国'
    },
    selectedMode: false ,                      //选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
    label:{                                     //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
        normal:{
            show:false,                          //是否在普通状态下显示标签。
            textStyle:mytextStyle,              //普通状态下的标签文本样式。
        },
        emphasis:{
            show:false,                         //是否在高亮状态下显示标签。
            textStyle:mytextStyle              //高亮状态下的标签文本样式。
        }
    },
    itemStyle:{                                 //地图区域的多边形 图形样式
        normal:myitemStyle,
        emphasis:myitemStyle
    },
    zlevel:0,                                   //所属图形的 zlevel 值。
    z:2,                                        //所属图形的 z 值。
    left:"10%",                                 //组件离容器左侧的距离,百分比字符串或整型数字
    top:60,                                     //组件离容器上侧的距离，百分比字符串或整型数字
    right:"auto",                               //组件离容器右侧的距离,百分比字符串或整型数字
    bottom:"auto",                              //组件离容器下侧的距离,百分比字符串或整型数字
    layoutCenter:['30%', '30%'],                //地图中心在屏幕中的位置
    layoutSize:100,                             //地图的大小,支持相对于屏幕宽高的百分比或者绝对的像素大小。
    regions:[{                                  //在地图中对特定的区域配置样式。
        name: '广东',
        itemStyle: {
            normal: {
                areaColor: 'red',
                color: 'red'
            }
        }
    }],
    silent:false,                               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
 
}];
```

#### [series-effectscatter特效散点图](http://blog.csdn.net/luanpeng825485697/article/details/76832199)

```js
series=[
{
    type:"effectScatter",       //特效散点图
    zlevel:0,                    //柱状图所有图形的 zlevel 值。
    z:2,                          //柱状图组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
    silent:false,               //图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
    name:"数据名称",             //系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
    legendHoverLink:true,       //是否启用图例 hover 时的联动高亮。
    hoverAnimation:true,        //是否开启鼠标 hover 的提示动画效果。
    effectType:"ripple",        //特效类型，目前只支持涟漪特效'ripple'。
    showEffectOn:"render",      //配置何时显示特效。可选：'render' 绘制完成后显示特效。'emphasis' 高亮（hover）的时候显示特效。
    rippleEffect:{              //涟漪特效相关配置。
        period:4,               //动画的时间。
        scale:2.5,              //动画中波纹的最大缩放比例。
        brushType:'fill',      //波纹的绘制方式，可选 'stroke' 和 'fill'。
    },
    coordinateSystem:"geo",   //'cartesian2d'使用二维的直角坐标系。'geo'使用地理坐标系
    xAxisIndex:0,               //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
    yAxisIndex:0,               //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
    polarIndex:0,               //使用的极坐标系的 index，在单个图表实例中存在多个极坐标系的时候有用。
    geoIndex:0,                 //使用的地理坐标系的 index，在单个图表实例中存在多个地理坐标系的时候有用。
    calendarIndex:0,            //使用的日历坐标系的 index，在单个图表实例中存在多个日历坐标系的时候有用。
    symbol:"pin",               //图形 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
    symbolSize:50,              //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
    symbolRotate:0,             //标记的旋转角度。注意在 markLine 中当 symbol 为 'arrow' 时会忽略 symbolRotate 强制设置为切线的角度。
    symbolOffset:[0,0],         //标记相对于原本位置的偏移。默认情况下，标记会居中置放在数据对应的位置
    large:false,                //是否开启大规模散点图的优化，在数据图形特别多的时候（>=5k）可以开启。开启后配合 largeThreshold 在数据量大于指定阈值的时候对绘制进行优化。缺点：优化后不能自定义设置单个数据项的样式。
    largeThreshold:2000,        //开启绘制优化的阈值。
    cursor:"pointer",           //鼠标悬浮时在图形元素上时鼠标的样式是什么。同 CSS 的 cursor。
    label:{                      //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
        normal:mylabel,
        emphasis:mylabel
    },
    itemStyle:{                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
        normal:myitemStyle,
        emphasis:myitemStyle,
    },
    encode: {                   //可以定义 data 的哪个维度被编码成什么
        x: [3, 1, 5],           // 表示维度 3、1、5 映射到 x 轴。
        y: 2,                   // 表示维度 2 映射到 y 轴。
        tooltip: [3, 2, 4],     // 表示维度 3、2、4 会在 tooltip 中显示。
        label: 3                // 表示 label 使用维度 3。
    },
    data: [                     //每一列称为一个『维度』。维度下标从0开始
        [12, 44, 55, 66, 2],
        [23, 6, 16, 23, 1],
        [12, 44, 55, 66, 2],
        [23, 6, 16, 23, 1],
        [12, 44, 55, 66, 2],
        [23, 6, 16, 23, 1],
    ],
    //markPoint:同bar
    //markLine:同bar
    //markArea:同bar
    tooltip:tooltip 
},

];
```

