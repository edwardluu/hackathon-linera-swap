"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";

import Image from "next/image";
import { Wallet } from "lucide-react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLocalStorage } from "usehooks-ts";
import { useSuspenseQuery } from "@apollo/client";
import { ACCOUNT, LIST_TOKEN } from "@/constant/info";
import { GET_BALANCE_1, GET_BALANCE_2}  from '@/lib/query';

interface DialogAccountProps {
  children?: ReactNode;
}

const DialogAccount = ({ children }: DialogAccountProps) => {
  const [value, setValue, removeValue] = useLocalStorage("account", "");
  const [isOpen, setIsOpen] = useState(false);

  const { data: balance1, refetch: refetchBalance1 } = useSuspenseQuery(GET_BALANCE_1, { fetchPolicy: 'no-cache'} );
  const { data: balance2, refetch: refetchBalance2 } = useSuspenseQuery(GET_BALANCE_2, { fetchPolicy: 'no-cache'});

  const displayAccount = useMemo(() => {
    return value ? `${value.substring(0, 4)}...${value.substring(value.length - 4, value.length)}` : "No account";
  }, [value]);

  const isConnected = useMemo(() => {
    return !!value;
  }, [value]);

  const onSelectAccount = (account: string) => {
    setValue(account);
    setIsOpen(false);
  };

  const disconnect = () => {
    removeValue();
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(!!value && isOpen)
      if(!!value && isOpen) {
        refetchBalance1();
        refetchBalance2();
      }
  }, [value, isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="flex cursor-pointer font-bold items-center gap-x-2 w-auto px-8 py-2 bg-primary border border-primary text-white rounded-3xl hover:bg-white hover:text-primary">
            <Wallet size={16} />
            <span> {isConnected ? displayAccount : "Connect Account"}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:w-[425px] w-[300px]">
        {!isConnected && (
          <>
            <DialogHeader>
              <DialogTitle>Select Account</DialogTitle>
              <DialogDescription> Select an account you want to connect</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button onClick={() => onSelectAccount(ACCOUNT)} variant="secondary" className="hover:bg-primary hover:text-white">
                <p className="truncate w-[300px]">{ACCOUNT}</p>
              </Button>
            </div>
          </>
        )}

        {isConnected && (
          <>
            <DialogHeader>
              <DialogTitle>Account Information</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="text-lg font-semibold text-primary flex flex-col gap-3 justify-center items-center mb-3">
                <div className="bg-white w-auto rounded-full">
                  <Image width={80} height={80} src="/avatar.jpg" alt="avatar" className="rounded-full py-2 border border-primary" />
                </div>
                <p>{displayAccount}</p>
              </div>
              <ul className="w-full flex flex-col gap-3">
                  <li className="flex items-center justify-between py-2 px-2 rounded-md cursor-pointer gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name={LIST_TOKEN[0].icon} size={20} className="text-primary" />
                      <span className="text-lg text-slate-700">{LIST_TOKEN[0].name}</span>
                    </div>
                    <div className="text-lg text-slate-900">{balance1?.accounts?.entry?.value || 0}</div>
                  </li>
                  <li className="flex items-center justify-between py-2 px-2 rounded-md cursor-pointer gap-4">
                    <div className="flex items-center gap-2">
                      <Icon name={LIST_TOKEN[1].icon} size={20} className="text-primary" />
                      <span className="text-lg text-slate-700">{LIST_TOKEN[1].name}</span>
                    </div>
                    <div className="text-lg text-slate-900">{balance2?.accounts?.entry?.value || 0}</div>
                  </li>
              </ul>
            </div>
            <DialogFooter>
              <Button onClick={disconnect} variant="secondary" className="w-full hover:bg-primary/90 hover:text-white">
                Disconnect
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAccount;
