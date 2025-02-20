import { Request, Response, NextFunction } from "express";
import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse"; // ตรวจสอบให้แน่ใจว่ามีโมดูลนี้
import { StatusCodes } from "http-status-codes";

function rolegrop4(req:Request, res:Response, next: NextFunction): void {
    // ดึงข้อมูล Role จาก Request ที่ถูกส่งมา โดยมาจาก Middleware ก่อนหน้านี้ คือ authentication หรือ authorization
    const role = req.user?.role; 
    // ตรวจสอบเงื่อนไข Role
    if (role !== 'CEO' && role !== 'Employee' && role !== 'Manager' && role !== 'Admin' && role !== 'RootAdmin') {
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

export default rolegrop4;
