"use client";

import {
  ColumnDef,
  createColumnHelper,
  metaHelper,
  RowData,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import * as S from "./styles";

type DataTableColumnMeta = {
  align?: "left" | "center" | "right";
  pinned?: "right";
};

const dataTableFeatures = tableFeatures({
  columnMeta: metaHelper<DataTableColumnMeta>(),
});

type DataTableFeatures = typeof dataTableFeatures;

export type DataTableColumn<TData extends RowData> = ColumnDef<
  DataTableFeatures,
  TData,
  any // eslint-disable-line @typescript-eslint/no-explicit-any
>;

export const createDataTableColumns = <TData extends RowData>() =>
  createColumnHelper<DataTableFeatures, TData>();

type DataTableProps<TData extends RowData> = {
  data: TData[];
  columns: DataTableColumn<TData>[];
  emptyMessage?: string;
  maxHeight?: string;
};

export const DataTable = <TData extends RowData>({
  data,
  columns,
  emptyMessage = "Nenhum registro encontrado.",
  maxHeight,
}: DataTableProps<TData>) => {
  const table = useTable({ features: dataTableFeatures, columns, data });
  const rows = table.getRowModel().rows;

  return (
    <S.Wrapper $maxHeight={maxHeight}>
      <S.Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <S.HeaderCell
                  key={header.id}
                  $align={header.column.columnDef.meta?.align}
                  $pinned={header.column.columnDef.meta?.pinned}
                >
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </S.HeaderCell>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <S.EmptyCell colSpan={columns.length}>{emptyMessage}</S.EmptyCell>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <S.Cell
                    key={cell.id}
                    $align={cell.column.columnDef.meta?.align}
                    $pinned={cell.column.columnDef.meta?.pinned}
                  >
                    <table.FlexRender cell={cell} />
                  </S.Cell>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </S.Table>
    </S.Wrapper>
  );
};
