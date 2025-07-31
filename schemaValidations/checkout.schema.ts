import { z } from "zod";

export const checkoutSchema = z.object({
  // Customer Information
  email: z.string().email("Email không hợp lệ"),
  fullName: z.string().min(1, "Họ tên là bắt buộc"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  
  // Shipping Address
  address: z.string().min(1, "Địa chỉ là bắt buộc"),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  
  // Additional Information
  note: z.string().optional(),
  
  // Payment Method
  paymentMethod: z.enum(["bank_transfer", "cod"], {
    required_error: "Vui lòng chọn phương thức thanh toán",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>; 