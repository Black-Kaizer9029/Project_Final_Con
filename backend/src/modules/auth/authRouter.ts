import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { authService } from "@modules/auth/authService";
import { LoginUserSchema,LogoutUserSchema } from "@modules/auth/authModel";
import { authenticateJWT } from "@common/middleware/authMiddleware";


export const authRouter = (() => {
    const router = express.Router();

   
    // Login a user
    router.post("/login",
        validateRequest(LoginUserSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const serviceResponse = await authService.login(payload, res);
        handleServiceResponse(serviceResponse, res);
    });

    // // Logout a user
    // router.post("/logout",
    //     validateRequest(LogoutUserSchema), async (req: Request, res: Response) => {
    //     const payload = req.body;
    //     const serviceResponse = await authService.logout(payload, res);
    //     handleServiceResponse(serviceResponse, res);
    // });
        
    return router;

    
})();

// กำหนดเส้น Api 



