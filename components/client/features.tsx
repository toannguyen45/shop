import { User } from "lucide-react";

export const Features = () => (
  <div className="max-w-screen-xl mx-auto py-20 px-4">
    <div className="flex flex-col gap-10">
      <div className="flex gap-4 flex-col items-start">
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
            Có gì mới
          </h2>
          {/* <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight  text-left">
            Managing a small business today is already tough.
          </p> */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
          <User className="w-8 h-8 stroke-1" />
          <div className="flex flex-col">
            <h3 className="text-xl tracking-tight font-medium">Pay supplier invoices</h3>
            <p className="max-w-xs text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
        </div>
        <div className="bg-muted rounded-md  aspect-square p-6 flex justify-between flex-col">
          <User className="w-8 h-8 stroke-1" />
          <div className="flex flex-col">
            <h3 className="text-xl tracking-tight font-medium">Pay supplier invoices</h3>
            <p className="max-w-xs text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
        </div>

        <div className="bg-muted rounded-md aspect-square p-6 flex justify-between flex-col">
          <User className="w-8 h-8 stroke-1" />
          <div className="flex flex-col">
            <h3 className="text-xl tracking-tight font-medium">Pay supplier invoices</h3>
            <p className="max-w-xs text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
        </div>
        <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
          <User className="w-8 h-8 stroke-1" />
          <div className="flex flex-col">
            <h3 className="text-xl tracking-tight font-medium">Pay supplier invoices</h3>
            <p className="max-w-xs text-base">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
