import express, { Request, Response } from "express";
import { handleServiceResponse, validateRequest } from "@common/utils/httpHandlers";
import { authService } from "@modules/auth/authService";
import { LoginUserSchema } from "@modules/auth/authModel";
import { authenticateJWT } from "@common/middleware/authMiddleware";


export const authRouter = (() => {
    const router = express.Router();

   
    // CREATE a user
    router.post("/login",
        authenticateJWT,
         validateRequest(LoginUserSchema), async (req: Request, res: Response) => {
        const payload = req.body;
        const serviceResponse = await authService.login(payload, res);
        handleServiceResponse(serviceResponse, res);
    });

        
    return router;

    
})();

// กำหนดเส้น Api 



