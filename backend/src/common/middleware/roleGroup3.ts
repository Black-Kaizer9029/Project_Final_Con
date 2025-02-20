import { Request, Response, NextFunction } from "express";
import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse"; // ตรวจสอบให้แน่ใจว่ามีโมดูลนี้
import { StatusCodes } from "http-status-codes";

function rolegrop3(req:Request, res:Response, next: NextFunction): void {

    const role = req.user?.role;
    // ตรวจสอบเงื่อนไข Role
    if (role !== 'Employee' && role !== 'Admin' && role !== 'RootAdmin') {
        const response = new ServiceResponse(
            ResponseStatus.Failed,
            "Unauthorized",
            null,
            StatusCodes.UNAUTHORIZED
        );
        res.status(response.statusCode).json(response); // ส่ง Response กลับ
        return;
    }

    next(); // หากผ่านเงื่อนไข ให้เรียก Middleware ถัดไป
}

export default rolegrop3;
