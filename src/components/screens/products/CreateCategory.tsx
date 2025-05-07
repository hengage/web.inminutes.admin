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
import { useCreateCategorytMutation, useGetCategoriesQuery } from "@/api/product";
import { useToast } from "@/providers/ToastContext";

const CreateCategoryModal = ({ open, onOpenChange }) => {
  const { showSuccess } = useToast();

  const [name, setName] = useState("");
  const { refetch } = useGetCategoriesQuery();

  const { isPending, error, mutate: createCategory } = useCreateCategorytMutation();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await createCategory({ name }).unwrap();
      showSuccess(" Category created successfully");
      setName("");
      onOpenChange(false);
      refetch();
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>

        <Input
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Category name"
        />

        {error && (
          <p className="text-sm text-red-500 mt-2">
            {error?.data?.message || "Failed to create category."}
          </p>
        )}

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
