#### **element-table**的使用：

  在el-table上绑定要显示的数据

```vue
<el-table style="width: 100%" :data="tableData">
```

 		然后再通过el-table-column写表头 其中label是显示在表头的内容，即列名，并且可以通过type属性selection设置选择框，

 		想要将数据插到每一行，可以通过在el-tabale-column下面添加一个template标签，并且将属性slot-scope设置成scope，最后通过在pre或者el-tag标签中使用插值表达式将内容输出

　**获取选择的所有行的数据**

首先给el-table标签中设置一个ref属性，然后就可以在方法中通过this.$ref.table.selection获取数据

![image-20200511161707848](..\image\image-20200511161707848.png)

​	**获取不同页选中的数据：**

　　　https://blog.csdn.net/xuelang532777032/article/details/84315294

　在el-table中添加一个row-key，并绑定一个方法getRowKeys（写在data返回的对象中）

同时在包含type=”selection”的el-table-column组件中添加

```
:reserve-selsection = “true
```

![image-20200511161801271](..\image\image-20200511161801271.png)![image-20200511161817991](..\image\image-20200511161817991.png)

这里的row.id要唯一，不然有警告Duplicate keys detected: '11'. This may cause an update error.

 

在**el-table的某一列想要添加图片**，需要在el-table-column中嵌套一个template标签，其中添加一个属性 slot-scope=”scope”，然后再通过img标签中的src请求资源

![image-20200511161842726](..\image\image-20200511161842726.png)

**el-form中插入一个图片**和表格不同，它绑定的是model属性，而el-table绑定的是data属性。el-form中将src和表单绑定的数据中的资源url绑定（el-table里面data 绑定的是多个对象，而el-form只是绑定一个对象）                             ![image-20200511161901505](..\image\image-20200511161901505.png)

![image-20200511161917632](..\image\image-20200511161917632.png)

**el-tag标签**的size属性尺寸，medium表示中等标签

```
:show-overflow-tooltip="true"  ：el-tabel-column的一个属性 文字不换行，溢出隐藏  
```



##### 分页标签 el-pagination   https://blog.csdn.net/Dg_Zing/article/details/87906371

　首先在data里面定义

```
// 分页相关
      currentPage: 1,  //当前页
      pageSize: 5,		 //总页数
      currentTotal: 0, //数据的数量

```

​	引入组件

```vue
<el-pagination background align="right" //分页的位置
    @size-change="handleSizeChange" //每页数量改变时计算当前页需要显示的数据
    @current-change="handleCurrentChange" //页数变化的处理
    :current-page="currentPage" :page-sizes="[5, 10, 20, 50]"
    :page-size="pageSize"  
    layout="total, sizes, prev, pager, next, jumper" 
    //数据总数，每页的数据数量，前一页，页码，下一页，跳转
    :total="currentTotal"> 
 </el-pagination>
```

 

获取数据之后，通过length方法得到数据的条数，然后将长度赋给currentTotal，

![image-20200511162039894](..\image\image-20200511162039894.png)

当每页显示的数据数量改变时：

// 通过操作把每页显示数量改变后，需要把data中的pageSize设为改变后的值

![image-20200511162105476](..\image\image-20200511162105476.png)

同时要将el-table的data绑定为showtable

​               ![image-20200511162146078](..\image\image-20200511162146078.png)

点击页数、上一页、下一页时

![image-20200511162226850](..\image\image-20200511162226850.png)

**El-upload组件**  

通过onUpLoadchange将图片的base64数据保存，并返回图片的信息

![image-20200511162248187](..\image\image-20200511162248187.png)

