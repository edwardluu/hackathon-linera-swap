"use client"

import React from "react";
import { useState } from "react";
import { CircleDollarSign, Loader2, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { TokenInfo } from "@/constant/info";
import { useMutation } from "@apollo/client";
import { MAKE_SWAP } from "@/lib/query";
import { useLocalStorage } from "usehooks-ts";


interface PreviewSwapProps {
  isMaxBalance: boolean;
  isMaxLiquidity: boolean;
  pay: string;
  receive: string;
  token1: TokenInfo;
  token2: TokenInfo;
  resetField: Function;
}
const DialogPreviewSwap = ({ resetField, isMaxBalance, isMaxLiquidity, pay, receive, token1, token2 }: PreviewSwapProps) => {
  const [value] = useLocalStorage("account", "");
  const [isOpen, setIsOpen] = useState(false);
  const [isSwapSuccess, setIsSwapSuccess] = useState(false);

  const [makeSwap, { loading: swapLoading }] = useMutation(MAKE_SWAP, {
    onError: (error) => console.log("Transfer Error: " + error.message),
    onCompleted: () => {
      setIsSwapSuccess(true);
      resetField();
    },
  });

  const onSwapToken = () => {
    makeSwap({
      variables: {
        owner: `User:${value}`,
        inputTokenIdx: token1.tokenIdx,
        inputAmount: pay,
      },
    }).then(r => console.log("SWAP: " + JSON.stringify(r, null, 2)));
  }

  const openChange = (value: boolean | ((prevState: boolean) => boolean)) => {
    if (!value) {
      setIsSwapSuccess(false);
    }
    setIsOpen(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogTrigger asChild>
        <Button disabled={isMaxBalance || isMaxLiquidity || !Number(pay)} className="w-full mt-8 flex justify-center gap-3 h-14 capitalize text-lg">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-80 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Preview swap</DialogTitle>
          <DialogDescription className="py-4">
            <video className="w-full rounded-xl" src="/meo_swap.mp4" autoPlay loop></video>
          </DialogDescription>
        </DialogHeader>
        {!isSwapSuccess && (
          <div className="flex w-full flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <p className="text-sm text-slate-600">You pay</p>
              <div className="w-auto flex justify-between items-center ">
                <p className="text-lg text-slate-900">{pay}</p>
                <div className="flex items-center gap-1 text-sm w-auto px-3 py-1 bg-primary text-white rounded-md">
                  <CircleDollarSign size={16} /> {token1?.name}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <p className="text-slate-600 text-sm">You receive</p>
              <div className="w-auto flex justify-between items-center ">
                <p className="text-lg text-slate-900">{receive}</p>
                <div className="flex items-center gap-1 text-sm w-auto px-3 py-1 bg-primary text-white rounded-md">
                  <CircleDollarSign size={16} /> {token2?.name}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Gas fee</span>
              <span className="text-slate-900">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Rate</span>
              <span className="text-slate-900">
                1 {token1.name} ≈ {(token1.price / token2.price).toFixed(2)} {token2.name}
              </span>
            </div>
            <div className="flex w-full mt-6">
              <Button disabled={swapLoading} onClick={() => onSwapToken()} className="w-full">
                {swapLoading ? (
                  <div className="flex gap-2 items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Swapping ...
                  </div>
                ) : (
                  <span>Swap</span>
                )}
              </Button>
            </div>
          </div>
        )}

        {isSwapSuccess && (
          <div className="w-full pb-4 flex flex-col gap-4 items-center justify-center">
            <CircleCheckBig className="text-green-600" size={50} />
            <p className="text-lg text-green-600">Transaction Success</p>
            <p className="text-sm text-slate-600">
              Swap {token1.name} to {token2.name}
            </p>
            <Button onClick={() => openChange(false)} variant="secondary" className="w-full bg-slate-300 mt-2">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogPreviewSwap;
