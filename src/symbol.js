let s = Symbol();

typeof s;
// "symbol"
console.log(typeof s);

var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1; // Symbol(foo)
s2; // Symbol(bar)
console.log(s1);
console.log(s2);
