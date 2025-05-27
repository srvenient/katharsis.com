import {LucideIcon} from "lucide-react";

export type NavbarProps = {
  title: string;
  showButton?: boolean;
  buttonAction?: () => void;
  buttonIcon?: LucideIcon;
}