// ts 실행 방법: ts-node 파일이름
let name: string = '임승하';
console.log(name);

let grade: number = 3;


const ages1: number[] = [1, 2, 3, 4]; // 숫자로 된 배열
let ages2: Array<number> = [1, 2, 3, 4]; 

// Object - 자바스크립트의 모든 생성자를 extend. 모든 타입을 받을 수 있음
// object - 자바스크립트의 원시 타입 제외 모두 받을 수 있음
const f1 = (obj: object): void => {
    console.log(obj);
}

const f2 = (obj: Object): void => {
    console.log(obj);
}

f2([1, 2, 3, 4]);
f2('hello World');

f1([1, 2, 3, 4]);
// f1('hello World'); // 오류발생

// 아규먼트 두 개 둘 다 타입이 number, 반환값도 number 타입이어야 함
const div = (x: number, y:number): number => {
    return x / y;
}


// null과 undefined는 이름 그대로가 타입
let p: null = null; // let x:null = 1; 오류남
let u: undefined = undefined;

// 타입 단언: angle-bracket
let myName: any = '임승하'; // any 타입: 아무 타입이나 할당 가능
let myNameLength: number = (<string>myName).length; // myName이란 변수는 스트링이다!라고 단언

let myName2: any = '서버';
let myName2Length: number = (myName2 as string).length; // myName2이란 변수는 스트링이다!라고 단언

