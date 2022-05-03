import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import User from "../models/User";
import { UserUpdateDto } from "../interfaces/user/UserUpdateDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";

const createUser = async (userCreateDto: UserCreateDto) => {

    try {

        const user = new User({
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            age: userCreateDto.age,
            school: userCreateDto.school
        });

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
    findByUserId,
    deleteUser
}