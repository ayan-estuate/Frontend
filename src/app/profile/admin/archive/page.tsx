"use client"; // Ensure this file runs only on the client

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableSelectAll,
  TableSelectRow,
  Button,
  Pagination,
  Modal, // Carbon Pagination Component
} from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";
import api from "../../../../api"; // Importing the axios instance

const headers = [
  { header: "ID", key: "id" },
  { header: "Email", key: "email" },
  { header: "Roles", key: "roles" },
];

const ArchivePage = () => {
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0); // For pagination
  const [currentPage, setCurrentPage] = useState(1); // Changed from 0 to 1
  const [pageSize, setPageSize] = useState(10); // Page size
  const [showModal, setShowModal] = useState(false); // Control the modal visibility
  const [modalBody, setModalBody] = useState<React.ReactNode>(""); // Modal body content
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]); // Track selected users

  useEffect(() => {
    setMounted(true); // Ensures it only renders on the client
    fetchUsers(currentPage); // Fetch users on mount
  }, [currentPage, pageSize]);

  const fetchUsers = async (page: number) => {
    try {
      const response = await api.get("/users", {
        params: { page: page - 1, size: pageSize }, // Subtract 1 for API call since backend uses 0-based indexing
      });
      setUsers(response.data.content); // Assuming you return users data inside 'content' key
      setTotalPages(response.data.totalPages); // Set total pages for pagination
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    }
  };

  const handleSelectionChange = (selectedRows: any[]) => {
    setSelectedUsers(selectedRows);
  };

  const handleRowSelection = (rows: any[]) => {
    const selectedRows = rows.filter((row) => row.isSelected);
    setSelectedUsers(selectedRows);
  };

  const openDeletionModal = () => {
    if (selectedUsers.length === 0) return;

    setModalBody(
      <div>
        <p>Are you sure you want to delete the following users?</p>
        <ul>
          {selectedUsers.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </div>
    );
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedUsers.map((user) => api.delete(`/users/${user.id}`))
      );
      fetchUsers(currentPage); // Refresh the list
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting users:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to delete users"
      );
    }
  };

  if (!mounted) return null; // Prevents SSR rendering

  return (
    <DashboardLayout>
      <div className="archive-container">
        <DataTable
          rows={users}
          headers={headers}
          isSortable
          // Removed onSelectionChange as it is not a valid prop
        >
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            onInputChange,
            getTableProps,
            getTableContainerProps,
          }) => {
            const batchActionProps = getBatchActionProps();

            return (
              <TableContainer
                className="archive-table-container"
                title="Users List"
                description="Select rows to perform actions"
                {...getTableContainerProps()}
              >
                <TableToolbar
                  className="archive-toolbar"
                  {...getToolbarProps()}
                >
                  <TableBatchActions {...batchActionProps}>
                    <TableBatchAction
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? 0 : -1
                      }
                      renderIcon={TrashCan}
                      onClick={openDeletionModal} // Open the batch deletion modal
                    >
                      Delete
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}
                  >
                    <TableToolbarSearch
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? -1 : 0
                      }
                      onChange={(event) =>
                        onInputChange(
                          event as React.ChangeEvent<HTMLInputElement>
                        )
                      }
                    />
                    <Button
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? -1 : 0
                      }
                      kind="primary"
                      onClick={() => alert("Add new user functionality here")}
                    >
                      Add new
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>

                <Table {...getTableProps()} className="archive-table">
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => {
                        const { key, ...headerProps } = getHeaderProps({
                          header,
                        });
                        return (
                          <TableHeader key={key} {...headerProps}>
                            {header.header}
                          </TableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => {
                      const { key, ...rowProps } = getRowProps({ row });
                      return (
                        <TableRow key={key} {...rowProps}>
                          <TableSelectRow
                            {...getSelectionProps({
                              row,
                              onChange: () => handleRowSelection(rows),
                            })}
                          />
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {/* Carbon Pagination Component */}
                <Pagination
                  page={currentPage}
                  pageSize={pageSize}
                  totalItems={totalPages * pageSize} // Assuming 10 items per page and `totalPages` from the API
                  onChange={({ page, pageSize }) => {
                    if (page >= 1) {
                      // Ensure page is never less than 1
                      setCurrentPage(page);
                      setPageSize(pageSize);
                      fetchUsers(page);
                    }
                  }}
                  pageSizes={[10, 20, 30]} // Allow users to select page size
                />
              </TableContainer>
            );
          }}
        </DataTable>
      </div>

      <Modal
        open={showModal}
        onRequestClose={() => setShowModal(false)} // Close modal on cancel
        danger
        modalHeading="Confirm Deletion"
        modalLabel="Delete Confirmation"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onSecondarySubmit={() => setShowModal(false)} // Close modal on cancel
        onRequestSubmit={handleDelete}
      />
    </DashboardLayout>
  );
};

export default ArchivePage;
