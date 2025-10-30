import { Button } from "@/components/Button";
import { Finance } from "@/types/finance.types";
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";

const columnHelper = createColumnHelper<Finance>()

type getFinanceColumnsProps = {
  onFocusFinanceAction?: (id: number) => void;
  onDeleteFinanceAction?: (id: number) => void;
}

export function getFinanceColumns({ onFocusFinanceAction, onDeleteFinanceAction }: getFinanceColumnsProps): ColumnDef<Finance>[] {
  const financeColumns = [
    columnHelper.accessor("id", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      enableSorting: true,
      enableHiding: false,
      meta: {
        className: "text-left",
        displayName: "ID",
      },
      cell: ({ getValue }) => `#${getValue<number>()}`,
    }),
    columnHelper.accessor("type", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Type",
      },
      cell: ({ getValue }) => getValue<Finance["type"]>(),
    }),
    columnHelper.accessor("category", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Category",
      },
      cell: ({ getValue }) => getValue<Finance["category"]>(),
    }),

    columnHelper.accessor("amount", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
      enableSorting: true,
      meta: {
        className: "text-right",
        displayName: "Amount",
      },
      cell: ({ getValue }) => `$${getValue<Finance["amount"]>()}`,
    }),
    columnHelper.accessor("description", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Description",
      },
      cell: ({ getValue }) => getValue<Finance["description"]>(),
    }),
    columnHelper.accessor("referenceId", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Reference ID" />
      ),
      enableSorting: false,
      meta: {
        className: "text-left",
        displayName: "Reference ID",
      },
      cell: ({ getValue }) => getValue<Finance["referenceId"]>() || "-",
    }),
    columnHelper.accessor("createdAt", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      enableSorting: true,
      meta: {
        className: "text-left",
        displayName: "Created At",
      },
      cell: ({ getValue }) => {
        const date = getValue<Date>()
        return date ? date.toLocaleString() : "-"
      },
    }),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="secondary"
            onClick={() => {
              onFocusFinanceAction?.(row.original.id);
            }}
          >
            <RiEditLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              onDeleteFinanceAction?.(row.original.id);
            }}
          >
            <RiDeleteBinLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
          </Button>
        </div>
      ),
      meta: {
        className: "text-center",
        displayName: "Actions",
      },
    }
  ] as ColumnDef<Finance>[];

  return financeColumns;
}