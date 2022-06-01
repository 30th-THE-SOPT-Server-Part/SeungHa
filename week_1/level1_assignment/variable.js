// var name = '임승하';
// var name = '채정아';

// console.log(name);

// let name2 = '임승하';
// name2 = '서버';

// console.log(name2);

// const name3 = '임승하';
// name3 = '서버';

// console.log(name3);


// if (true){
//     var x = 'var variable'; // var은 함수 스코프
// }
// console.log(x);

// if(true){
//     const y = 'const variable'; // let, const는 블록 스코프
// }
// console.log(y);

function foo (){
    if (true){
        var name = '임승하';
        console.log('if - block - ', name);
    }

    console.log('function - block - ', name); 

}

console.log('global - ', name); 