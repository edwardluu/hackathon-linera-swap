"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { LIST_TOKEN, TokenInfo } from "@/constant/info";
import { useState } from "react";

interface TokenProps {
  token: TokenInfo;
  onSelectToken: Function;
  position: number;
}

export default function SelectTokenModal({ token, onSelectToken, position }: TokenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectToken = (value: any) => {
    onSelectToken(value, position);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex border-0 items-center justify-between rounded-md py gap-2">
          <div className="flex items-center gap-2">
            <Icon size={20} name={token.icon} className="text-primary" />
            <span>{token?.name}</span>
          </div>
          <ChevronDown size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 disabled:text-muted-foreground">
            <Search size={16} />
          </div>
          <Input className="pl-10" placeholder="Search by name, symbol or address" />
        </div>
        <div className="flex flex-wrap gap-4 py-4">
          {LIST_TOKEN.map((token) => (
            <Button key={token.tokenIdx} variant="outline" className="flex items-center gap-2 px-2 py-1 h-auto rounded-sm">
              <Icon name={token.icon} size={14} className="text-primary" />
              <span className="text-xs text-slate-600">{token.name}</span>
            </Button>
          ))}
        </div>
        <div className="w-full border-t py-8">
          <ul className="flex flex-col gap-2">
            {LIST_TOKEN.map((token) => (
              <li key={token.tokenIdx} onClick={() => selectToken(token)} className="flex items-center py-2 px-2 rounded-md cursor-pointer gap-4 hover:bg-primary/10 hover:text-white">
                <Icon name={token.icon} size={20} className="text-primary" />
                <span className="text-lg text-slate-700">{token.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
