import { user } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ResponseStatus, ServiceResponse } from "@common/models/serviceResponse";
import { UserRepository } from "@modules/user/userRepository";
import { TypePayloadUser } from "@modules/auth/authModel";
import bcrypt from "bcrypt";
import { generateAccessToken } from "@common/utils/jwt"; 

export const authService = {

    // login a user
    login: async (payload: TypePayloadUser, res:any) => {
        try {
            const checkUser = await UserRepository.findByUsername(payload.username);
            if (!checkUser) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Incorrect Username",
                    null,
                    StatusCodes.NOT_FOUND
                );
            }

            // ตรวจสอบรหัสผ่านโดยใช้ bcrypt.compare
            const isPasswordValid = await bcrypt.compare(payload.password, checkUser.password);

            if (!isPasswordValid) {
                return new ServiceResponse(
                    ResponseStatus.Failed,
                    "Incorrect password",
                    null,
                    StatusCodes.BAD_REQUEST
                );
            }


            const accessToken = generateAccessToken(checkUser.user_id,checkUser.role);
            // ตั้งค่า HTTP-Only Cookie
            res.cookie('token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // ใช้ HTTPS ใน production
                sameSite: 'strict',
                
            });


            return new ServiceResponse<user>(
                ResponseStatus.Success,
                "Login success",
                checkUser,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = "Error create user: " + (ex as Error).message;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },

    // // Logout a user
    // logout: async (res: any) => {
    //     try {
    //         res.clearCookie('token', {
    //             httpOnly: true,
    //             secure: process.env.NODE_ENV === 'production',
    //             sameSite: 'strict',
    //         });

    //         return new ServiceResponse(
    //             ResponseStatus.Success,
    //             "Logout success",
    //             null,
    //             StatusCodes.OK
    //         );
    //     } catch (ex) {
    //         const errorMessage = "Error logout user: " + (ex as Error).message;
    //         return new ServiceResponse(
    //             ResponseStatus.Failed,
    //             errorMessage,
    //             null,
    //             StatusCodes.INTERNAL_SERVER_ERROR
    //         );
    //     }
    // },
};

//ตรวจสอบฐานข้อมูล และจัดการ Logic