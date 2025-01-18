import { 
  ShoppingBag, 
  Laptop, 
  Sparkles, 
  Home, 
  Dumbbell,
  Plane,
  Coffee,
  Film,
  type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  Laptop,
  Sparkles,
  Home,
  Dumbbell,
  Plane,
  Coffee,
  Film
};

export function getIconComponent(name: string): LucideIcon {
  return iconMap[name] || ShoppingBag;
}