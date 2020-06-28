# ES6 扩展

## 字符串扩展

### for...of

ES6 为字符串添加了遍历器接口，使得字符串可以被 for...of 循环遍历。

```js
for (let codePoint of 'foo') {
  console.log(codePoint);
}
// "f"
// "o"
// "o
```

:::tip
除了遍历字符串，这个遍历器最大的优点是可以识别大于 0xFFFF 的码点，传统的 for 循环无法识别这样的码点。
:::

### includes(), startsWith(), endsWith()

传统的 js 只有 indexof 可以查看字符串中是否包含某个字符

- includes() 返回布尔值 表示是否找到了参数字符串
- startsWith() 返回布尔值 表示参数字符串是否在原字符串的头部
- endsWith() 返回布尔值 表示参数字符串是否在原字符串的尾部

> 这三个方法接受第二个参数 查找的位置 endsWith 和其他两个不同表示前几个字符

### repeat()

返回一个新字符串，表示将原字符重复 n 次

### 模板字符串

原理

```js
let name = '张三';
let age = '18';
let desc = '${name} 今年  ${age}  岁了';
function replace(desc) {
  return desc.replace(/\$\{([^}]+)\}/g, function (mathed, key, c, d) {
    console.log(mathed, key, c, d);
    // ${name} name 0 ${name} 今年  ${age}  岁了
    // ${age} age 12 ${name} 今年  ${age}  岁了
    // replace中 mathed 为匹配到的字符串，key为对应替换的字符串，c为替换的位置，d为整个要替换的字符串。
    return eval(key);
    // eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。这里的eval会将原本的name和age改成成张三和18
  });
}
replace(desc);
```

### 标签模板

通过\${}将模板字符串的内容分成静态部分和动态部分，将静态部分以数组的方式存入到 myTag 函数形参的第一位，动态的部分以形参的形式接着传入函数

```js
var a = 5;
var b = 10;

tag`Hello ${a + b} world ${a * b}`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);
```

使用场景

- 过滤 HTML 字符串，防止用户输入恶意内容。

```js
// html 转化
var sender = '<script>alert("abc")</script>'; // 恶意代码
var message = SaferHTML`<p>${sender} has sent you a message.</p>`;
console.log('恶意代码转化', message);
// 恶意代码转化 <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
function SaferHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

- 多语言转换（国际化处理）

```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`;
// "欢迎访问xxx，您是第xxxx位访问者！"
```

## 正则

### RegExp 构造函数

如果 RegExp 构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符

```js
new RegExp(/abc/gi, 'i').flags;
// "i"
```

### 字符串的正则方法

字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和 split()。

## 数值

### Number.isFinite(), Number.isNaN()

- Number.isFinite()用来检查一个数值是否为有限的（finite）
- Number.isNaN()用来检查一个值是否为 NaN。
  :::tip
  它们与传统的全局方法 isFinite()和 isNaN()的区别在于，传统方法先调用 Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回 false。
  :::

### Number.parseInt(), Number.parseFloat()

ES6 将全局方法 parseInt()和 parseFloat()，移植到 Number 对象上面，行为完全保持不变。
:::tip
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
:::

### Number.EPSILON

ES6 在 Number 对象上面，新增一个极小的常量 Number.EPSILON。
Number.EPSILON 的实质是一个可以接受的误差范围。

### Math.trunc()

Math.trunc 方法用于去除一个数的小数部分，返回整数部分。

### Math.sign()

Math.sign 方法用来判断一个数到底是正数、负数、还是零

- 参数为正数，返回+1；
- 参数为负数，返回-1；
- 参数为 0，返回 0；
- 参数为-0，返回-0;
- 其他值，返回 NaN。

## 数组

### Array.form()

方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

:::tip
扩展运算符（...）也可以将某些数据结构转为数组
扩展运算符背后调用的是遍历器接口（Symbol.iterator）
任何有 length 属性的对象，都可以通过 Array.from 方法转为数组，而此时扩展运算符就无法转换。
:::

使用场景

- 常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，
- 函数内部的 arguments 对象

Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js
Array.from(arrayLike, (x) => x * x);
// 等同于
Array.from(arrayLike).map((x) => x * x);

