"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  BankResponse,
  ProcessingTransactionTypeResponse,
  ProductTypeResponse,
} from "@/types/types";
import { useRouter } from "next/navigation";
// import { deleteUser } from "@/actions/user-action";
import { useUserModal } from "@/hooks/use-user-modal";

interface CellActionProps {
  data: ProcessingTransactionTypeResponse;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("client ID copied to the clipboard");
  };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const userModal = useUserModal();
  // const { data: session } = useSession();

  const onDelete = async () => {
    // try {
    //   setLoading(true);
    //   await deleteUser(data.userId.toString());
    //   router.refresh();
    //   toast.success("User deleted.");
    // } catch (error) {
    //   toast.error("Something went wrong!");
    // } finally {
    //   setLoading(false);
    //   setOpen(false);
    // }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id.toString())}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          {/* @ts-ignore */}
          {/* {session?.user?.role === "ADMIN" && (
            <DropdownMenuItem onClick={() => userModal.onOpen()}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          )} */}
          {/* @ts-ignore */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
