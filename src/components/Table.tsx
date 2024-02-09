import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";

type Server = {
  name: string;
  distance: number;
};

const columnHelper = createColumnHelper<Server>(); //Pass User type as the generic TData type

const data: Server[] = [
  {
    name: "Germany",
    distance: 100,
  },
  {
    name: "France",
    distance: 200,
  },
  {
    name: "United States",
    distance: 150,
  },
  {
    name: "Japan",
    distance: 1400,
  },
  {
    name: "Australia",
    distance: 50,
  },
];

const columns = [
  columnHelper.accessor("name", {
    header: () => "Server Name",
  }),
  columnHelper.accessor("distance", {
    header: () => "Distance (km)",
  }),
];

const Table = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full max-w-full mb-7 rounded-md overflow-hidden shadow-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="text-left bg-white/70 min-w-full text-slate-700"
          >
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-4 py-3 min-w-full border-r hover:bg-white/50"
                >
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className="border-b border-white/20 bg-white/20 text-slate-100 hover:bg-white/50 even:bg-white/40"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="border-r px-4 py-1 border-white/40">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { Table };
