"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  type CheckoutFormData,
} from "@/schemaValidations/checkout.schema";
import { useLocation } from "@/hooks/use-location";
import { BankAccountInfo } from "@/types/checkout";
import { CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Wallet,
  MapPin,
  User,
  FileText,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data - replace with actual data from your cart/context
const mockCartItems: CartItem[] = [
  {
    productId: "1",
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    qty: 1,
    stock: 10,
    image:
      "https://res.cloudinary.com/durkhdouw/image/upload/v1753279802/tu-tv-aomi-9_ksxz1y.jpg",
    price: 25000000,
  },
  {
    productId: "2",
    name: "MacBook Pro M3",
    slug: "macbook-pro-m3",
    qty: 1,
    stock: 5,
    image:
      "https://res.cloudinary.com/durkhdouw/image/upload/v1753279802/tu-tv-aomi-9_ksxz1y.jpg",
    price: 45000000,
  },
];

const bankAccountInfo: BankAccountInfo = {
  bankName: "Vietcombank",
  accountNumber: "1234567890",
  accountName: "CÔNG TY TNHH SHOP ONLINE",
  branch: "Chi nhánh Hà Nội",
};

const shippingFee = 30000; // 30,000 VND

const CheckoutPage = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "cod">(
    "cod"
  );

  const { provinces, districts, wards, loading, loadDistricts, loadWards } =
    useLocation();

  const subtotal = mockCartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const total = subtotal + shippingFee;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Checkout data:", data);
    // Handle checkout submission here
  };

  const handleProvinceChange = async (provinceId: string) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
    setValue("province", provinceId);
    setValue("district", "");
    setValue("ward", "");

    // Load districts for selected province
    await loadDistricts(provinceId);
  };

  const handleDistrictChange = async (districtId: string) => {
    setSelectedDistrict(districtId);
    setSelectedWard("");
    setValue("district", districtId);
    setValue("ward", "");

    // Load wards for selected district
    await loadWards(districtId);
  };

  const handleWardChange = (wardId: string) => {
    setSelectedWard(wardId);
    setValue("ward", wardId);
  };

  const handlePaymentMethodChange = (method: "bank_transfer" | "cod") => {
    setPaymentMethod(method);
    setValue("paymentMethod", method);
  };

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
        <p className="text-gray-600 mt-2">Hoàn tất đơn hàng của bạn</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column - Customer Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ tên *</Label>
                  <Input
                    id="fullName"
                    placeholder="Nhập họ tên đầy đủ"
                    {...register("fullName")}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    {...register("phone")}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Địa chỉ giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ chi tiết *</Label>
                <Input
                  id="address"
                  placeholder="Số nhà, tên đường, khu phố..."
                  {...register("address")}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">
                    Tỉnh/Thành phố *
                  </Label>
                  <Select
                    onValueChange={handleProvinceChange}
                    value={selectedProvince}
                    disabled={loading.provinces}
                  >
                    <SelectTrigger
                      className={`h-11 w-full ${
                        errors.province ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          loading.provinces
                            ? "Đang tải..."
                            : "Chọn tỉnh/thành phố"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {loading.provinces ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Đang tải...</span>
                        </div>
                      ) : (
                        provinces.map((province) => (
                          <SelectItem key={province.id} value={province.id}>
                            {province.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errors.province && (
                    <p className="text-xs text-red-500">
                      {errors.province.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium">Quận/Huyện *</Label>
                  <Select
                    onValueChange={handleDistrictChange}
                    value={selectedDistrict}
                    disabled={!selectedProvince || loading.districts}
                  >
                    <SelectTrigger
                      className={`h-11 w-full ${
                        errors.district ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          loading.districts ? "Đang tải..." : "Chọn quận/huyện"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {loading.districts ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Đang tải...</span>
                        </div>
                      ) : (
                        districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errors.district && (
                    <p className="text-xs text-red-500">
                      {errors.district.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label className="text-sm font-medium">Phường/Xã *</Label>
                  <Select
                    onValueChange={handleWardChange}
                    value={selectedWard}
                    disabled={!selectedDistrict || loading.wards}
                  >
                    <SelectTrigger
                      className={`h-11 w-full ${
                        errors.ward ? "border-red-500" : ""
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          loading.wards ? "Đang tải..." : "Chọn phường/xã"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {loading.wards ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="ml-2">Đang tải...</span>
                        </div>
                      ) : (
                        wards.map((ward) => (
                          <SelectItem key={ward.id} value={ward.id}>
                            {ward.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {errors.ward && (
                    <p className="text-xs text-red-500">
                      {errors.ward.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Phương thức thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  handlePaymentMethodChange(value as "bank_transfer" | "cod")
                }
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label
                    htmlFor="cod"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Wallet className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Thu hộ (COD)</div>
                      <div className="text-sm text-gray-500">
                        Thanh toán khi nhận hàng
                      </div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-4">
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                  <Label
                    htmlFor="bank_transfer"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Chuyển khoản ngân hàng</div>
                      <div className="text-sm text-gray-500">
                        Chuyển khoản trước khi giao hàng
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "bank_transfer" && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Thông tin tài khoản
                  </h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Ngân hàng:</span>{" "}
                      {bankAccountInfo.bankName}
                    </p>
                    <p>
                      <span className="font-medium">Số tài khoản:</span>{" "}
                      {bankAccountInfo.accountNumber}
                    </p>
                    <p>
                      <span className="font-medium">Tên tài khoản:</span>{" "}
                      {bankAccountInfo.accountName}
                    </p>
                    {bankAccountInfo.branch && (
                      <p>
                        <span className="font-medium">Chi nhánh:</span>{" "}
                        {bankAccountInfo.branch}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-blue-700 mt-2">
                    Vui lòng chuyển khoản đúng số tiền và ghi chú mã đơn hàng
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Note */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Ghi chú
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                {...register("note")}
                rows={3}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm đã chọn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCartItems.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Số lượng: {item.qty}
                    </p>
                    <p className="text-sm font-medium">
                      {(item.price * item.qty).toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tổng đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString("vi-VN")} ₫</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{shippingFee.toLocaleString("vi-VN")} ₫</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng:</span>
                <span>{total.toLocaleString("vi-VN")} ₫</span>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-medium"
            size="lg"
          >
            Đặt hàng
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
