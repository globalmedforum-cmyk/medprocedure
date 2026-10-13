import Image from "next/image";
import logo from "@/public/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 font-heading text-lg font-medium tracking-tight text-text-primary",
        className
      )}
    >
      <Image src={logo} alt="" priority className="h-11 w-auto" />
      MedProcedure
    </span>
  );
}
