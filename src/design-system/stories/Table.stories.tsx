import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../components/Table';

const meta: Meta<typeof Table> = {
  title: 'Content Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data grid component built with AG Grid, featuring sorting, filtering, row selection, pagination, and advanced data manipulation capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sortable: {
      control: { type: 'boolean' },
    },
    filterable: {
      control: { type: 'boolean' },
    },
    selectable: {
      control: { type: 'boolean' },
    },
    editable: {
      control: { type: 'boolean' },
    },
    pagination: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['alpine'],
    },
    rowSelection: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
    height: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Senior Designer',
    department: 'Design',
    status: 'Active',
    lastActive: '2 minutes ago',
    salary: 85000,
    startDate: '2022-01-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'Away',
    lastActive: '1 hour ago',
    salary: 95000,
    startDate: '2021-08-20',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    role: 'Frontend Developer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '30 minutes ago',
    salary: 78000,
    startDate: '2022-03-10',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david.brown@company.com',
    role: 'Backend Developer',
    department: 'Engineering',
    status: 'Offline',
    lastActive: '2 hours ago',
    salary: 82000,
    startDate: '2021-11-05',
  },
  {
    id: '5',
    name: 'Lisa Garcia',
    email: 'lisa.garcia@company.com',
    role: 'UX Researcher',
    department: 'Design',
    status: 'Active',
    lastActive: '15 minutes ago',
    salary: 75000,
    startDate: '2022-06-01',
  },
  {
    id: '6',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    role: 'DevOps Engineer',
    department: 'Engineering',
    status: 'Active',
    lastActive: '5 minutes ago',
    salary: 90000,
    startDate: '2021-09-15',
  },
  {
    id: '7',
    name: 'Anna Martinez',
    email: 'anna.martinez@company.com',
    role: 'Marketing Manager',
    department: 'Marketing',
    status: 'Away',
    lastActive: '45 minutes ago',
    salary: 70000,
    startDate: '2022-02-28',
  },
  {
    id: '8',
    name: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    role: 'Sales Director',
    department: 'Sales',
    status: 'Active',
    lastActive: '10 minutes ago',
    salary: 110000,
    startDate: '2020-12-01',
  },
];

const columns = [
  {
    key: 'name',
    header: 'Name',
    field: 'name',
    sortable: true,
    filterable: true,
    width: 200,
  },
  {
    key: 'email',
    header: 'Email',
    field: 'email',
    sortable: true,
    filterable: true,
    width: 250,
  },
  {
    key: 'role',
    header: 'Role',
    field: 'role',
    sortable: true,
    filterable: true,
    width: 180,
  },
  {
    key: 'department',
    header: 'Department',
    field: 'department',
    sortable: true,
    filterable: true,
    width: 150,
  },
  {
    key: 'status',
    header: 'Status',
    field: 'status',
    sortable: true,
    filterable: true,
    width: 120,
    cellRenderer: (params: any) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        params.value === 'Active' ? 'bg-green-100 text-green-800' :
        params.value === 'Away' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {params.value}
      </span>
    ),
  },
  {
    key: 'salary',
    header: 'Salary',
    field: 'salary',
    sortable: true,
    filterable: true,
    width: 120,
    cellRenderer: (params: any) => `$${params.value.toLocaleString()}`,
  },
  {
    key: 'startDate',
    header: 'Start Date',
    field: 'startDate',
    sortable: true,
    filterable: true,
    width: 120,
  },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    height: 400,
    className: 'w-full',
  },
};

export const DebugTest: Story = {
  render: () => {
    console.log('DebugTest - sampleData:', sampleData);
    console.log('DebugTest - columns:', columns);
    
    const simpleColumns = [
      { key: 'name', header: 'Name', field: 'name', width: 200 },
      { key: 'email', header: 'Email', field: 'email', width: 250 },
    ];
    
    const simpleData = [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    ];
    
    return (
      <div>
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">Debug Info:</h3>
          <p>Data length: {sampleData.length}</p>
          <p>Columns length: {columns.length}</p>
          <p>First data item: {JSON.stringify(sampleData[0])}</p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Simple Test:</h3>
          <Table
            columns={simpleColumns}
            data={simpleData}
            height={200}
            className="w-full"
          />
        </div>
        <div>
          <h3 className="font-bold">Full Test:</h3>
          <Table
            columns={columns}
            data={sampleData}
            height={400}
            className="w-full"
          />
        </div>
      </div>
    );
  },
};

