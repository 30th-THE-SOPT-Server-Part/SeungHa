import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import User from "../models/User";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import bcrypt from "bcryptjs";
import { UserSignInDto } from "../interfaces/user/UserSignInDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";

const createUser = async (userCreateDto: UserCreateDto) => {

    try {

        const existUser = await User.findOne({
            email: userCreateDto.email
        });

        if (existUser) return null;

        const user = new User({
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            age: userCreateDto.age,
            password: userCreateDto.password,
            school: userCreateDto.school
        });

        // db에 password를 그대로 저장하지 않고 bcrypt를 통해 암호화해서 저장
        const salt = await bcrypt.genSalt(10); // salt - 아주 작은 임의의 랜덤한 텍스트. generate를 10번 하겠다

        user.password = await bcrypt.hash(userCreateDto.password, salt);

        await user.save();

        // user를 db에 저장하고 id값을 가져와서 반환하는듯
        const data = {
            _id: user._id
        };

        return data;

    } catch (error) {
        console.log(error);
        throw error;

    }
    
}


const signInUser = async(userSignInDto: UserSignInDto) : Promise<PostBaseResponseDto | null | number> => {
    try {
        const user = await User.findOne({
            email: userSignInDto.email
        });

        if (!user) return null;

        const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
        if (!isMatch) return 401;

        const data = {
            _id: user._id
        };
        return data;


    } catch (error) {

        console.log(error);
        throw error;
        
    }
}

const updateUser = async (userId: string, userUpdateDto: UserUpdateDto) => { // String 안됨

    try{

        await User.findByIdAndUpdate(userId, userUpdateDto);

    } catch (error){
        console.log(error);
        throw error;
    }

}

const findByUserId = async (userId: string) => {
    
    try{

        const user: UserResponseDto | null = await User.findById(userId);
        return user;

    } catch(error) {
        console.log(error);
        throw error;
    }
}


const deleteUser = async (userId: string) => {

    try {
        
        await User.findByIdAndDelete(userId);

    } catch (error) {
        console.log(error);
        throw error;
    }

}

export default {
    createUser,
    updateUser,
    signInUser,
    findByUserId,
    deleteUser
}