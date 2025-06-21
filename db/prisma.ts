// import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({});

export default prisma;