export const DirectAGGridTest: Story = {
  render: () => {
    const { AgGridReact } = require('ag-grid-react');
    const { ColDef } = require('ag-grid-community');
    
    const columnDefs: ColDef[] = [
      { field: 'name', headerName: 'Name', width: 200 },
      { field: 'email', headerName: 'Email', width: 250 },
    ];
    
    const rowData = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];
    
    return (
      <div>
        <h3 className="font-bold mb-4">Direct AG Grid Test:</h3>
        <div className="ag-theme-alpine" style={{ height: 200, width: '100%' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
          />
        </div>
      </div>
    );
  },
};

export const MinimalTest: Story = {
  render: () => {
    return (
      <div>
        <h3 className="font-bold mb-4">Minimal Test - Just Text:</h3>
        <div className="p-4 border border-gray-300 rounded">
          <p>This is just a test to see if the story renders.</p>
          <p>Data: {JSON.stringify(sampleData.slice(0, 2))}</p>
        </div>
      </div>
    );
  },
};

export const UltraSimpleTest: Story = {
  render: () => {
    const ultraSimpleColumns = [
      { key: 'name', header: 'Name', field: 'name' },
      { key: 'email', header: 'Email', field: 'email' },
    ];
    
    const ultraSimpleData = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];
    
    return (
      <div>
        <h3 className="font-bold mb-4">Ultra Simple Test:</h3>
        <div className="p-4 border border-gray-300 rounded mb-4">
          <p>Columns: {JSON.stringify(ultraSimpleColumns)}</p>
          <p>Data: {JSON.stringify(ultraSimpleData)}</p>
        </div>
        <Table
          columns={ultraSimpleColumns}
          data={ultraSimpleData}
          height={200}
          className="w-full"
        />
      </div>
    );
  },
};

export const FallbackTableTest: Story = {
  render: () => {
    const data = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];
    
    return (
      <div>
        <h3 className="font-bold mb-4">Fallback HTML Table Test:</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
};

export const AGGridCSSDebugTest: Story = {
  render: () => {
    const { AgGridReact } = require('ag-grid-react');
    const { ColDef } = require('ag-grid-community');
    
    const columnDefs: ColDef[] = [
      { field: 'name', headerName: 'Name' },
      { field: 'email', headerName: 'Email' },
    ];
    
    const rowData = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];
    
    return (
      <div>
        <h3 className="font-bold mb-4">AG Grid CSS Debug Test:</h3>
        <div className="mb-4 p-4 bg-yellow-100 rounded">
          <p><strong>CSS Classes Applied:</strong></p>
          <p>Container: ag-theme-alpine</p>
          <p>Height: 300px</p>
          <p>Width: 100%</p>
        </div>
        <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
          <AgGridReact 
            columnDefs={columnDefs} 
            rowData={rowData}
            onGridReady={(params: any) => {
              console.log('Grid ready!', params);
              params.api.sizeColumnsToFit();
            }}
          />
        </div>
      </div>
    );
  },
};

