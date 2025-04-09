import { SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <header>
        <div className="header-top bg-black text-white flex justify-between items-center px-10 py-3">
          <p>EN / VI</p>
          <p>
            Chào mừng đến với shop quần áo đẹp Chào mừng đến với shop quần áo
            đẹp
          </p>
          <div className="flex items-center gap-4">
            <p>Liên Hệ</p>
            <p>Về chúng tôi</p>
          </div>
        </div>
        <div className="header-mid bg-white flex justify-between items-center px-10 py-6">
          <ul className="flex gap-7 uppercase font-medium">
            <li>Trang chủ</li>
            <li>Nam</li>
            <li>Nữ</li>
            <li>Liên Hệ</li>
          </ul>
          <h1 className="uppercase font-bold text-4xl">LOGO</h1>
          <div className="flex gap-10">
            <SearchIcon />
            <UserIcon />
            <ShoppingBagIcon />
          </div>
        </div>
      </header>
      <div className="hero bg-slate-400 h-[500px] flex justify-center items-center"></div>
      <div className="category py-14">
        <div className="flex justify-between items-center px-10">
          <h2 className="uppercase text-5xl">READY-TO-WEAR</h2>
          <p>see more</p>
        </div>
        <div className="products grid grid-cols-4 px-10 py-10">
          <div className="product h-[300px] border border-amber-500"></div>
          <div className="product h-[300px] border border-amber-500"></div>
          <div className="product h-[300px] border border-amber-500"></div>
          <div className="product h-[300px] border border-amber-500"></div>
        </div>
      </div>
    </>
  );
}
