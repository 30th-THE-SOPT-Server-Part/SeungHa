const sopt = {
    season: 30,
    group: ['YB', 'OB'],
    part: ['서버', '기획', '안드로이드', '디자인', '웹', 'iOS'],
    introduce: function(){
        this.part.map(name => {
            console.log(`솝트 내 파트는 ${name} 파트가 있어요`)
        });
    }
}
console.log(sopt.group);
sopt.introduce();

let array2 = [
    {
        name: '임승하',
        age: 23
    },
    {
        name: '서버',
        age: 18
    }

]

console.log(array2);

// 함수 선언식
function menu(dinner){
    return `오늘 메뉴는 ${dinner}입니다.`;
}
const str2 = menu('삼겹살');
console.log(str2);

//함수 표현식 - 실행 흐름이 해당 함수에 도달했을 때 함수 생성, 사용 가능
const menu2 = (dinner) => {
    return `오늘 메뉴는 ${dinner}입니다.`;
}

const str3 = menu2("치킨");
console.log(str3);

const func2 = (num) => {
    return num * num;
}

// 함수를 파라미터로 받음
const multiple = (func, num) => {
    console.log(func(num));
}

multiple(func2, 3);

const n = null; 
console.log(typeof (typeof a)); // a 자체가 스트링임
if (typeof a == 'null'){
    console.log(a);
}