export const CSSInspectionTest: Story = {
  render: () => {
    const { AgGridReact } = require('ag-grid-react');
    const { ColDef } = require('ag-grid-community');
    
    const columnDefs: ColDef[] = [
      { field: 'name', headerName: 'Name' },
      { field: 'email', headerName: 'Email' },
    ];
    
    const rowData = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ];
    
    return (
      <div>
        <h3 className="font-bold mb-4">CSS Inspection Test:</h3>
        <div className="mb-4 p-4 bg-blue-100 rounded">
          <p><strong>Instructions:</strong></p>
          <p>1. Open browser dev tools (F12)</p>
          <p>2. Check Console tab for any errors</p>
          <p>3. Check Elements tab - look for ag-grid elements</p>
          <p>4. Check if ag-theme-alpine class is applied</p>
        </div>
        <div className="ag-theme-alpine" style={{ height: 300, width: '100%', border: '2px solid red' }}>
          <AgGridReact 
            columnDefs={columnDefs} 
            rowData={rowData}
            onGridReady={(params: any) => {
              console.log('Grid ready!', params);
              console.log('Grid element:', params.api.getGridBodyContainer());
              params.api.sizeColumnsToFit();
            }}
            onFirstDataRendered={(params: any) => {
              console.log('First data rendered!', params);
            }}
          />
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Expected:</strong> You should see a red border around the grid area</p>
          <p><strong>If empty:</strong> Check console for errors</p>
        </div>
      </div>
    );
  },
};

export const WithSorting: Story = {
  args: {
    columns,
    data: sampleData,
    sortable: true,
    height: 400,
    className: 'w-full',
  },
};

export const WithFiltering: Story = {
  args: {
    columns,
    data: sampleData,
    filterable: true,
    height: 400,
    className: 'w-full',
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

    const handleSelectionChange = (selectedItems: any[]) => {
      setSelectedRows(selectedItems);
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedRows.length} of {sampleData.length} rows
        </div>
        <Table
          columns={columns}
          data={sampleData}
          selectable={true}
          rowSelection="multiple"
          onSelect={handleSelectionChange}
          height={400}
          className="w-full"
        />
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const handleEdit = (item: any) => {
      alert(`Edit: ${item.name}`);
    };

    const handleDelete = (item: any) => {
      alert(`Delete: ${item.name}`);
    };

    const handleView = (item: any) => {
      alert(`View: ${item.name}`);
    };

    return (
      <Table
        columns={columns}
        data={sampleData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={handleView}
        height={400}
        className="w-full"
      />
    );
  },
};

export const WithPagination: Story = {
  args: {
    columns,
    data: sampleData,
    pagination: true,
    paginationPageSize: 5,
    paginationPageSizeSelector: [5, 10, 20],
    height: 400,
    className: 'w-full',
  },
};

export const EditableTable: Story = {
  render: () => {
    const [data, setData] = React.useState(sampleData);

    const handleCellValueChanged = (item: any, field: string, newValue: any) => {
      const updatedData = data.map(row => 
        row.id === item.id ? { ...row, [field]: newValue } : row
      );
      setData(updatedData);
    };

    const editableColumns = columns.map(col => ({
      ...col,
      editable: col.key === 'name' || col.key === 'role' || col.key === 'department',
    }));

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Double-click on Name, Role, or Department cells to edit
        </div>
        <Table
          columns={editableColumns}
          data={data}
          editable={true}
          onCellValueChanged={handleCellValueChanged}
          height={400}
          className="w-full"
        />
      </div>
    );
  },
};


export const LoadingState: Story = {
  args: {
    columns,
    data: [],
    loading: true,
    height: 400,
    className: 'w-full',
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users found. Try adjusting your search criteria.',
    height: 400,
    className: 'w-full',
  },
};

export const AdvancedFeatures: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

    const handleSelectionChange = (selectedItems: any[]) => {
      setSelectedRows(selectedItems);
    };

    const handleEdit = (item: any) => {
      alert(`Edit: ${item.name}`);
    };

    const handleDelete = (item: any) => {
      alert(`Delete: ${item.name}`);
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedRows.length} of {sampleData.length} rows
        </div>
        <Table
          columns={columns}
          data={sampleData}
          sortable={true}
          filterable={true}
          selectable={true}
          editable={true}
          pagination={true}
          paginationPageSize={5}
          rowSelection="multiple"
          onSelect={handleSelectionChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          height={500}
          className="w-full"
        />
      </div>
    );
  },
};
