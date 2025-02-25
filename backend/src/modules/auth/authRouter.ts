import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { authService } from "@modules/auth/authService";
import { LoginUserSchema,LogoutUserSchema } from "@modules/auth/authModel";


export const authRouter = (() => {
    const router = express.Router();

   
    // Login a user
    router.post("/login",
        validateRequest(LoginUserSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const serviceResponse = await authService.login(payload, res);
        handleServiceResponse(serviceResponse, res);
    });

    // Logout a user
router.post("/logout", async (req: Request, res: Response) => { // กำหนดเส้นทาง /logout
    const serviceResponse = await authService.logout(res); // เรียกใช้งานฟังก์ชัน logout จาก authService และส่ง res ไปด้วย 
    handleServiceResponse(serviceResponse, res); // ส่ง serviceResponse และ res ไปให้ handleServiceResponse จัดการ 
});
        
    return router;

    
})();

// กำหนดเส้น Api 



