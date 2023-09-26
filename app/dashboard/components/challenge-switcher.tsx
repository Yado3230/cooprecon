// "use client";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useProductModal } from "@/hooks/use-challenge-modal";
// import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Check,
//   ChevronsUpDown,
//   Gamepad2,
//   PlusCircle,
//   Store as StoreIcon,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";
// import { Challenge } from "@/types";

// type PopoverTriggerProps = React.ComponentPropsWithoutRef<
//   typeof PopoverTrigger
// >;

// interface ChallengeSwitcherProps extends PopoverTriggerProps {
//   items: Challenge[];
// }

// export default function ChallengeSwitcher({
//   className,
//   items,
// }: ChallengeSwitcherProps) {
//   const productModal = useProductModal();
//   const params = useParams();
//   const router = useRouter();

//   const formattedItems = items.map((item) => ({
//     label: item.challengeName,
//     value: item.challengeId,
//   }));

//   const currentChallenge = formattedItems.find(
//     (item) => item.value.toString() === params.challengeId
//   );

//   const [open, setOpen] = useState(false);

//   const onProductSelect = (product: { value: number; label: string }) => {
//     setOpen(false);
//     router.push(`/${product.value}`);
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger>
//         <Button
//           variant="outline"
//           size="sm"
//           role="combobox"
//           aria-expanded={open}
//           aria-label="Select a product"
//           className={cn("w-[200px] justify-between", className)}
//         >
//           <Gamepad2 className="mr-2 h-4 w-4" />
//           {currentChallenge?.label}
//           <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandList>
//             <CommandInput placeholder="Search challenge..." />
//             <CommandEmpty>No product found.</CommandEmpty>
//             <CommandGroup heading="Challenges">
//               {formattedItems.map((product) => (
//                 <CommandItem
//                   key={product.value}
//                   onSelect={() => onProductSelect(product)}
//                   className="text-sm"
//                 >
//                   <Gamepad2 className="mr-2 h-4 w-4" />
//                   {product.label}
//                   <Check
//                     className={cn(
//                       "ml-auto h-4 w-4",
//                       currentChallenge?.value === product.value
//                         ? "opacity-100"
//                         : "opacity-0"
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//           <CommandSeparator />
//           <CommandGroup>
//             <CommandItem
//               onSelect={() => {
//                 setOpen(false);
//                 productModal.onOpen();
//               }}
//             >
//               <PlusCircle className="mr-2 h-5 w-5" />
//               Create Challenge
//             </CommandItem>
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
