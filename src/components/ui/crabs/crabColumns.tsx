import { Button } from "@/components/Button";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { Crab, CrabStatus } from "@/types/crab.types";
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Crab>()

function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

const statusColorMap: Record<string, string> = {
  [CrabStatus.IN]:
    'bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-500/20 dark:text-emerald-500 dark:ring-emerald-400/20 dark:bg-green-200 dark:text-green-900',
  [CrabStatus.SOLD]:
    'bg-blue-100 text-blue-800 ring-blue-600/10 dark:bg-blue-200 dark:text-blue-900',
  [CrabStatus.DEAD]:
    'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900',
};

const StatusCell = ({ value }: { value: string }) => {
  return (
    <span
      className={[
        statusColorMap[value] || '',
        'inline-flex items-center uppercase rounded px-4 py-0.5 text-tremor-label font-medium ring-1 ring-inset',
      ].join(' ')}
    >
      {value}
    </span>
  );
};

export function getCrabColumns({
  onEditActionClicked,
  onDeleteActionClicked,
}: {
  onEditActionClicked?: (id: number) => void;
  onDeleteActionClicked?: (id: number) => void;
}): ColumnDef<Crab>[] {
  return [
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
    columnHelper.accessor("weight", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Weight" />
      ),
      enableSorting: true,
      enableHiding: false,
      meta: {
        className: "text-left",
        displayName: "Weight",
      },
    }),
    columnHelper.accessor("supplier", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Supplier" />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: {
        className: "text-left",
        displayName: "Supplier",
      },
    }),
    columnHelper.accessor("status", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: {
        className: "text-left",
        displayName: "Status",
      },
      cell: ({ getValue }) => (<StatusCell value={getValue<string>()} />),
    }),
    columnHelper.accessor("checkInDate", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Check In Date" />
      ),
      enableSorting: true,
      enableHiding: false,
      meta: {
        className: "text-left",
        displayName: "Check In Date",
      },
      cell: ({ getValue }) => getValue<Date | string>() ? formatDate(getValue<Date | string>()) : "-",
    }),
    columnHelper.accessor("notes", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Notes" />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: {
        className: "text-left",
        displayName: "Notes",
      },
    }),
    columnHelper.accessor("checkOutDate", {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Check Out Date" />
      ),
      enableSorting: true,
      enableHiding: false,
      meta: {
        className: "text-left",
        displayName: "Check Out Date",
      },
      cell: ({ getValue }) => getValue<Date | string>() ? formatDate(getValue<Date | string>()) : "-",
    }),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="secondary"
            onClick={() => {
              onEditActionClicked?.(row.original.id);
            }}
          >
            <RiEditLine className="-ml-1 size-4 shrink-0" aria-hidden="true" />
          </Button>

          <Button
            variant="secondary"
            onClick={() => {
              onDeleteActionClicked?.(row.original.id);
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
  ] as ColumnDef<Crab>[];
}