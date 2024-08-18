"use client"

import { icons, LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: keyof typeof icons | string;
}


export default function  Icon({ name, ...props}: IconProps) {
    // @ts-ignore:next-line
    const LucideIcon = icons[name];
    return <LucideIcon {...props} />;
}