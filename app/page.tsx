"use client"

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

const SwapForm = dynamic(() => import("@/components/sections/swap-form"), { ssr: false });


export default  function Home() {
  return (
    <main className="flex relative w-full h-full justify-center bg-slate-50" style={{ minHeight: "calc(100vh - 80px)" }}>
      <div className="absolute z-[1] inset-0 size-full bg-[radial-gradient(#00000030_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="flex-1 flex z-[1] flex-col justify-center items-center space-y-4 px-1 pt-10 lg:px-4 lg:pt-16 w-full sm:max-w-lg lg:max-w-7xl">
        <div className="flex-1 flex flex-col items-center gap-4 w-full lg:max-w-md">
          <div className="flex justify-center text-bold text-5xl text-gray-700 mb-4">SWAP</div>
          <Card className="w-full bg-white sm:shadow-md">
            <CardContent className="p-8">
              <SwapForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
