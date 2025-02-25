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

    // logout a user
    logout: async (res: any) => {
        try {
            res.clearCookie("token", { //ล้างค่า Cookie ที่ชื่อ token ออกไป 
                httpOnly: true, // ไม่สามารถเข้าถึงค่า Cookie จาก JavaScript ได้ หรือ เพื่อป้องกันการเข้าถึง Cookie จาก JavaScript โดยตรง
                secure: process.env.NODE_ENV === "production", // ใช้ HTTPS ใน production เท่านั้น หรือ ใช้งานใน localhost ได้
                sameSite: "strict", 
            });
    
            return new ServiceResponse(
                ResponseStatus.Success,
                "Logout successful", 
                null,
                StatusCodes.OK
            );
        } catch (ex) {
            return new ServiceResponse(
                ResponseStatus.Failed,
                "Error during logout: " + (ex as Error).message,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    },
};

//ตรวจสอบฐานข้อมูล และจัดการ Logic