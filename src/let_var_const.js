/**
 * 变量和常量的不同
 * @author DJH
 */

// let 块级作用域

// {
//   let a = 1;
// }
// console.log(a); // a is not defined

// {
//   let a = 0;
//   {
//     console.log(a); //0，当子块没有声明时，用父块的a
//   }
// }

// {
//   let b = 0;
//   {
//     let b = 1; //可行不报错，子块可以重新声明b，但不影响父块的b
//   }
// }

// {
//   let d = 0;
//   let d = 1; // Identifier 'd' has already been declared
//   console.log(d);
// }

// {
//   let c = 0;
//   {
//     console.log(c); //报错 Cannot access 'c' before initialization，因为子块有let声明c，但是不支持预解析，故报错
//     let c = 1;
//   }
// }

// const PI = 3.14;
// PI = 2; //报错，不能重复赋值 Assignment to constant variable.

// const PI = { name: "zhuangzhuang" };
// PI = { name: "zz" }; //报错，不能重复赋值 Assignment to constant variable.

// const PI = { name: "zhuangzhuang" };
// PI.name = "zz"; //OK，不能重复赋值对象，但是可以改变对象内的属性
// PI.age = 18; // ok
// console.log(PI); //{ name: 'zz', age: 18 }

const arr = [1, 2, 3];

// arr = [1, 2, 4]; // Assignment to constant variable.
arr[0] = 5; // ok
console.log(arr); //  [ 5, 2, 3 ]
arr[3] = 5; // ok
console.log(arr); //  [ 5, 2, 3, 5 ]
