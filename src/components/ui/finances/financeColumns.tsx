import { Finance } from "@/types/finance.types"
import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader"

const columnHelper = createColumnHelper<Finance>()

export const financeColumns = [
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
] as ColumnDef<Finance>[]