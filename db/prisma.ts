import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient().$extends({});

export default prisma;
