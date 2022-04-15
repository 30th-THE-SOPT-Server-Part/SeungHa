import { Member } from "./Member"

export interface Dinner {
    member: Array<Member>;
    shuffle : (array: Array<Member>) => Array<Member>;
    organize: (array: Array<Member>) => void;
}