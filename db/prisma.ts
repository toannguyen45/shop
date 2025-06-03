import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient().$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
    },
  },
});

export default prisma;
