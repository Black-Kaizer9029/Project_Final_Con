import { Request, Response, NextFunction } from "express";
import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse"; // ตรวจสอบให้แน่ใจว่ามีโมดูลนี้
import { StatusCodes } from "http-status-codes";

function rolegrop1(req:Request, res:Response, next: NextFunction): void {

    const role = req.user?.payload?.role; // ดึงข้อมูล Role จาก req.user.payload.role ถ้ามีค่าให้เก็บไว้ที่ตัวแปร role
    // ตรวจสอบเงื่อนไข Role
    if (role !== 'Admin') {
        const response = new ServiceResponse( // สร้างตัวแปร response และกำหนดค่าด้วย new ServiceResponse
            ResponseStatus.Failed, // กำหนดค่า ResponseStatus.Failed ให้กับ response.status
            "Unauthorized",    // กำหนดข้อความ "Unauthorized" ให้กับ response.message
            null,
            StatusCodes.UNAUTHORIZED // กำหนดค่า StatusCodes.UNAUTHORIZED ให้กับ response.statusCode
        );
        res.status(response.statusCode).json(response); // ส่ง Response กลับ
        return;
    }

    next(); // หากผ่านเงื่อนไข ให้เรียก Middleware ถัดไป
}

export default rolegrop1; 

