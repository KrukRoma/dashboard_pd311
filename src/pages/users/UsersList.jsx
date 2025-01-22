import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import usersJson from "./users";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; 
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const jsonList = localStorage.getItem("users");
    if (!jsonList) {
      localStorage.setItem("users", JSON.stringify(usersJson));
      setUsers(usersJson);
    } else {
      const list = JSON.parse(jsonList);
      setUsers(list);
    }
  }, []);

  const authUser = JSON.parse(localStorage.getItem("auth"));

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">First name</TableCell>
              <TableCell align="center">Last name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Password</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="center" component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.password}</TableCell>
                <TableCell align="center">
                  {authUser && authUser.email === "admin@gmail.com" && (
                    <>
                      <Link to={`user/${user.id}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => handleDelete(user.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {authUser && authUser.email === "admin@gmail.com" && (
        <Box sx={{ marginTop: "20px" }}>
          <Link to="user">
            <Button variant="contained">Create user</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
