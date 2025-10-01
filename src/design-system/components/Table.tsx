import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor?: (item: T) => React.ReactNode;
  field?: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: number;
  align?: "left" | "center" | "right";
  cellRenderer?: (params: any) => React.ReactNode;
  cellEditor?: string;
  editable?: boolean;
  checkboxSelection?: boolean;
  headerCheckboxSelection?: boolean;
  pinned?: "left" | "right";
  resizable?: boolean;
  hide?: boolean;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  sortable?: boolean;
  filterable?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  editable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  onFilter?: (filters: Record<string, string>) => void;
  onSelect?: (selectedItems: T[]) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onRowClick?: (item: T) => void;
  onCellValueChanged?: (item: T, field: string, newValue: any) => void;
  className?: string;
  height?: number | string;
  theme?: "alpine";
  rowSelection?: "single" | "multiple";
  pagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
  suppressRowClickSelection?: boolean;
  animateRows?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  groupDisplayType?: "singleColumn" | "multipleColumns" | "groupRows";
  autoGroupColumnDef?: ColDef;
  masterDetail?: boolean;
  detailCellRenderer?: (params: any) => React.ReactNode;
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  sortable = true,
  filterable = true,
  selectable = false,
  expandable = false,
  editable = false,
  loading = false,
  emptyMessage = "No data available",
  onSort,
  onFilter,
  onSelect,
  onEdit,
  onDelete,
  onRowClick,
  onCellValueChanged,
  className = "",
  height = 400,
  theme = "alpine",
  rowSelection = "multiple",
  pagination = false,
  paginationPageSize = 10,
  paginationPageSizeSelector = [10, 20, 50, 100],
  suppressRowClickSelection = false,
  animateRows = true,
  rowHeight = 40,
  headerHeight = 40,
  groupDisplayType = "singleColumn",
  autoGroupColumnDef,
  masterDetail = false,
  detailCellRenderer,
}: TableProps<T>) => {
  // Convert our column format to AG Grid column format
  const columnDefs: ColDef[] = React.useMemo(() => {
    const agColumns: ColDef[] = columns.map((column) => ({
      field: column.field || column.key,
      headerName: column.header,
      sortable: column.sortable !== false && sortable,
      filter: column.filterable !== false && filterable,
      width: column.width,
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
      flex: column.flex,
      cellStyle: {
        textAlign: column.align || "left",
      },
      cellRenderer: column.cellRenderer,
      cellEditor: column.cellEditor,
      editable: column.editable || editable,
      checkboxSelection: column.checkboxSelection,
      headerCheckboxSelection: column.headerCheckboxSelection,
      pinned: column.pinned,
      resizable: column.resizable !== false,
      hide: column.hide,
    }));

    // Add actions column if needed
    if (onEdit || onDelete || onRowClick) {
      agColumns.push({
        field: "actions",
        headerName: "Actions",
        width: 120,
        cellRenderer: (params: any) => {
          return (
            <div className="flex space-x-2 justify-center">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(params.data);
                  }}
                  className="p-1 text-neutral-400 hover:text-blue-600 transition-colors"
                  title="Edit"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(params.data);
                  }}
                  className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              )}
              {onRowClick && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(params.data);
                  }}
                  className="p-1 text-neutral-400 hover:text-blue-600 transition-colors"
                  title="View"
                >
                  👁️
                </button>
              )}
            </div>
          );
        },
        sortable: false,
        filter: false,
        resizable: false,
      });
    }

    return agColumns;
  }, [columns, sortable, filterable, editable, onEdit, onDelete, onRowClick]);

  if (loading) {
    return (
      <div className={`ag-theme-${theme} ${className}`} style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-neutral-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`ag-theme-${theme} ${className}`} style={{ height }}>
        <div className="flex flex-col items-center justify-center h-full text-neutral-500">
          <div className="text-lg mb-2">📊</div>
          <div>{emptyMessage}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ag-theme-${theme} ${className}`} style={{ height }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
        animateRows={animateRows}
        rowHeight={rowHeight}
        headerHeight={headerHeight}
        rowSelection={rowSelection}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
        onSelectionChanged={(event) => {
          if (onSelect) {
            const selectedRows = event.api.getSelectedRows();
            onSelect(selectedRows);
          }
        }}
        onCellValueChanged={(event) => {
          if (onCellValueChanged) {
            onCellValueChanged(event.data, event.colDef.field!, event.newValue);
          }
        }}
        onRowClicked={(event) => {
          if (onRowClick && !suppressRowClickSelection) {
            onRowClick(event.data);
          }
        }}
      />
    </div>
  );
};
