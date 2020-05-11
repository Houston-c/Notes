### css 实现文字左右两边有一条线

![1571310408436](C:\Users\h1843\AppData\Roaming\Typora\typora-user-images\1571310408436.png)

效果是上面这样的，其实很简单就是在文字的伪类里面加横线就行了

```
<div class="title">
    这里标题内容
</div>
```

```
 .title{
            width:200px;
            height:50px;
            line-height:50px;
            text-align:center;
            position:relative;
        }


        .title::after, .title::before{
            position: absolute;
            width:30px;
            height:1px;
            background:#000;
            content:'';
            top:25px;
        }

 

        .title::after{
            left:0;
        }


        .title::before{
            right:0;
        }
```

#### 根据条件动态添加样式

```

<div :class="setLan==true?'style1 style2':'style3'" ></div>
```

**上三角**

```css
	.upArrow {
		width: 0px;
		height: 0px;
		border-style: solid;
		border-width: 0px 5px 5px 5px;
		/*border-top-width设置为0,为了让透明的顶部的三角形不占据空间*/
		border-color: transparent transparent #6A757E transparent;
	}
```

##### 大于号（右箭头）

```css
    .gl {
        width: 8px;
        height: 8px;
        margin-top: 10px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        -webkit-transform: translate(0, -50%) rotate(-135deg);
        transform: translate(0, -50%) rotate(-135deg);
    }
```

