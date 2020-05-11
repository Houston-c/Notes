**call，apply，bind的用法和区别**

**1.call**  用法：方法名.call  => function.call()   函数实例的call方法，可以指定函数内部this的指向（就是函数执行时的作用域），然后在该作用域中调用该函数，并且会立即调用该函数。
	例子：

```
var obj = {
    num: 123
};
var num = 456;

function a() {
    console.log(this.num);
}

a(); //456
a.call(); //456
a.call(null); //456
a.call(undefined); //456
a.call(this); //456
a.call(obj); //123
```

​	 call方法可以传递参数，call()中的**第一个参数**值指定的是函数调用时的作用域，**就是函数内部中this的指向**，**第二个以及后面的参数是需要传递的参数**。同时第一个参数是必须的，可以是null、undefined、this，此时a函数中的this指向是window。
​	call方法的应用：将类数组对象转换成数组

**2.apply ** 用法和call类似，也是改变this的指向（函数执行时所处的作用域)，在指定的作用域里调用函数，并且会立即执行函数。不同的是，apply将需要传递的参数放在一个数组中。
    apply的应用：

```
（1）找到数组中最大的数
var a = [2, 4, 5, 7, 8, 10]; 
    console.log(Math.max.apply(null, a)); //10
    console.log(Math.max.call(null,2, 4, 5, 7, 8, 10)); //10
```

    （2）将数组的空元素变为undefined
    Array.apply(null,a).forEach(function(index){
        console.log(index);    ////1,undefined,3  ，将空元素设置为undefined
    })								      
```
（3）将类数组对象转换成真正的数组
function func(a,b,c){
    return arguments;
}   
console.log(Array.prototype.slice.call(func(2,3,4)));    //[2,3,4
```

​	**3.bind**  用法：方法名.bind(this的指向)()    bind方法可以指定this的指向，然后返回一个新的函数，bind并不会立即执行这个函数，如果需要立即执行，可以再在后面添上一对小括号。 bind传递参数的方式与call相同。

```
function keith(a, b) {
        return a + b;
    }
    console.log(keith.apply(null,[1,4])); //5
    console.log(keith.call(null,1,4)); //5
    console.log(keith.bind(null, 1, 4)); //keith()
    console.log(keith.bind(null, 1, 4)()); //5	
```

**call和apply方法是在调用之后立即执行的，而bind是调用之后返回一个新函数，然后需要再调用一次。** 

**三者的联系与区别：**
	它们都是用于改变this的指向，大致相同，形式上有所区别。 
1.第一个参数都是指定函数执行时的作用域（函数内部的this指向），然后根据指定的作用域调用函数。
2.call和apply方法在调用之后立即执行，而bind函数在调用之后返回一个新函数，需要将新函数再执行一次（即加上一对小括号）
3.call和bind方法传递参数，需要从第二个参数开始依次传递，而apply方法是将传递的参数放进一个数组中，然后在apply方法的第二个参数中将这个数组放进去。

https://www.cnblogs.com/Jade-Liu18831/p/9580410.html