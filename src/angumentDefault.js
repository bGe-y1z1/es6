// function move(a = 1) {
//   console.log(a); // 1
// }
// move();

function move() {
  let a; //参数的声明
  //以下是参数的赋值，考虑是否传了参数两种情况
  console.log(arguments[0]);
  if (arguments[0] === undefined) {
    a = 1;
  } else {
    a = arguments[0];
  }
  console.log(a);
}
move();
