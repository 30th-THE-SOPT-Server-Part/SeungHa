// 인터페이스로 타입선언
interface serverPart{
    name: string;
    age: number;
    group: string; 
    mbti: string[];
    bloodType?: string; // 선택적 프로퍼티. 들어와도 되고 안들어와도 됨
}

const server: serverPart = {
    name: '임승하',
    age: 23,
    group: 'YB',
    mbti: ['ENFP', 'MBTI']
}

console.log(server);

interface Closet {
    name: string;
    shirt: number;
    pants: number;
    hat?: number;
    sunglass?: number;
}

const colset : Array<Closet> = [
    {
        name: '임승하',
        shirt: 2,
        pants: 3,
        hat: 1
    },
    {
        name: '서버',
        shirt: 3,
        pants: 1

    }


]
