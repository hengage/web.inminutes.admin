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
import { CreateCategoryModalProps } from "./CreateCategory";

const CreateSubCategoryModal = ({ open, onOpenChange }: CreateCategoryModalProps) => {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    // ser(formData);
    setName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Sub-Category</DialogTitle>
        </DialogHeader>

        <Input
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Sub-category name"
          className="col-span-3"
        />
        <DialogFooter className="!flex !items-start !mt-3 !justify-start">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubCategoryModal;
