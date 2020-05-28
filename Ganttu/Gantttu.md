#### 甘特图右侧显示undefined

​		由于初始化tasks时，它data属性中各项的label为显示的任务名，所以需要将原先的taskName改为label。

```js
	  // 指定任务栏中的文本和弹出框的标题
      gantt.templates.task_text = function(start, end, task) {
        return task.taskName;
      };     
	  // 改正后可正常显示
      gantt.templates.task_text = function(start, end, task) {
        return task.label;
      };
```

#### 进度百分比显示

```js
// 指定任务栏的已完成部分中的文本
gantt.templates.progress_text = 
    function (start, end, task) {
 		return '<span style=\'text-align:left;\'>' + Math.round(task.o_level * 10) + '% </span>'
    }
```

### gantt.addMarker is not a function

需要引入dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker.js

```js
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker.js'

//将今天线划出
var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
var today = new Date(2018, 3, 3);
gantt.addMarker({
    start_date: today,
    css: "today",
    text: "Today",
    title: "Today: " + date_to_str(today)
});
```

#### 如果同时指定了**start_date**和**end_date**选项，并且您创建的任务不在范围内，则该任务将从图表中消失。 [要](https://docs.dhtmlx.com/gantt/desktop__configuring_time_scale.html#tasksoutsidetimescale)在图表中[显示任务](https://docs.dhtmlx.com/gantt/desktop__configuring_time_scale.html#tasksoutsidetimescale)，请使用[show_tasks_outside_timescale](https://docs.dhtmlx.com/gantt/api__gantt_show_tasks_outside_timescale_config.html)配置。

```js
gantt.config.start_date = new Date(2019, 02, 31);
gantt.config.end_date = new Date(2019, 03, 09);
gantt.config.show_tasks_outside_timescale = true;
 
gantt.init("gantt_here");
```

#### 默认布局

