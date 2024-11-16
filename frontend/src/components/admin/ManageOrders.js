// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const { authToken } = useSelector((state) => state.user);

//   useEffect(() => {
//     // Fetch all orders
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/order", {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });
//         console.log('orders:::::::', response);
//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [authToken]);

//   return (
//     <div className="container" style={{ marginTop: "100px" }}>
//       <h2>All Orders</h2>
//       <table className="table table-striped mt-4">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>User</th>
//             <th>Items</th>
//             <th>Total Amount</th>
//             <th>Status</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.userId ? `${order.userId.name} (${order.userId.email})` : "N/A"}</td>
//                 <td>
//                   <ul>
//                     {order.items.map((item, index) => (
//                       <li key={index}>
//                         {item.name} - {item.quantity} pcs (₹{item.price})
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>₹{order.totalAmount}</td>
//                 <td>{order.status}</td>
//                 <td>{new Date(order.createdAt).toLocaleString()}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageOrders;


// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useTable, useSortBy, usePagination } from "react-table";

// const ManageOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const { authToken } = useSelector((state) => state.user);

//   useEffect(() => {
//     // Fetch all orders
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/order", {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//           },
//         });
//         console.log('orders:::::::', response);
//         setOrders(response.data.orders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [authToken]);

//   // Define table columns
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Order ID",
//         accessor: "_id",
//       },
//       {
//         Header: "User",
//         accessor: "userId",
//         Cell: ({ value }) => `${value.name} (${value.email})`, // Assuming userId contains user object
//       },
//       {
//         Header: "Items",
//         accessor: "items",
//         Cell: ({ value }) => (
//           <ul>
//             {value.map((item, index) => (
//               <li key={index}>
//                 {item.name} - {item.quantity} pcs (₹{item.price})
//               </li>
//             ))}
//           </ul>
//         ),
//       },
//       {
//         Header: "Total Amount",
//         accessor: "totalAmount",
//         Cell: ({ value }) => `₹${value}`,
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//       },
//       {
//         Header: "Date",
//         accessor: "createdAt",
//         Cell: ({ value }) => new Date(value).toLocaleString(),
//       },
//     ],
//     []
//   );

//   // Prepare table data for React Table
//   const data = React.useMemo(() => orders, [orders]);

//   // Use React Table hooks
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     state: { pageIndex, pageSize },
//     canPreviousPage,
//     canNextPage,
//     page,
//     gotoPage,
//     setPageSize,
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 },
//     },
//     useSortBy,
//     usePagination
//   );

//   return (
//     <div className="container" style={{ marginTop: "100px" }}>
//       <h2>All Orders</h2>
//       <table {...getTableProps()} className="table table-striped mt-4">
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render("Header")}
//                   <span>
//                     {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.length > 0 ? (
//             page.map(row => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map(cell => (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   ))}
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="6">No orders found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div>
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {"<<"}
//         </button>{" "}
//         <button onClick={() => gotoPage(pageIndex - 1)} disabled={!canPreviousPage}>
//           {"<"}
//         </button>{" "}
//         <button onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}>
//           {">"}
//         </button>{" "}
//         <button onClick={() => gotoPage(page.length - 1)} disabled={!canNextPage}>
//           {">>"}
//         </button>{" "}
//         <span>
//           Page{" "}
//           <strong>
//             {pageIndex + 1} of {Math.ceil(rows.length / pageSize)}
//           </strong>{" "}
//         </span>
//         <select
//           value={pageSize}
//           onChange={e => setPageSize(Number(e.target.value))}
//         >
//           {[5, 10, 15].map(pageSizeOption => (
//             <option key={pageSizeOption} value={pageSizeOption}>
//               Show {pageSizeOption}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default ManageOrders;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from "@mui/material";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { authToken } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch all orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/order", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log('orders:::::::', response);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [authToken]);

  // Sorting functionality
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (array) => {
    return array.sort((a, b) => {
      if (orderBy === 'createdAt') {
        return order === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return order === 'asc'
          ? a[orderBy] > b[orderBy]
            ? 1
            : -1
          : b[orderBy] > a[orderBy]
          ? 1
          : -1;
      }
    });
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedOrders = sortData(orders);
  const displayedOrders = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container">
      <h2>All Orders</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={() => handleRequestSort('createdAt')}
                >
                  Order ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'userId'}
                  direction={orderBy === 'userId' ? order : 'asc'}
                  onClick={() => handleRequestSort('userId')}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell>Items</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'totalAmount'}
                  direction={orderBy === 'totalAmount' ? order : 'asc'}
                  onClick={() => handleRequestSort('totalAmount')}
                >
                  Total Amount
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'status'}
                  direction={orderBy === 'status' ? order : 'asc'}
                  onClick={() => handleRequestSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedOrders.length > 0 ? (
              displayedOrders.map((order) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.userId ? `${order.userId.name} (${order.userId.email})` : "N/A"}</TableCell>
                  <TableCell>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.name} - {item.quantity} pcs (₹{item.price})
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>₹{order.totalAmount}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No orders found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[2, 10, 15]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ManageOrders;
