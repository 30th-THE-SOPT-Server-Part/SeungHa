const name = '임승하';
console.log(typeof name);

let age = 18;
console.log(typeof age); 

let x = true;
console.log(typeof x); 

// 안녕하세요 제 이름은 임승하입니다. 제 나이는 18살입니다.
console.log(`안녕하세요 제 이름은 ${name}입니다. 제 나이는 ${age}입니다.`);

console.log(typeof null); // object 출력
console.log(typeof undefined); // undefined 출력


// 배열
let arr = ["안녕", true, 123];

// 배열 반복, 배열 map, 화살표 함수
let num = [1, 2, 3, 4];
const newNumArr = num.map(x => x * 2);
console.log(newNumArr);

for (const x of newNumArr){
    console.log(x);
}

