##### 1、window.open()支持环境：

JavaScript1.0+/JScript1.0+/Nav2+/IE3+/Opera3+

##### 2、基本语法：

window.open(pageURL,name,parameters) 
其中：
	pageURL 为子窗口路径 
	name 为子窗口句柄 
	parameters 为窗口参数(各参数用逗号分隔) 

##### 3、示例

```
window.open ('page.html','newwindow','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')//写成一行 
```

　脚本运行后，page.html将在新窗体newwindow中打开，宽为100，高为400，距屏顶0象素，屏左0象素，无工具条，无菜单条，无滚动条，不可调整大小，无地址栏，无状态栏。

##### 4、各项参数

　　其中yes/no也可使用1/0；pixel value为具体的数值，单位象素

参数 | 取值范围 | 说明 

alwaysLowered | yes/no | 指定窗口隐藏在所有窗口之后 
alwaysRaised | yes/no | 指定窗口悬浮在所有窗口之上 
depended | yes/no | 是否和父窗口同时关闭 
directories | yes/no | Nav2和3的目录栏是否可见 
height | pixel value | 窗口高度 
hotkeys | yes/no | 在没菜单栏的窗口中设安全退出热键 
innerHeight | pixel value | 窗口中文档的像素高度 
innerWidth | pixel value | 窗口中文档的像素宽度 
location | yes/no | 位置栏是否可见 
menubar | yes/no | 菜单栏是否可见 
outerHeight | pixel value | 设定窗口(包括装饰边框)的像素高度 
outerWidth | pixel value | 设定窗口(包括装饰边框)的像素宽度 
resizable | yes/no | 窗口大小是否可调整 
screenX | pixel value | 窗口距屏幕左边界的像素长度 
screenY | pixel value | 窗口距屏幕上边界的像素长度 
scrollbars | yes/no | 窗口是否可有滚动栏 
titlebar | yes/no | 窗口题目栏是否可见 
toolbar | yes/no | 窗口工具栏是否可见 
Width | pixel value | 窗口的像素宽度 
z-look | yes/no | 窗口被激活后是否浮在其它窗口之上

##### 5、多种示例

1）最基本的弹出窗口代码

```js
"javascript" > window.open ('page.html') 
```

2）经过设置后的弹出窗口

```js
"javascript">  window.open ('page.html','newwindow','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')//写成一行
```

参数解释： 

```js
<SCRIPT LANGUAGE="javascript"> js脚本开始； 
window.open 弹出新窗口的命令； 
'page.html' 弹出窗口的文件名； 
'newwindow' 弹出窗口的名字（不是文件名），非必须，可用空''代替； 
height=100 窗口高度； 
width=400 窗口宽度； 
top=0 窗口距离屏幕上方的象素值； 
left=0 窗口距离屏幕左侧的象素值； 
toolbar=no 是否显示工具栏，yes为显示； 
menubar，scrollbars 表示菜单栏和滚动栏。 
Resizable=no 是否允许改变窗口大小，yes为允许； 
location=no 是否显示地址栏，yes为允许； 
status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许； 
</SCRIPT> js脚本结束 
```



3）用函数控制弹出窗口

```js
<html> 
<head> 
<script LANGUAGE="JavaScript"> 
<!-- 
function openwin() { window.open ("page.html", "newwindow", "height=100, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no") 
//写成一行 
} 
//--> 
</script> 
</head> 
<body onload="openwin()"> 
…任意的页面内容… 
</body> 
</html>
```

这里定义了一个函数openwin(),函数内容就是打开一个窗口。在调用它之前没有任何用途。 
调用方法：
方法一：<body onload="openwin()"> 浏览器读页面时弹出窗口； 
方法二：<body onunload="openwin()"> 浏览器离开页面时弹出窗口； 
方法三：用一个连接调用： 

```
<a href="#" onclick="openwin()">打开一个窗口</a> 
```

注意：使用的"#"是虚连接。 
方法四：用一个按钮调用： 

注意：使用的"#"是虚连接。 
方法四：用一个按钮调用： 

4）同时弹出2个窗口

```js
<script LANGUAGE="JavaScript"> 
<!-- 
function openwin() 
{ window.open ("page.html", "newwindow", "height=100, width=100, top=0,left=0,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no") 
//写成一行 
window.open ("page2.html", "newwindow2", "height=100, width=100, top=100, left=100,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no") 
//写成一行 
} 
//--> 
</script>
```



5）主窗口打开文件1.htm，同时弹出小窗口page.html

```js
<script language="javascript"> 
<!-- 
function openwin() 
{window.open("page.html","","width=200,height=200") 
} 
//--> 
</script>
```

　　加入<body>区： 

```
<a href="1.htm" onclick="openwin()">open</a>即可。 
```



6）弹出的窗口之定时关闭控制

```js
<script language="JavaScript"> 
function closeit() 
{setTimeout("self.close()",10000) //毫秒} 
</script>
```

然后，再用<body onload="closeit()"> 这一句话代替page.html中原有的<BODY>这一句就可以了。



7）在弹出窗口中加上一个关闭按钮

```js
<FORM> 
<INPUT TYPE='BUTTON' VALUE='关闭' onClick='window.close()'> 
</FORM>
```

