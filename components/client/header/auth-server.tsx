import React from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { User, ShoppingCart, LogOut } from "lucide-react";
import { getSessionWithUser } from "@/lib/session";
import { getMyCart } from "@/actions/cart.actions";
import { logout } from "@/actions/auth.action";
import { Badge } from "@/components/ui/badge";

const AuthServer = async () => {
  const sessionWithUser = await getSessionWithUser();
  const cart = await getMyCart();
  const cartCount = cart?.items?.reduce((sum, item) => sum + item.qty, 0) || 0;

  return (
    <div className="flex items-center gap-3">
      <Link href="/cart" passHref>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full"
              variant="secondary"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </Link>

      <div className="relative group">
        <Button variant="ghost" size="sm" className="relative">
          <User className="h-5 w-5" />
        </Button>

        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          {!sessionWithUser ? (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="flex flex-col space-y-1">
                  {sessionWithUser.user.name && (
                    <p className="font-medium text-sm">
                      {sessionWithUser.user.name}
                    </p>
                  )}
                  {sessionWithUser.user.email && (
                    <p className="text-xs text-gray-500 truncate">
                      {sessionWithUser.user.email}
                    </p>
                  )}
                </div>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Tài khoản
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </div>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthServer;
