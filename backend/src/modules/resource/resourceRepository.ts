import prisma from "@src/db";
import { resource } from "@prisma/client"; 
import { TypePayloadResource } from "@modules/resource/resourceModel";

export const ResourceKeys = [
    "resource_id",
    "resource_name",
    "resource_type",
    "cost",
    "total",
    "quantity",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by"
];

export const ResourceRepository = {
    // ค้นหาทรัพยากรทั้งหมด
    findAllAsync: async () => {
        return prisma.resource.findMany({
            select: {
                resource_id: true,
                resource_name: true,
                resource_type: true,
                cost: true,
                total: true,
                quantity: true,
                task_id: true, // เพิ่ม task_id
                tasks: { select: { task_name: true } }, // ดึงชื่อ Task
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true,
            },
        });
    },

    // ค้นหาทรัพยากรตาม resource_id
    findById: async (resource_id: string) => {
        return prisma.resource.findUnique({
            where: { resource_id: resource_id },
            select: {
                resource_id: true,
                resource_name: true,
                resource_type: true,
                cost: true,
                total: true,
                quantity: true,
                created_at: true,
                created_by: true,
                updated_at: true,
                updated_by: true,
            },
        });
    },

    // ค้นหาทรัพยากรตามชื่อ
    findByName: async (resource_name: string) => {
        return prisma.resource.findFirst({
            where: { resource_name: resource_name },
        });
    },

    // สร้างทรัพยากรใหม่
    create: async (payload: TypePayloadResource) => {
        const resource_name = payload.resource_name.trim();
        const setPayload = {
            resource_name: resource_name,
            resource_type: payload.resource_type,
            cost: payload.cost,
            total: payload.total,
            quantity: payload.quantity,
            task_id: payload.task_id,
        };

        return prisma.resource.create({
            data: setPayload,
        });
    },

    // อัปเดตทรัพยากร
    update: async (resource_id: string, payload: Partial<TypePayloadResource>) => {
        return prisma.resource.update({
            where: { resource_id: resource_id },
            data: payload,
        });
    },

    // ลบทรัพยากร
    delete: async (resource_id: string) => {
        return prisma.resource.delete({
            where: { resource_id: resource_id },
        });
    },
};