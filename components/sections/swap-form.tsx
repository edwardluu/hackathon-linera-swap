"use client";

import dynamic from "next/dynamic";

import SelectTokenModal from "@/components/sections/select-token";
import { Button } from "@/components/ui/button";
import { Settings2, ArrowDownUp, Wallet, OctagonAlert } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { LIST_TOKEN } from "@/constant/info";
import { useLocalStorage, useDebounceValue } from "usehooks-ts";
import { useSuspenseQuery } from "@apollo/client";
import { GET_BALANCE_1, GET_BALANCE_2 } from "@/lib/query";

const DialogAccount = dynamic(() => import("@/components/sections/dialog-account"), { ssr: false });

const DialogPreviewSwap = dynamic(() => import("@/components/sections/dialog-preview-swap"), { ssr: false });

const SwapForm = () => {
  const [value] = useLocalStorage("account", "");
  const [debouncedValue, setValue] = useDebounceValue("", 200);
  const [input1, setInput1] = useState("");
  const [token1, setToken1] = useState(LIST_TOKEN[0]);
  const [token2, setToken2] = useState(LIST_TOKEN[1]);

  const { data: balance1, refetch: refetchBalance1 } = useSuspenseQuery(GET_BALANCE_1, { fetchPolicy: "no-cache" });
  const { data: balance2, refetch: refetchBalance2 } = useSuspenseQuery(GET_BALANCE_2, { fetchPolicy: "no-cache" });

  const switchToken = () => {
    setToken1(token2);
    setToken2(token1);
    setInput1(debouncedValue);
    setValue(input1);
  };

  const refetchBalance = () => {
    refetchBalance1();
    refetchBalance2();
    setInput1("");
    setValue("");
  };

  const onSelectToken = (token: any, position: number) => {
    if (position === 0 && token.tokenIdx === token2.tokenIdx) {
      switchToken();
    }
    if (position === 1 && token.tokenIdx === token1.tokenIdx) {
      switchToken();
    }
    if (position === 0 && token.tokenIdx !== token1.tokenIdx) {
      setToken1(token);
    }
    if (position === 1 && token.tokenIdx !== token2.tokenIdx) {
      setToken2(token);
    }
  };

  const isConnected = useMemo(() => {
    return !!value || false;
  }, [value]);

  const balanceToken0 = useMemo(() => {
    return Number(balance1?.accounts?.entry?.value).toFixed(2) || 0;
  }, [balance1]);

  const balanceToken1 = useMemo(() => {
    return Number(balance2?.accounts?.entry?.value).toFixed(2) || 0;
  }, [balance2]);

  const onSetValue = (value: string) => {
    const inputValue = value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    setInput1(inputValue);
    const convertInputValue = inputValue !== "" ? Number(inputValue) : "";
    const valueConvert = convertInputValue !== "" ? convertInputValue * (token1.price / token2.price) : "";
    setValue(`${valueConvert}`);
  };

  const isMaxBalance = useMemo(() => {
    const balance = token1.tokenIdx === 0 ? balanceToken0 : balanceToken1;
    return Number(input1) > Number(balance);
  }, [input1, balanceToken0, balanceToken1, token1.tokenIdx]);

  const isMaxLiquidity = useMemo(() => {
    const balance = token2.tokenIdx === 0 ? balanceToken0 : balanceToken1;
    return Number(debouncedValue) > Number(balance);
  }, [debouncedValue, balanceToken0, balanceToken1, token2.tokenIdx]);

  return (
    <>
      <div className="w-full flex items-center mb-6 justify-between">
        <p className="text-lg">Swap</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-full px-3 py-2 w-auto ">
              <Settings2 size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] sm:w-[380px] max-w-[400px]">
            <div className="w-full text-xl pb-3 border-b">Transaction Settings</div>
            <div className="w-full flex flex-col py-4 gap-4  border-b">
              <p>Slippage tolerance</p>
              <div className="w-full flex gap-2">
                <Button className="min-w-16" variant="outline">
                  0.1%
                </Button>
                <Button className="min-w-16" variant="outline">
                  0.5%
                </Button>
                <Button className="min-w-16" variant="outline">
                  1%
                </Button>
                <Input placeholder="Custom" />
              </div>
            </div>
            <div className="pt-4 w-full flex justify-between">
              <Button variant="ghost">Reset Settings</Button>
              <Button variant="ghost">Save Settings</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col">
        <div className="w-full flex border min-h-4 rounded-lg items-start py-6 px-3 rounded-b-none ">
          <div className="flex flex-col gap-2 justify-end w-fit max-w-[150px]">
            <SelectTokenModal token={token1} onSelectToken={onSelectToken} position={0} />
            <div className="flex items-center gap-4 pl-2">
              <div className="flex items-center gap-1">
                <Wallet className="text-yellow-500" size={14} />
                {value ? <span className="text-xs">{token1.tokenIdx === 0 ? balanceToken0 : balanceToken1}</span> : 0}
                <Button onClick={() => onSetValue(token1.tokenIdx === 0 ? balanceToken0 : balanceToken1)} variant="outline" className="text-xs border-0 uppercase rounded h-auto py-1 px-2 ml-1">
                  Max
                </Button>
              </div>
            </div>
          </div>
          <Input value={input1} onInput={(e) => onSetValue(e?.target?.value)} type="text" className="border-0 text-right font-bold flex-1 text-xl text-slate-900 outline-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="0" min="0" step="any" />
        </div>
        <div className="w-full relative flex items-center justify-center">
          <Button onClick={switchToken} className="bg-white border-4 absolute text-slate-700 rounded-full px-2 py-2 w-auto hover:bg-primary/80 hover:text-white">
            <ArrowDownUp size={16} />
          </Button>
        </div>
        <div className="w-full flex border min-h-4 rounded-lg items-start py-6 px-3 rounded-t-none">
          <div className="flex flex-col gap-2 justify-end w-fit max-w-[150px]">
            <SelectTokenModal token={token2} onSelectToken={onSelectToken} position={1} />
            <div className="flex items-center gap-4 pl-2">
              <div className="flex items-center gap-1">
                <Wallet className="text-yellow-500" size={14} />
                {value ? <span className="text-xs">{token2.tokenIdx === 0 ? balanceToken0 : balanceToken1}</span> : 0}
              </div>
            </div>
          </div>
          <Input value={debouncedValue} readOnly type="text" className="border-0 text-right font-bold flex-1 text-xl text-slate-900 outline-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="0" min="0" step="any" />
        </div>
      </div>
      <div className="w-full mt-4 flex flex-col">
        {isMaxLiquidity && (
          <div className="flex items-center gap-2 bg-red-50 text-primary py-2 px-4 text-xs mb-2 rounded-lg">
            <OctagonAlert size={14} /> Pool Liquidity is Insufficient for this Swap
          </div>
        )}

        {isMaxBalance && (
          <div className="flex items-center gap-2 bg-red-50 text-primary py-2 px-4 text-xs mb-2 rounded-lg">
            <OctagonAlert size={14} />
            {token1.name} Amount Exceeds Wallet Balance
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-sm text-slate-500">Gas fee</span>
          <span className="text-slate-900">0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-500">Rate</span>
          <span className="text-slate-900">
            1 {token1.name} ≈ {(token1.price / token2.price).toFixed(2)} {token2.name}
          </span>
        </div>
      </div>
      {!isConnected && (
        <DialogAccount>
          <Button className="w-full mt-8 flex justify-center gap-3 h-14 capitalize text-lg">
            <Wallet /> <p>Connect Wallet</p>
          </Button>
        </DialogAccount>
      )}
      {isConnected && <DialogPreviewSwap refetchBalance={refetchBalance} isMaxLiquidity={isMaxLiquidity} isMaxBalance={isMaxBalance} pay={input1} receive={debouncedValue} token1={token1} token2={token2} />}
    </>
  );
};

export default SwapForm;
