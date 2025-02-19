import { z } from "zod";

// ประเภทข้อมูลสำหรับ payload ของ User
export type TypePayloadUser = {  
    username: string;    // ชื่อผู้ใช้ที่ต้องการ
    password: string;    // รหัสผ่าน
    role: string;        // บทบาทของผู้ใช้

};

// Schema สำหรับการLogin User ใหม่
export const LoginUserSchema = z.object({
    body: z.object({
        username: z.string().max(255),
        password: z.string().max(255),
    }),
});

// Schema สำหรับการLogin User ใหม่
export const LogoutUserSchema = z.object({
    body: z.object({
        username: z.string().max(255),

    }),
});
