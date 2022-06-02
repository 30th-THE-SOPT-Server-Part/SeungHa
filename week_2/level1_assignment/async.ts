// console.log("안녕하세요")
// setTimeout(()=> {
//     console.log('Set Time Out');
// }, 2000); // 1000이 1초

// console.log('끝');

// 출력 순서: 안녕하세요 -> 끝 -> Set Time Out


// const condition: boolean = true;

// const promise = new Promise((reslove, reject) => {
//     if (condition){
//         reslove('성공'); // promise 안에서 비동기 처리가 제대로 이행되었을 때 resolve 수행
//         // 성공 반환
//     } else {
//         reject(new Error('reject !! error'));
//     }
// });

// // 작업을 성공적으로 완료하면 then을 통해 전달됨
// // 작업이 실패하면 catch를 통해 전달
// promise
//     .then((resolveData): void => { console.log(resolveData); })
//     .catch(error => console.log(error));

// const restaurant = (callback: () =>void , time: number) => {
//     setTimeout(callback, time);
// }

// const order = (): Promise<string> => { // 반환값은 Promise, 안에 String 데이터가 있으므로 Promise<String>
//     return new Promise((resolve, reject) => {
//         restaurant(() => {
//             console.log('[레스토랑 진행 상황 - 음식 주문]');
//             resolve('음식 주문 시작');
//         }, 1000);
//     });
// }

// const cook = (progress: string) : Promise<string>=> { // 직전의 promise의 반환값 string을porgress로 받음
//     return new Promise((resolve, reject) => {
//         restaurant( () => {
//             console.log('[레스토랑 진행 상황 - 음식 조리 중]');
//             resolve(`${progress} -> 음식 조리 중`);
//         }, 2000);
//     });
// }

// const serving = (progress: string) : Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(() => {
//             console.log('[레스토랑 진행 상황 - 음식 서빙 중]');
//             resolve(`${progress} -> 음식 서빙 중`);
//         }, 2500);
//     });
// }

// // 음식 먹는 중
// const eating = (progress: string) : Promise<string> => {
//     return new Promise((resolve, reject) => {
//         restaurant(() => {
//             console.log('[레스토랑 진행 상황 - 음식 먹는 중]');
//             resolve(`${progress} -> 음식 먹는 중`);
//         }, 3000);
//     });
// }

// order().then(progress => cook(progress))
//     .then(progress => serving(progress))
//     .then(progress => eating(progress))
//     .then(progress => console.log(progress))


// resolve 바로 호출 가능
Promise.resolve(123)
    .then(res => {
        throw new Error('에러발생!');
        return 456 // 456 리턴 불가
    })
    .then(res => {  // 절대 실행 안됨
        console.log(res);
        return Promise.resolve(789)
    })
    .catch(err => {
        console.log(err.message);
    });


let asyncFunc1 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(`asyncFunc1 - ${msg}`);
        }, 1000);
    });
};

let asyncFunc2 = (msg:string) : Promise<string> => {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(`asyncFunc2 - ${msg}`);
        }, 1500);
    });
};


// async 안쓴 버전
const promiseMain1 = ():void => {
    asyncFunc1('serverPart').then( (result: string) => {
        console.log(result);
        return asyncFunc2('채정아');
    }).then( (result: string) => {
        console.log(result);
    });
};


// async 쓴 버전

const asyncMain = async (): Promise<void> => {
    let result = await asyncFunc1('server part');
    console.log(result);
    result = await asyncFunc2('임승하');
    console.log(result);
}