通过[gantt.config.layout](https://docs.dhtmlx.com/gantt/api__gantt_layout_config.html)配置选项设置布局。布局的默认配置如下：

```js
    gantt.config.layout = {
      css: "gantt_container",
      rows: [
        {
          cols: [
            {
              // the default grid view
              view: "grid",
              scrollX: "scrollHor",
              scrollY: "scrollVer"
            },
            { resizer: true, width: 1 },
            {
              // the default timeline view
              view: "timeline",
              scrollX: "scrollHor",
              scrollY: "scrollVer"
            },
            {
              view: "scrollbar",
              id: "scrollVer"
            }
          ]
        },
        {
          view: "scrollbar",
          id: "scrollHor"
        }
      ]
    };
```

- **grid-**定义甘特图的网格部分。预定义的用于显示任务的主网格具有*id：“ grid”* ;

- **timeline** -定义甘特图的时间线部分。预定义用于显示任务的主时间轴的id为:“timeline”;

- **resizer** - 定义调整大小行。要启用调整器，您需要将**resizer**属性设置为*true*。**仅在PRO版中提供** ;

- **scrollbar** \- 定义甘特图中使用的滚动条。网格和时间轴视图可以绑定到特定的滚动条。

  布局滚动条由view  **scrollbar**指定。可以同时设置水平和垂直滚动条。

  要在布局中使用滚动条，您需要借助**scrollX**或**scrollY**属性通过必要的滚动条的ID 将其绑定到相应的视图。可以将多个视图绑定到同一滚动条。为了将视图绑定到滚动条：

  - 设置具有必要滚动方向的滚动条并为其分配ID
  - 将滚动条的ID用作视图配置对象内的**scrollX / scrollY**属性的值



#### getDatastore

返回数据存储的配置对象
*object* getDatastore(string name);
参数		数据存储的名称	
return  object   数据存储的配置对象

对象数据存储的配置对象

例子：var tasksStore = gantt.getDatastore("task");

![image-20191224095555186](./image/image-20191224095555186.png)



## IE浏览器new Date()的使用问题

IE下面使用var t = new Date(“2019-02-22”)转换失败。
经查得知短横线格式的日期在IE下不支持这种转换，需要换成斜杠格式的日期，如：
var t = new Date(“2019/02/22”)这样就能成功。
若有遇到相同问题的童鞋可以使用正则把短横线替换成斜杠在做转换。
var t = new Date(“2019-02-22”.replace(/-/g, “/”));

## scrollTo

将甘特容器滚动到指定位置	

```
void scrollTo(number|null x,number|null y);
```

##### 	参数

| x    | number\|null | 水平滚动条的值或“null”(如果滚动条的位置不需改变) |
| ---- | ------------ | ------------------------------------------------ |
| y    | number\|null | 垂直滚动条的值或“null”(如果滚动条的位置不需改变) |

##### 	Example

```js
gantt.scrollTo(30, 80); //  
gantt.scrollTo(30, null); // 只水平滚动
gantt.scrollTo(null, 80); // 只垂直滚动
```

## open_tree_initially

​		最初打开所有分支

```js
gantt.config.open_tree_initially = true;
```

## getGlobalTaskIndex

​		获取树中任务的索引Parameters

| 参数 | 数据类型       | 描述   |
| ---- | -------------- | ------ |
| id   | string\|number | 任务id |

#### Returns

| 返回值 | 描述                           |
| ------ | ------------------------------ |
| number | 树中的任务索引(从零开始的编号) |

#### Example

![image-20191226092801051](./image/image-20191226092801051.png)

### [甘特图滚动](https://snippet.dhtmlx.com/449323b06?_ga=2.136035063.739109536.1576462007-1730593582.1576462007)           [标记线移动](https://snippet.dhtmlx.com/c285e5d91?_ga=2.136035063.739109536.1576462007-1730593582.1576462007)

## dateFromPos

​	获取图表区域中指定水平位置的日期。   该方法返回当前在甘特图中呈现的日期。如果图表中未显示日期，则该方法将返回“ null”。

```js
Date dateFromPos (number pos);
```

| 参数 | 类型   | 描述                     |
| ---- | ------ | ------------------------ |
| pos  | number | 想知道日期的相对水平位置 |

| 返回值类型 | 描述                         |
| ---------- | ---------------------------- |
| Date       | 图表区域中指定水平位置的日期 |

![image-20191226093814793](./image/image-20191226093814793.png)

## posFromDate

​	获取图表区域中指定日期的相对水平位置。	该方法返回当前在甘特图中呈现的日期的位置。如果一个日期没有呈现在图表-该方法将返回'null'。

```js
number posFromDate(Date date)
```

| 参数 | 参数类型 | 描述                   |
| ---- | -------- | ---------------------- |
| date | Date     | 想要获取对应时间的位置 |

| 返回值类型 | 描述                                  |
| ---------- | ------------------------------------- |
| number     | 时间轴中指定日期的x坐标(以像素为单位) |

![image-20191226094910604](./image/image-20191226094910604.png)

### [甘特图滚动优化版](https://snippet.dhtmlx.com/fdeacfd0f)

## isTaskVisible

​	检查指定任务是否当前在甘特图中呈现

```js
boolean isTaskVisible（string | number id）;
```

| 参数 | 参数类型         | 描述     |
| ---- | ---------------- | -------- |
| id   | string \| number | task的id |

| 返回值类型 | 描述                                               |
| ---------- | -------------------------------------------------- |
| boolean    | 如果任务在当前甘特图中呈现，则为*true*。否则为*假* |

```js
gantt.isTaskVisible("t_1"); // ->true/false
```

## getTaskByTime

​	返回指定时间段内发生的任务的集合

```js
	array getTaskByTime( [Date from,Date to] );
```

| 参数 | 参数类型 | 描述             |
| ---- | -------- | ---------------- |
| from | Date     | 该期间的开始日期 |
| to   | Date     | 该期间的结束日期 |

| 返回值类型 | 描述         |
| ---------- | ------------ |
| array      | 任务对象数组 |

```js
var tasks = gantt.getTaskByTime(new Date(2013,3,10),new Date(2013,4,10)); 
for (var i=0; i<tasks.length; i++){
       alert(tasks[i].text);
}
// or
var tasks = gantt.getTaskByTime();//返回所有task
```

## eachSelectedTask

​	遍历甘特图中的所有选定任务  

```js
void eachSelectedTask(function code);
```

| 参数 | 参数类型 | 描述                             |
| ---- | -------- | -------------------------------- |
| code | function | 迭代任务的功能。将任务ID作为参数 |

```js
gantt.batchUpdate(function () {
    gantt.eachSelectedTask(function(task_id){
        if(gantt.isTaskExists(task_id))
            gantt.deleteTask(task_id);
    });
});
```

## [DHTMLX-GANTT（甘特图配置）](https://blog.csdn.net/qq_24472595/article/details/81630117)

[官方文档](https://docs.dhtmlx.com/gantt/api__refs__gantt_props.html)

### autofit

- 表格列宽自适应

  | 类型    | 可选值     | 默认值 |
  | ------- | ---------- | ------ |
  | boolean | true/false | false  |

- demo:

  ```js
  gantt.config.autofit = false;
  gantt.init("gantt_here");
  ```

  

### autoscroll

- 把任务或者连线拖拽到浏览器屏幕外时，自动触发滚动效果，相当于拖动滚动条

  | 类型    | 可选值     | 默认值 |
  | ------- | ---------- | ------ |
  | boolean | true/false | false  |

- demo:

  ```js
  gantt.config.autoscroll = false;
  gantt.init("gantt_here");
  ```

  

### autoscroll_speed

- 自动滚动的速度 (ms)

  | 类型   | 默认值 |
  | ------ | ------ |
  | number | 30     |

- demo:

  ```js
  gantt.config.autoscroll = true;
  gantt.config.autoscroll_speed = 50;
  
  gantt.init("gantt_here");
  ```

### autosize

- 自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务

  | 类型    | 可选值                   | 默认值 |
  | ------- | ------------------------ | ------ |
  | boolean | true/false               | false  |
  | string  | “y” ( = true), “x”, “xy” | -      |

- demo:

  ```js
  gantt.config.autosize = "xy";
  gantt.init("gantt_here");
  ```

### autosize_min_width

- 在使用图表宽度自适应模式(autosize = ‘x’ or ‘xy’)时， 图表的最小宽度

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 0      |

- demo:

  ```js
  gantt.config.autosize = "xy";
  gantt.config.autosize_min_width = 800;
  
  gantt.init("gantt_here");
  ```

### buttons_left

- 弹出框左下角的按钮

  | 类型  | 可选值                                                       | 默认值                                |
  | ----- | ------------------------------------------------------------ | ------------------------------------- |
  | array | “gantt_save_btn”,”gantt_cancel_btn”, “complete_button”, “gantt_delete_btn” | [“gantt_save_btn”, “gantt_cancel_bt”] |

- demo:

  ```js
  <style>
  .complete_button{
      margin-top: 2px;
      background-image:url("common/v_complete.png");
      width: 20px;
  }
  </style>
  <script>
      gantt.locale.labels["complete_button"] = "Complete";
      gantt.attachEvent("onGanttReady", function(){                               
          gantt.config.buttons_left = ["gantt_save_btn","gantt_cancel_btn",           
              "complete_button"];                                                 
      });                                                                         
      gantt.init("gantt_here");
  
      gantt.attachEvent("onLightboxButton", function(button_id, node, e){
          if(button_id == "complete_button"){
              var id = gantt.getState().lightbox;
              gantt.getTask(id).progress = 1;
              gantt.updateTask(id);
              gantt.hideLightbox();
          }
      });
  </script>
  ```

- [官网有图说明](https://docs.dhtmlx.com/gantt/api__gantt_buttons_left_config.html)

### buttons_right

- 弹出框右下角的按钮

  | 类型  | 可选值                                                       | 默认值               |
  | ----- | ------------------------------------------------------------ | -------------------- |
  | array | “gantt_save_btn”,”gantt_cancel_btn”, “complete_button”, “gantt_delete_btn” | [“gantt_delete_btn”] |

- demo:

  ```js
  <style>
      .complete_button{
          margin-top: 2px;
          background-image:url("common/v_complete.png");
          width: 20px;
      }
  </style>
  <script>
      gantt.locale.labels["complete_button"] = "Complete";
      gantt.attachEvent("onGanttReady", function(){                               
          gantt.config.buttons_right = ["gantt_delete_btn","complete_button"];                                 
      });                                                                         
      gantt.init("gantt_here");
  
      gantt.attachEvent("onLightboxButton", function(button_id, node, e){
          if(button_id == "complete_button"){
              var id = gantt.getState().lightbox;
              gantt.getTask(id).progress = 1;
              gantt.updateTask(id);
              gantt.hideLightbox();
          }
      });
  </script>
  ```

- [官网有图说明](https://docs.dhtmlx.com/gantt/api__gantt_buttons_right_config.html)

### calendar_property

- 修改要绑定到task/group的calender属性

  | 类型   | 可选值 | 默认值      |
  | ------ | ------ | ----------- |
  | string | 属性名 | calendar_id |

- demo:

  ```js
  gantt.config.calendar_property = "property_name";1
  ```

- calendar属性：

  ```js
  {
      "id":2,
      "calendar_id":"custom",
      "text":"Task #1",
      "start_date":"02-04-2013",
      "duration":"8",
      "parent":"1",
      "progress":0.5,
      "open": true
  }
  ```

  

### cascade_delete

- 开启级联删除tasks和links

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.cascade_delete = false;
  gantt.init("gantt_here");
  ```

### columns

- 表格列设置

  | 类型  | 可选值 | 默认值 | 备注                 |
  | ----- | ------ | ------ | -------------------- |
  | array | -      | -      | 数组的每一项表示一列 |

- demo:

  ```js
  // default columns definition
  gantt.config.columns=[
      {name:"text",       label:"Task name",  tree:true, width:'*' },
      {name:"start_date", label:"Start time", align: "center" },
      {name:"duration",   label:"Duration",   align: "center" },
      {name:"add",        label:"" },
      {name:"staff",      label:"Holder(s)", template:function(obj){
                              return obj.holder+"("+obj.progress+")"} }
  ];
  gantt.init("gantt_here");
  ```

- 列属性详情

  | 属性      | 说明                                                         | 值                        |
  | --------- | ------------------------------------------------------------ | ------------------------- |
  | align     | 设置标题水平对齐位置                                         | ‘left’, ‘center’, ‘right’ |
  | hide      | 显示/隐藏列（pro收费版支持）                                 | boolean                   |
  | label     | 标题内容                                                     | string                    |
  | max_width | resize操作时的最大宽度                                       | number                    |
  | min_width | resize操作时的最小宽度                                       | number                    |
  | name      | 列ID, 这个ID名称只能是特定的名称, 比如name: ‘add’的效果是该列会有一个+号，点击可以新增列的效果 | string                    |
  | resize    | 允许通过拖拽的方式border改变列的宽度(pro收费版支持)          | boolean                   |
  | template  | 列模版渲染方法                                               | function                  |
  | tree      | 设置该列为树形控件                                           | boolean                   |
  | width     | 定义宽度                                                     | number                    |

### correct_work_time

- 拖拽task的时候，自动将起始时间和结束时间矫正为工作日

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- *备注：起始和结束时间遇到周末的时候，自动把时间改为工作日的时间*

- demo:

  ```js
  gantt.config.work_time = true;
  gantt.config.correct_work_time = true;
  
  gantt.init("gantt_here");
  ```

- [官网有图说明](https://docs.dhtmlx.com/gantt/api__gantt_correct_work_time_config.html)

### date_grid

- 设置“开始时间”所在的列的时间格式

  | 类型   | 可选值 | 默认值     |
  | ------ | ------ | ---------- |
  | string | -      | “%Y-%m-%d” |

- demo:

  ```js
  gantt.config.date_grid = "%d/%m/%Y";
  
  gantt.init("gantt_here");
  ```

### date_scale

- 设置x轴的日期格式

  | 类型   | 可选值 | 默认值  |
  | ------ | ------ | ------- |
  | string | -      | “%d %M” |

- demo:

  ```js
  gantt.config.scale_unit = "month";
  gantt.config.step = 1;
  gantt.config.date_scale = "%F, %Y";
  
  gantt.init("gantt_here");
  ```

### details_on_create

- 点击 + 号添加列时，弹出lightbox弹出框

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.details_on_create = true;
  gantt.init("gantt_here");
  ```

### details_on_dblclick

- 双击task时，弹出lightbox弹出框

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.details_on_dblclick = true;
  gantt.init("gantt_here");
  ```

### drag_lightbox

- 允许鼠标通过按住的lightbox头部拖拽的方式，调整lightbox的位置

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.drag_lightbox = false;
  gantt.init("gantt_here");
  ```

### drag_links

- 允许通过拖拽的方式新增任务依赖的线条

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.drag_links = false;
  gantt.init("gantt_here");
  ```

### drag_mode

- 保存拖拽模式下，允许的拖拽类型

  | 类型   | 可选值 | 默认值                                                       |
  | ------ | ------ | ------------------------------------------------------------ |
  | object | -      | { “resize”:”resize”, “progress”:”progress”, “move”:”move”, “ignore”:”ignore” } |

- demo:

  ```js
  gantt.attachEvent("onBeforeTaskDrag", function(id, mode, e){
      var modes = gantt.config.drag_mode;
      switch (mode){
          case modes.move:
  
          break;
          case modes.resize:
  
          break;
          case modes.progress:
  
          break;
  
      }
      //...
  });
  ```

- detail

  - ”resize” - 用户通过拖拽任务的条形图来改变工期时触发
  - “progress” - 用户推拽条形图上用来调整进度百分比的小按钮时触发
  - “move” - 用户拖动条形图来改变位置时触发
  - “ignore” - 忽略拖拽行为

### drag_move

- 允许用户拖动条形图来改变位置

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.drag_move = false;
  gantt.init("gantt_here");
  ```

### drag_progress

- 允许用户推拽条形图上用来调整进度百分比的小按钮

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.drag_progress = false;
  gantt.init("gantt_here");
  ```

### drag_resize

- 允许用户通过拖拽任务的条形图的两端来改变工期

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.drag_resize = false;
  gantt.init("gantt_here");
  ```

### duration_step

- 工期计算的倍数

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | 1      |

- demo:

  ```js
  gantt.config.duration_unit = "hour";
  gantt.config.duration_step = 3; 
  //当 task.duration = 2时, 工期为6 小时 (3*2)
  ```

### duration_unit

- 工期计算的基本单位

  | 类型   | 可选值                                           | 默认值 |
  | ------ | ------------------------------------------------ | ------ |
  | string | “minute”, “hour”, “day”, “week”, “month”, “year” | “day”  |

- demo:

  ```js
  gantt.config.duration_unit = "hour";
  gantt.config.duration_step = 3; 
  //当 task.duration = 2时, 工期为6 小时 (3*2)
  ```

### editable_property

- changes the name of a property that affects the editing ability of tasks/links in the read-only Gantt chart

  | 类型   | 可选值 | 默认值     |
  | ------ | ------ | ---------- |
  | string | -      | “editable” |

- demo:

  ```js
  gantt.config.editable_property = "property_name";
  ```

### editor_types

- 定义行内编辑器类型, 定义好的类型，可以设置到colomuns配置

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | object | -      | -      |

- demo:

  ```js
  gantt.config.editor_types.custom_editor = {// custom editor logic}
  
  
  var textEditor = {type: "text", map_to: "text"};
  var dateEditor =  {type: "date", map_to: "start_date", min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)};
  
  gantt.config.columns = [
      {name: "text", label: "Task name", tree: true, width: "*", editor: textEditor},
      {name: "start_date", label: "Start time", align: "center", editor: dateEditor}
  ];
  ```

- 预先已经定义好的行内编辑器类型

  - text editor：编辑text类型的列，比如task的名称
  - number editor：编辑数值类型，比如工期duration，顺序order等
  - date editor：日期编辑器，编辑起始时间和结束时间的列
  - select editor：选择器
  - predecessor editor： for setting task-predecessor for the currently edited task. This editor gets the WBS codes of tasks to set connection with the predecessor task.

### end_date

- 设置图表区域的日期坐标最大值

  | 类型 | 可选值 | 默认值 |
  | ---- | ------ | ------ |
  | Date | -      | -      |

- demo:

  ```js
  gantt.config.start_date = new Date(2013, 08, 10);
  gantt.config.end_date = new Date(2013, 08, 20);
  gantt.init("gantt_here");
  ```

### fit_tasks

- 当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.fit_tasks = true; 
  gantt.init("gantt_here");
  ```

- detail

  - 默认情况下， 用户增加task的长度时，只能增加到当前坐标轴的最大值。有时候想要继续增加task的长度，就需要设置这个选项，让坐标轴能重新渲染增加长度。
  - 有的通过设置工期来增加task的长度时，超出坐标轴的那部分也不会显示。
  - [官网有图说明](https://docs.dhtmlx.com/gantt/api__gantt_fit_tasks_config.html)

### grid_resizer_attribute

- 设置 resizer(调整宽度的那个东西) DOM元素的属性名

  | 类型   | 可选值 | 默认值       |
  | ------ | ------ | ------------ |
  | string | -      | grid_resizer |

- demo:

  ```js
  gantt.config.grid_resizer_attribute = "gridresizer";
  ```

### grid_resizer_column_attribute

- 设置列表resizer DOM元素的属性名， 这个属性表示列表的索引

  | 类型   | 可选值 | 默认值       |
  | ------ | ------ | ------------ |
  | string | -      | column_index |

- demo:

  ```js
  gantt.config.grid_resizer_column_attribute = "col_index";//"column_index" -> "col_index"
  ```

### grid_width

- 设置左侧表格的宽度

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 350    |

- demo:

  ```js
  gantt.config.grid_width = 400;
  
  gantt.init("gantt_here");
  ```

### inherit_scale_class

- 子坐标轴是否使用 scale_cell_class模版

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.inherit_scale_class=true;
  gantt.init("gantt_here");
  ```

### initial_scroll

- timeline区域是否自动初始化滚动, 用于显示更早之前的任务

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.initial_scroll = false;
  gantt.init("gantt_here");
  ```

### keyboard_navigation_cells

- 激活表格相关快捷键

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.keyboard_navigation_cells = true;
  ```

### layout

- 定义整个甘特图的布局

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | object | -      | -      |

- demo:

  ```js
  gantt.config.layout = {
      css: "gantt_container",
      rows:[
        {
          cols: [
            {view: "grid", id: "grid", scrollX:"scrollHor", scrollY:"scrollVer"},
            {resizer: true, width: 1},
            {view: "timeline", id: "timeline", scrollX:"scrollHor", scrollY:"scrollVer"},
            {view: "scrollbar", scroll: "y", id:"scrollVer"}
          ]
         },
        {view: "scrollbar", scroll: "x", id:"scrollHor", height:20}
      ]
  };
  ```

### lightbox

- 定义lightbox弹出框

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | object | -      | -      |

- demo:

  ```js
  gantt.config.lightbox.sections = [
      {name:"description", height:38, map_to:"text", type:"textarea",focus:true},
      {name:"priority", height:22, map_to:"priority",type:"select",options:opts},                                                                        
      {name:"time", height:72, type:"duration", map_to:"auto"}
  ];
  
  gantt.init("gantt_here");
  ```

- detail

  - lightbox有一个属性sections（有没有其他属性官网也没有说）
  - sections是一个对象数组，每个对象的属性如下

  | 属性          | 说明                                                         | 值                                                           |
  | ------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | name          | 名称用于索引国际化后的实际内容， 如name = time section,最后读取的是gantt.locale.labels.section_time的内容 | string                                                       |
  | height        | section高度                                                  | number                                                       |
  | map_to        | data的属性名, 将相应的data属性映射到section                  | string                                                       |
  | type          | section的编辑器类型                                          | string                                                       |
  | time_format   | section为”duration”或者”time”时的时间选择器顺序              | string                                                       |
  | focus         | 设置为true时， 将会在lightbox打开时自动focus(聚焦)           | boolean                                                      |
  | default_value | 该section编辑器的默认值                                      | any                                                          |
  | onchange      | 选择器的选项改变时触发                                       | function                                                     |
  | options       | 编辑器的候选项， 用于选择器，单选radio，多选checkbox         | 形如{ key: 1, lable: ‘demo’ } 的对象数组 array of objects    |
  | readonly      | 只读模式, 用在time and duration                              | boolean                                                      |
  | year_range    | 年份选择器的范围                                             | array/number, 数组形式:[2005 - 2025];number:10 = [current, current + 10] |
  | single_date   | 设置后只有开始日期start Date可以选择，结束时间等于同一天，这个对于选择里程碑比较有用 | boolean                                                      |
  | allow_root    | 设置为true的时候，会新增一个选项用于设置所有任务的根节点，使用的时候，要跟root_label属性一起使用（section是parent的时候才有） | boolean                                                      |
  | root_label    | 设置根节点的label（section是parent的时候才有）               | string                                                       |
  | filter        | 选择器的过滤方法                                             | function                                                     |
  | sort          | 选择器的排序方法                                             | function                                                     |
  | template      | 选择器的option渲染方法（section是parent的时候才有）          | function                                                     |

### lightbox_additional_height

- 设置lightbox的header和footer的高度 (height = header + footer)

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 75     |

- demo:

  ```js
  gantt.config.lightbox_additional_height = 90;
  gantt.init("gantt_here");
  ```

### link_arrow_size

- 连线的箭头大小

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 6      |

- demo:

  ```js
  gantt.config.link_arrow_size = 8;
  gantt.init("gantt_here");
  ```

### link_attribute

- 连线dom元素上存储ID值的属性名

  | 类型   | 可选值 | 默认值    |
  | ------ | ------ | --------- |
  | string | -      | ‘link_id’ |

- demo:

  ```js
  gantt.config.link_attribute = "l_id"
  gantt.init("gantt_here");
  // <div class="grantt_task_link" l_id="14">...<div>
  ```

### link_line_width

- 连线的线条宽度

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 2      |

- demo:

  ```js
  gantt.config.link_line_width = 3;
  gantt.init("gantt_here");
  ```

### link_wrapper_width

- 连线的拓展宽度，用于增加点击的范围

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 20     |

- demo:

  ```js
  gantt.config.link_wrapper_width = 30;
  gantt.init("gantt_here");
  ```

- [官网图解](https://docs.dhtmlx.com/gantt/api__gantt_link_wrapper_width_config.html)

### links

- 存储线条的依赖

  | 类型   | 可选值 | 默认值                                                       |
  | ------ | ------ | ------------------------------------------------------------ |
  | object | -      | { “finish_to_start”:”0”, “start_to_start”:”1”, “finish_to_finish”:”2”, “start_to_finish”:”3” } |

- demo:

  ```js
  var type1 = gantt.config.links.finish_to_start;
  ```

- detail

  - ”finish_to_start”: 后置任务需要等待前置任务（依赖）完成才允许开始
  - “start_to_start” - 后置任务需要等待前置任务开始才允许开始
  - “finish_to_finish” - 后置任务需要等到前置任务结束才允许结束
  - “start_to_finish” - 后置任务需要等到前置任务开始才允许结束

### min_column_width

- 时间轴列的最小宽度

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 70     |

- demo:

  ```js
  gantt.config.min_column_width = 100;
  gantt.init("gantt_here");
  ```

### min_duration

- 调整timeline上task的长度时， 工期的变化幅度

  | 类型   | 可选值 | 默认值          |
  | ------ | ------ | --------------- |
  | number | -      | 60*60*1000 (ms) |

- demo:

  ```js
  gantt.config.min_duration = 24*60*60*1000;// 1 day
  gantt.init("gantt_here");
  ```

### min_grid_column_width

- 左侧表格列的最小宽度

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 70     |

- demo:

  ```js
  gantt.config.min_grid_column_width = 100;
  gantt.init("gantt_here");
  ```

### multiselect

- 是否开启task任务多选

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.multiselect = false;
  gantt.init("gantt_here");
  ```

### multiselect_one_level

- 任务多选的情况下，规定只能选取同一个level的任务

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.multiselect_one_level = true; 
  gantt.init('gantt_here');
  
  //前提时开启多选，下面是错误的例子
  gantt.config.multiselect = false;   //关闭了多选
  gantt.config.multiselect_one_level = true; 
  gantt.init("gantt_here");
  ```

### open_tree_initially

- 初始化的时候就展开树结构

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.open_tree_initially = true;
  gantt.init("gantt_here");
  ```

### order_branch

- 左侧树型结构调整时，只允许将任务拖放到某个父节点下

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.order_branch = true;
  gantt.init("gantt_here");
  ```

### order_branch_free

- 左侧树型结构调整时，可以任意拖动任务到任意节点下

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  // reordering tasks within the whole gantt
  gantt.config.order_branch = true;
  gantt.config.order_branch_free = true;
  gantt.init("gantt_here");
  ```

### placeholder_task

- 在左侧任务列表的最后新增一个空白列，填写之后可以新增任务

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.placeholder_task = true;
  gantt.init("gantt_here");
  ```

- detail

  - 自动新增一个空白列到列表的最后
  - 只要UI修改了空白列的内容，并且执行gantt.updateTask()方法，就会追到新的任务到任务列表末尾。
  - 通过空白列新增的任务可以用下面的方法判断
    `if(task.type == gantt.config.types.placeholder){// do something}`
  - 通过这个方法新建任务后，会触发onTaskCreated和onAfterTaskAdd事件
  - gantt.dataProcessor也会触发onBeforeUpdate事件, 但不会触发后端的请求。

### preserve_scroll

- 图表刷新后，滚动条的位置跟原来保持一致

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.preserve_scroll = false;
  gantt.init("gantt_here");
  ```

### prevent_default_scroll

- 阻止鼠标滚动事件冒泡

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.prevent_default_scroll = false;
  gantt.init("gantt_here");
  ```

- detail

  - 禁用该选项的时候，滚动鼠标只滚动图表内部的滚动条，图表外部的滚动条不滚动（接收不到滚动事件）

### quick_info_detached

- 在所选任务的附近弹出quick_info组件（一个popup组件）

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.quick_info_detached = false;
  gantt.init("gantt_here");
  ```

### quickinfo_buttons

- 定义quickinfo组件的按钮

  | 类型  | 可选值 | 默认值                      |
  | ----- | ------ | --------------------------- |
  | array | -      | [“icon_delete”,”icon_edit”] |

- demo:

  ```js
  gantt.config.quickinfo_buttons=["icon_delete","icon_edit","advanced_details_button"]; 
  gantt.locale.labels["advanced_details_button"] = "Advanced Info";
  gantt.init("gantt_here");
  
  gantt.$click.buttons.advanced_details_button=function(e, id, trg){
      alert("These are advanced details"); 
      return false; //blocks the default behavior
  };
  ```

### readonly

- 只读模式的甘特图

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.readonly=true;
  gantt.init("gantt_here");
  ```

### readonly_property

- 影响任务是否只读的属性, 这个属性是Data数据里面的某个键, 当该键对应的值为true时，所在的link或者task为只读

  | 类型   | 可选值 | 默认值     |
  | ------ | ------ | ---------- |
  | string | -      | “readonly” |

- demo:

  ```js
  gantt.config.readonly_property = "property_name";
  gantt.init("gantt_here");
  ```

### redo

- 开启重做功能

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.redo = true;
  gantt.init("gantt_here");
  ```

### resource_calendars

- 给用户绑定工作日日历

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | object | -      | -      |

- demo:

  ```js
  // 添加一个工作日日历
  var johnCalendarId = gantt.addCalendar({
      worktime: {
          days: [0, 1, 0, 0, 0, 0, 0] //第一天是周日， 只有周一上班
      }
  }),
  
  // 绑定用户
  gantt.config.resource_calendars = {
    "user":{
        1 : johnCalendarId
     }
  };
  
  // 指定日历到特定的任务
  {
      "id":3, 
      "user:"1",
      "text":"Task #2", 
      "start_date":"11-04-2013", 
      "duration":"4", 
      "parent":"1", 
      "progress": 0.6, 
      "open": true
  }
  ```

### resource_render_empty_cells

- 是否调用模版方法渲染source时间轴的空白元素。

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.resource_render_empty_cells = true;
  gantt.init("gantt_here");
  ```

### root_id

- 设置虚拟根节点的ID

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | string | -      |

- demo:

  ```js
  gantt.config.root_id = "root";  
  
  var tasks =  {
      data:[
        {id:1, text:"Project #2", start_date:"01-04-2013", duration:18, parent:"root"},  // 这里的parent为定义的根节点ID
        {id:2, text:"Task #1",    start_date:"02-04-2013", duration:8,  parent:1},
        {id:3, text:"Task #2",    start_date:"11-04-2013", duration:8,  parent:1}
      ],
      links:[]
  };
  
  gantt.init("gantt_here");
  
  gantt.parse(tasks);
  ```

### round_dnd_dates

- 将任务开始时间和结束时间自动“四舍五入”, 从而对齐坐标轴刻度

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.round_dnd_dates = false;
  gantt.init("gantt_here");
  ```

### row_height

- 定义甘特图的行高

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 25se   |

- demo:

  ```js
  gantt.config.row_height = 40;
  gantt.init("gantt_here");
  ```

### rtl

- 定义甘特图为从右到左（本来是从左到右）显示模式， 除了修改控件的布局，还修改了坐标轴的方向，列的渲染顺序

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.rtl = true;
  gantt.config.layout = {
      css: "gantt_container",
      rows: [
          {
              cols: [
                  {view: "scrollbar", id: "scrollVer"},
                  {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
                  {resizer: true, width: 1},
                  {view: "grid", scrollX: "scrollHor", scrollY: "scrollVer"}
              ]
          },
          {view: "scrollbar", id: "scrollHor", height: 20}
      ]
  };
  gantt.init("gantt_here");
  ```

### scale_height

- 设置甘特图的表头高度

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 35     |

- demo:

  ```js
  gantt.config.scale_height = 50;
  gantt.init("gantt_here");
  ```

### scale_offset_minimal

- sets the minimal scale unit (in case multiple scales are used) as the interval of leading/closing empty space

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.scale_offset_minimal = false;
  ```

- detail

  - If the scale interval is not strictly specified ( by the start_date, end_date options) dhtmlxGantt calculates it based on the dates of the earliest and latest tasks. Plus, it adds an empty interval to the beginning and end of the scale. By default, this ‘empty’ interval is equal to the minimum unit of used scale (in case multiple scales are used).
  - If you disable the option, dhtmlxGantt will add an empty interval egual to the value of the scale_unit option.

### scale_unit

- 设置时间坐标轴单位

  | 类型   | 可选值                                                      | 默认值 |
  | ------ | ----------------------------------------------------------- | ------ |
  | string | “minute”, “hour”, “day”, “week”, “quarter”, “month”, “year” | “day”  |

- demo:

  ```js
  gantt.config.scale_unit = "month";
  gantt.config.date_scale = "%F, %Y";
  gantt.init("gantt_here");
  ```

- 可以[自定义](https://docs.dhtmlx.com/gantt/desktop__configuring_time_scale.html#settingacustomscale)单位

### scroll_on_click

- 当点击任务时，时间轴的滚动条滚动，将任务放在可见的范围。

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.scroll_on_click= false;
  gantt.init("gantt_here");
  ```

### scroll_size

- 水平或垂直滚动条尺寸

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | -      |

- demo:

  ```js
  gantt.config.scroll_size = 20;
  gantt.init("gantt_here");
  ```

### select_task

- 任务可以点击选中

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.select_task  = false;
  gantt.init("gantt_here");
  ```

### server_utc

- 当发送数据给后端，将UTC时间转换成local时间

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.server_utc = true;
  gantt.init("gantt_here");
  ```

### show_chart

- 是否显示时间轴

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  //隐藏时间轴
  gantt.config.show_chart = false;
  gantt.init("gantt_here");
  ```

### show_errors

- 发生异常时，允许弹出警告到UI界面

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.show_errors = false;
  ```

### show_grid

- 是否显示左侧表格

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  //隐藏表格
  gantt.config.show_grid = false;
  ```

### show_links

- 是否显示依赖连线

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.show_links = false;
  ```

### show_markers

- 是否显示标记线

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  var marker1 = gantt.addMarker({ ...}); 
  var marker2 = gantt.addMarker({ ...}); 
  var marker3 = gantt.addMarker({ ...}); 
  
  gantt.config.show_markers = false;// 隐藏所有标记
  ```

### show_progress

- 是否在任务条形图中显示制进度条（通常以不同颜色区分）

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.show_progress = true;
  gantt.init("gantt_here");
  ```

### show_quick_info

- 是否显示quick_info（带有任务信息的popup表单）

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.show_quick_info = false;
  gantt.init("gantt_here");
  ```

### show_task_cells

- 时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状。

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.show_task_cells = false;
  gantt.init("gantt_here");
  ```

### show_unscheduled

- 为true时，树形结构会显示没有排期的任务节点，并且左侧的表格没有时间轴条形图。设置为false的时候，会强制给任务设置起始时间，左侧的表格会有时间轴条形图。

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.show_unscheduled = true;
  gantt.init("gantt_here");
  ```

### smart_rendering

- 按需渲染（原谅我的翻译），仅仅渲染在屏幕可见的那部分任务和依赖线。这个在显示大量的任务时，性能比较高。不过需要引入插件 dhtmlxgantt_smart_rendering.js

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.smart_rendering = true;
  gantt.init("gantt_here");
  ```

### smart_scales

- 按需渲染（原谅我的翻译），仅仅渲染在屏幕可见的那部分时间轴。在处理时间轴非常长的时候，可以提升性能。需要引入插件 dhtmlxgantt_smart_rendering.js

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.smart_scales = true;
  ```

### sort

- 启用排序功能，点击表头可以排序

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.sort = true;
  gantt.init("gantt_here");
  ```

### start_date

- 设置时间轴起始时间

  | 类型 | 可选值 | 默认值 |
  | ---- | ------ | ------ |
  | Date | -      | -      |

- demo:

  ```js
  gantt.config.start_date = new Date(2013, 08, 10);
  gantt.config.end_date = new Date(2013, 08, 20);
  gantt.init("gantt_here");
  ```

### start_on_monday

- 将每周的第一天设置为周一，否则为周日。

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.start_on_monday = false; // 第一天将变为周日
  gantt.init("gantt_here");
  ```

### step

- 时间轴的X坐标值之间的间隔

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 1      |

- demo:

  ```js
  gantt.config.scale_unit = "year";
  gantt.config.step = 1;
  gantt.config.date_scale = "%Y";
  gantt.init("gantt_here");
  ```

### subscales

- 设置子坐标轴，将会在时间轴X的下面新增一行或多行坐标轴X（只不过单位粒度不一样），新增行数取决于数组的长度，即数组每一项表示一行

  | 类型  | 可选值 | 默认值 |
  | ----- | ------ | ------ |
  | array | -      | []     |

- demo:

  ```js
  gantt.config.scale_unit = "month";
  
  gantt.config.subscales = [
      {unit:"week", step:1, template:weekScaleTemplate},
      {unit:"day",  step:1, date:"%D" }
  ];
  
  gantt.init("gantt_here");
  ```

- detail

  - 对象数组的对象属性

  | 属性     | 描述                                                         | 值                 |
  | -------- | ------------------------------------------------------------ | ------------------ |
  | css      | 生成坐标轴每个列的CSS类名的函数，参数当前坐标轴时间点的对象  | function           |
  | format   | 时间轴label的显示格式                                        | string             |
  | step     | X值的间隔                                                    | string， 默认1     |
  | template | 比format更高级的用法，用函数生成label，参数当前坐标轴时间点的对象 | function           |
  | unit     | 时间轴的单位：”minute”, “hour”, “day”, “week”, “month”, “year” | string, 默认 “day” |

### task_attribute

- 任务ID要放在dom节点的哪个属性

  | 类型   | 可选值 | 默认值  |
  | ------ | ------ | ------- |
  | string | -      | task_id |

- demo:

  ```js
  gantt.config.task_attribute = "t_id"
  gantt.init("gantt_here");
  // <div t_id=11 class='gantt_task_line'></div>
  ```

### task_date

- lightbox的任务时间选择部分中，时间的显示格式

  | 类型   | 可选值 | 默认值     |
  | ------ | ------ | ---------- |
  | string | -      | “%d %F %Y” |

- demo:

  ```js
  gantt.config.task_date = "%d-%m-%Y";
  gantt.init("gantt_here");
  ```

### task_height

- 时间轴图表中，任务条形图的高度

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 24     |

- demo:

  ```js
  gantt.config.task_height = 30;
  gantt.init("gantt_here");
  ```

### task_scroll_offset

- 坐标轴左侧的边框最近的任务的距离（像素值）

- 备注：每次选中任务的时候，会适调整水平滚动条的位置，让最近的任务跟时间轴图表最左侧的距离保持一定的offset

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 100    |

- demo:

  ```js
  gantt.config.task_scroll_offset = 120;
  gantt.init("gantt_here");
  ```

### time_picker

- lightbox的时间选择区域中， 时间下拉选择控件每一项的显示格式

  | 类型   | 可选值 | 默认值  |
  | ------ | ------ | ------- |
  | string | -      | “%H:%i” |

- demo:

  ```js
  gantt.config.time_picker = "%H:%s";
  gantt.init("gantt_here");
  ```

### time_step

- 任务的时间间隔

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 60     |

- demo:

  ```js
  gantt.config.time_step = 15;
  gantt.init("gantt_here");
  ```

- detail

  - 任务的开始和结束时间将会时这个step值的整数倍，比如time_step=20,开始时间只有XX:0,XX:20,XX:40分
  - lightbox 时间选择器的间隔保持一直

### tooltip_hide_timeout

- 设置当鼠标离开任务后，tooltip还会显示多长时间(ms)才关闭。

- 备注：如果是鼠标移动到其他的任务，在这个间隔内如果没有关闭，当显示其他任务tooltip后，前一个计时不再生效。

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | -      |

- demo:

  ```js
  gantt.config.tooltip_hide_timeout = 5000;
  gantt.init("gantt_here");
  ```

### tooltip_offset_x

- tooltip距离鼠标的水平偏移

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 10     |

- demo:

  ```js
  gantt.config.tooltip_offset_x = 30;
  gantt.init("gantt_here");
  ```

### tooltip_offset_y

- tooltip距离鼠标的垂直偏移

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 20     |

- demo:

  ```js
  gantt.config.tooltip_offset_y = 40;
  gantt.init("gantt_here");
  ```

### tooltip_timeout

- 设置tooltip要鼠标悬停多久才显示出来

  | 类型   | 可选值 | 默认值  |
  | ------ | ------ | ------- |
  | number | -      | 30 (ms) |

- demo:

  ```js
  gantt.config.tooltip_offset_x = 50;
  gantt.init("gantt_here");
  ```

### touch

- 开启触屏模式

  | 类型           | 可选值              | 默认值 |
  | -------------- | ------------------- | ------ |
  | boolean,string | true,false, ‘force’ | -      |

- demo:

  ```js
  gantt.config.touch = "force";
  gantt.init("gantt_here");
  ```

- detail

  - true: 通过浏览器UA来识别触屏设备，识别到则开启触屏模式
  - ‘force’: 不检测UA，直接开启触屏模式
  - false: 禁用触屏模式

### touch_drag

- 触屏设备，定义时间长按首饰响应时间。用于区分滚动操作和长按操作。设置false时无法拖动任务

  | 类型           | 可选值 | 默认值 |
  | -------------- | ------ | ------ |
  | number,boolean | -      | 50     |

- demo:

  ```js
  gantt.config.touch_drag = 75;
  gantt.init("gantt_here");
  ```

### touch_feedback

- 触屏拖放操作时，有震动反馈。

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.touch_feedback = false;
  gantt.init("gantt_here");
  ```

- detail

  - 注意，该选项的前提时touch选项不是false, 并且浏览器支持[震动API](https://caniuse.com/#feat=vibration)

### touch_feedback_duration

- 定义震动反馈持续时间(ms)

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | -      |

- demo:

  ```js
  gantt.config.touch_feedback_duration = 1;
  gantt.init("gantt_here");
  ```

### undo

- 启用回退功能

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | true   |

- demo:

  ```js
  gantt.config.undo = true;
  gantt.init("gantt_here");
  ```

### undo_actions

- 设置可以回退的动作

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | object | -      | -      |

- demo:

  ```js
  gantt.config.undo_actions = {
      update:"update",
      remove:"remove", // remove an item from datastore
      add:"add"
  };
  ```

### undo_steps

- 设置可以回退的次数

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | number | -      | 10     |

- demo:

  ```js
  gantt.config.undo_steps = 10;
  gantt.init("gantt_here");
  ```

### undo_types

- 设置回退作用的实体

  | 类型   | 可选值 | 默认值 |
  | ------ | ------ | ------ |
  | object | -      | -      |

- demo:

  ```js
  gantt.config.undo_types = {
      link:"link",
      task:"task"
  };
  ```

### wai_aria_attributes

- 可访问性支持

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  gantt.config.wai_aria_attributes = true;
  gantt.init("gantt_here");
  ```

### work_time

- 以工作时间计算工期，比如忽略周末

  | 类型    | 可选值 | 默认值 |
  | ------- | ------ | ------ |
  | boolean | -      | false  |

- demo:

  ```js
  //calculates duration in working hours and hides non-working time from the chart
  gantt.config.duration_unit = "hour";
  gantt.config.work_time = true;
  gantt.config.skip_off_time = true;
  gantt.init("gantt_here");
  ```

### xml_date

- 定义从后端获取或发送到后端的日期数据解析格式

  | 类型   | 可选值 | 默认值           |
  | ------ | ------ | ---------------- |
  | string | -      | “%d-%m-%Y %H:%i” |

- demo:

  ```js
  gantt.config.xml_date="%Y-%m-%d %H:%i";
  gantt.init("gantt_here");
  gantt.load("../data/tasks.json");123
  ```