Array.from([1, 2, 3], (x) => x * x);
// [1, 4, 9]
```

### Array.of()

Array.of 总是返回参数值组成的数组。如果没有参数，就返回一个空数组。

:::tip
Array.of 基本上可以用来替代 Array()或 new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
:::

Array.of 方法可以用下面的代码模拟实现。

```js
function ArrayOf() {
  return [].slice.call(arguments);
}
```

### copyWithin()

数组实例的 copyWithin 方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

它接受三个参数。

- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

```js
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}
```

### find()和 findIndex()

数组实例的 find 方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined。

数组实例的 findIndex 方法的用法与 find 方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

### fill()

fill 方法使用给定值，填充一个数组。

```js
['a', 'b', 'c'].fill(7);
// [7, 7, 7]

new Array(3).fill(7);
// [7, 7, 7]
```

### entries()，keys()和 values()

ES6 提供三个新的方法——entries()，keys()和 values()——用于遍历数组。它们都返回一个遍历器对象，可以用 for...of 循环进行遍历，唯一的区别是 keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
如果不使用 for...of 循环，可以手动调用遍历器对象的 next 方法，进行遍历。

```js
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

### includes()

Array.prototype.includes 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似。该方法属于 ES7，但 Babel 转码器已经支持。

该方法的第二个参数表示搜索的起始位置，默认为 0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为 3），则会重置为从 0 开始。

```js
[1, 2, 3].includes(2); // true
[1, 2, 3].includes(4); // false
[1, 2, NaN].includes(NaN); // true

[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```

## 函数

### 函数参数的默认值

参数变量 x 是默认声明的，在函数体中，不能用 let 或 const 再次声明，否则会报错
与解构赋值默认值结合使用
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

### 函数的 length 属性

指定了默认值以后，函数的 length 属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length 属性将失真。

### rest 参数

ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用 arguments 对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

### 扩展运算符

#### 替代数组的 apply 方法

由于扩展运算符可以展开数组，所以不再需要 apply 方法，将数组转为函数的参数了。

### 箭头函数

:::danger
箭头函数有几个使用注意点。

（1）函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。

（3）不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 Rest 参数代替。

（4）不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
:::

绑定 this
箭头函数可以绑定 this 对象，大大减少了显式绑定 this 对象的写法（call、apply、bind）。但是，箭头函数并不适用于所有场合，所以 ES7 提出了“函数绑定”（function bind）运算符，用来取代 call、apply、bind 调用。虽然该语法还是 ES7 的一个提案，但是 Babel 转码器已经支持。

函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即 this 对象），绑定到右边的函数上面。

## 对象

### 属性的简洁表示法

ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
var foo = 'bar';
var baz = { foo };
baz; // {foo: "bar"}

// 等同于
var baz = { foo: foo };

let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123,
};

let obj = {
  ['h' + 'ello']() {
    return 'hi';
  },
};

obj.hello(); // hi
```

### Object.is()

ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的 NaN 不等于自身，以及+0 等于-0。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6 提出“Same-value equality”（同值相等）算法，用来解决这个问题。Object.is 就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```js
Object.is('foo', 'foo');
// true
Object.is({}, {}) +
  // false

  0 ===
  -0; //true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN); // true
// ES5可以通过下面的代码，部署Object.is。
Object.defineProperty(Object, 'is', {
  value: function (x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true,
});
```

### Object.assign()

Object.assign 方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。
:::danger

- 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
- 方法实行的是浅拷贝，而不是深拷贝
  :::

常见用途

- 为对象添加属性

```js
class Point {
  constructor(x, y) {
    Object.assign(this, { x, y });
  }
}
```

- 为对象添加方法

```js
Object.assign(SomeClass.prototype, {
 someMethod(arg1, arg2) {
   ···
 },
 anotherMethod() {
   ···
 }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
 ···
};
SomeClass.prototype.anotherMethod = function () {
 ···
};
```

- 克隆对象

```js
function clone(origin) {
  return Object.assign({}, origin);
}
// 上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。

// 不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

- 合并多个对象

```js
const merge = (target, ...sources) => Object.assign(target, ...sources);
```

- 为属性指定默认值

```js
// DEFAULTS对象是默认值，options对象是用户提供的参数
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html',
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
}
```

### Object.setPrototypeOf()

```js
// 写操作
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x; // 10
obj.y; // 20
obj.z; // 40
```

### Object.getPrototypeOf()

```js
//读操作
function Rectangle() {}

var rec = new Rectangle();

Object.getPrototypeOf(rec) === Rectangle.prototype;
// true

Object.setPrototypeOf(rec, Object.prototype);
Object.getPrototypeOf(rec) === Rectangle.prototype;
// false
```

### Object.create()

生成

### Object.values()

Object.values 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

### Object.keys()

ES5 引入了 Object.keys 方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

### Object.entries()

Object.entries 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

### Object.getOwnPropertyDescriptors()
