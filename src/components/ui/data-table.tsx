"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { IPaginationData } from "@/types";

interface PaginatedTableProps<T> {
  dataQuery: UseQueryResult<IPaginationData<T>, Error>;
  columns: ColumnDef<T>[];
  pagination?: PaginationState;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>;
}

const DataTable = <T,>({ dataQuery, columns, pagination }: PaginatedTableProps<T>) => {
  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data?.data ?? defaultData,
    columns,
    // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    rowCount: dataQuery.data?.totalPages, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    // state: {
    //   pagination,
    // },
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  });

  // Reset to page 0 if no results and page is not 0
  useEffect(() => {
    if (dataQuery.data?.data?.length === 0 && pagination?.pageIndex !== 0) {
      table.setPageIndex(0);
    }
  }, [dataQuery.data?.data, pagination?.pageIndex, table]);

  return (
    <div className="bg-white min-h-[20rem]">
      <div className="relative">
        {dataQuery.isPending && (
          <div className="flex items-center justify-center absolute top-0 left-0 w-[99.9%] h-full min-h-[20rem] bg-ctm-secondary-50 opacity-50">
            <span className="loading loading-md text-ctm-primary-400 m-auto"></span>
          </div>
        )}
        <Table className="relative">
          <TableHeader className="h-[67px] border-b border-b-gray-200 static top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-6 font-medium text-[#160A62]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {!dataQuery.isPending && (
            <TableBody className="">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="h-[84px] border-b border-[#F5F5F5] bg-none"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-6 font-medium text-[#121212]">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-[15rem] text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="h-2" />
      {/* Footer */}
    </div>
  );
};

export default DataTable;

// {!table.getPageCount() ? null : (
//   <div className="flex items-center justify-between px-6 py-4">
//     {/* Page x of y */}
//     <span className="flex items-center gap-1 text-sm font-medium text-[#344054]">
//       <div>Page</div>
//       <span>
//         {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
//       </span>
//     </span>
//     {/* Pagination */}
//     <div className="flex items-center gap-2">
//       <CustomButton
//         variant="ctm-outline"
//         className="h-9 rounded border text-sm font-semibold text-[#344054]"
//         onClick={() => table.previousPage()}
//         disabled={!table.getCanPreviousPage()}
//       >
//         Previous
//       </CustomButton>
//       <CustomButton
//         variant="ctm-outline"
//         className="h-9 rounded border text-sm font-semibold text-[#344054]"
//         onClick={() => table.nextPage()}
//         disabled={!table.getCanNextPage()}
//       >
//         Next
//       </CustomButton>
//     </div>
//   </div>
// )}
