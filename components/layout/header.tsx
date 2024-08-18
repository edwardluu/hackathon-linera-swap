"use client"
import dynamic from "next/dynamic";
import Image from "next/image";

const DialogAccount = dynamic(() => import('@/components/sections/dialog-account'), { ssr: false })

export default function Header() {
  return (
    <div className="h-20 w-full flex justify-between items-center bg-white px-4 border-b">
      <div className="bg-white w-auto rounded-full">
        <Image width={50} height={50} src="/logo.png" alt="logo" />
      </div>
      <div className="flex items-center">
        <DialogAccount />
      </div>
    </div>
  );
}
