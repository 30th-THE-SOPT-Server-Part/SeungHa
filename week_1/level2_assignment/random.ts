// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기

interface Member {
    name: string;
    group: string;
}

interface Dinner {
    member: Array<Member>;
    shuffle(array_for_shu: Array<Member>): Array<Member>;
    organize(array_for_org: Array<Member>): void;
}

const dinner: Dinner = {
    member: [
        {
            name: '채정아',
            group: 'ob'
        },
        {
            name: '김동재',
            group: 'yb'
        },
        {
            name: '강민재',
            group: 'yb'
        },
        {
            name: '김루희',
            group: 'ob'
        },
        {
            name: '박진수',
            group: 'ob'
        }
    ],

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    },

    organize(array) {
        this.shuffle(array);
        let dinnerMember: Array<string> = [];
        let temp: Member = array.find((element) => (element.group === 'ob'))!; // 느낌표 없으면 ts2322 오류 발생 
        dinnerMember[0] = temp.name;
        temp = array.find((element) => (element.group === 'yb'))!;
        dinnerMember[1] = temp.name;

        console.log(`오늘의 저녁 식사 멤버는 ${dinnerMember[0]}, ${dinnerMember[1]}`);
    }
};

dinner.organize(dinner.member);