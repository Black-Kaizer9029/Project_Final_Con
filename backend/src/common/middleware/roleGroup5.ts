import { Request, Response, NextFunction } from "express";  {/* เรียกใช้งาน Express และ NextFunction */}
import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse"; // ตรวจสอบให้แน่ใจว่ามีโมดูลนี้
import { StatusCodes } from "http-status-codes"; {/* เรียกใช้งาน StatusCodes จาก http-status-codes */}

function rolegrop5(req:Request, res:Response, next: NextFunction): void { {/* สร้าง Middleware ชื่อ rolegrop5 ที่รับ Request, Response, และ NextFunction */}

    const role = req.user?.role; {/* ดึงข้อมูล Role จาก req.user.payload.role ถ้ามีค่าให้เก็บไว้ที่ตัวแปร role */}
    // ตรวจสอบเงื่อนไข Role
    if (role !== 'Manager' && role !== 'Admin' && role !== 'RootAdmin') { {/* ตรวจสอบเงื่อนไข Role ว่าไม่ใช่ Manager หรือ Admin */}
        const response = new ServiceResponse( //{/* สร้างตัวแปร response และกำหนดค่าด้วย new ServiceResponse */}
            ResponseStatus.Failed, //{/* กำหนดค่า ResponseStatus.Failed ให้กับ response.status */}
            "Unauthorized", //{/* กำหนดข้อความ "Unauthorized" ให้กับ response.message */}
            null, //{/* กำหนดค่า null ให้กับ response.data */}
            StatusCodes.UNAUTHORIZED //{/* กำหนดค่า StatusCodes.UNAUTHORIZED ให้กับ response.statusCode */}
        );
        res.status(response.statusCode).json(response); // ส่ง Response กลับ //{/* ส่ง response กลับไปที่ Client */}
        return;
    }

    next(); // หากผ่านเงื่อนไข ให้เรียก Middleware ถัดไป
}

export default rolegrop5;