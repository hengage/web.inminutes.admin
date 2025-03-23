"use client";
import Tag from "@/components/general/Tag";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import PopOver from "@/components/ui/custom/PopOver";
import { Icon } from "@/components/ui/Icon";
import {
  Table,
  TableBody,
  TableCell,
  //   TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUrlState from "@/hooks/useUrlState";

const arr = new Array(10).fill(1);

const VendorsTable = () => {
  const { getParam } = useUrlState();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-base">S/N</TableHead>
            <TableHead className="font-semibold text-base">Business Name</TableHead>
            <TableHead className="font-semibold text-base">ID Number</TableHead>
            <TableHead className="font-semibold text-base">Email Address</TableHead>
            <TableHead className="font-semibold text-base">Category</TableHead>
            <TableHead className="font-semibold text-base">Status</TableHead>
            <TableHead className="font-semibold text-base">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {arr.map((_, i) => (
            <TableRow key={i}>
              <TableCell className="font-normal text-lg text-ctm-secondary-200">{i + 1}</TableCell>
              <TableCell className="font-normal text-lg text-ctm-secondary-200">
                Genesis Foods
              </TableCell>
              <TableCell className="font-normal text-lg text-ctm-secondary-200">
                ID: #32678FGBDF
              </TableCell>
              <TableCell className="font-normal text-lg text-ctm-secondary-200">
                Johndoe85@gmail.com
              </TableCell>
              <TableCell className="font-normal text-lg text-ctm-secondary-200">
                Food & Beverage
              </TableCell>
              <TableCell className="font-normal text-lg text-ctm-secondary-200">
                <Tag tag="pending" />
              </TableCell>
              <TableCell className="font-normal text-lg text-ctm-secondary-200">
                <PopOver>
                  <div>
                    <Button variant={"ghost"}>
                      <Icon name="eye" />
                      View
                    </Button>
                    <Button variant={"ghost"}>
                      <Icon name="restrict" />
                      Restrict
                    </Button>
                    <Button variant={"ghost"}>
                      <Icon name="edit" />
                      Edit
                    </Button>
                    <Button variant={"ghost"}>
                      <Icon name="trash" />
                      Delete
                    </Button>
                  </div>
                </PopOver>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination total={100} currentPage={Number(getParam("page") ?? 1)} pageSize={10} />
    </div>
  );
};

export default VendorsTable;
