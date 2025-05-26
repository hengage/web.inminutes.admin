import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/providers/ToastContext";
import { useCreateSubCategorytMutation } from "@/api/product";

export interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
}

const CreateCategoryModal = ({ open, onOpenChange, categoryId }: CreateCategoryModalProps) => {
  const { showSuccess } = useToast();
  const [name, setName] = useState("");
  const { isPending, error, mutate: createCategory } = useCreateSubCategorytMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    createCategory(
      {
        subCategoryName: name,
        categoryId,
      },
      {
        onSuccess: () => {
          showSuccess("Sub Category created successfully");
          setName("");
          onOpenChange(false);
        },
        onError: (err: unknown) => {
          console.error("Error creating category:", err);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Sub Category</DialogTitle>
        </DialogHeader>

        <Input
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Category name"
        />

        {error && <p className="text-sm text-red-500 mt-2">{"Failed to create category."}</p>}

        <DialogFooter className="!flex !items-start !mt-3 !justify-start">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
