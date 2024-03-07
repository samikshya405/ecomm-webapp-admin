import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  deleteProductById,
  getProductAction,
} from "../../Redux/product/prouctAction";
import { toast } from "react-toastify";

const EachRow = ({ product, index }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const [selectedSizeStock, setSelectedSizeStock] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteProduct = (product) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      deleteProductById(product.uid);
      dispatch(getProductAction());
      toast.success(product.name, "is deleted");
    }
  };
  useEffect(() => {
    if (product.sizes) {
      setSelectedSize(product?.sizes[0].size);
    }
  }, []);
  useEffect(() => {
   
    if (product.sizes) {
      const sizeStock = product.sizes.find((item) => item.size == selectedSize);
      setSelectedSizeStock(sizeStock);
    }
  }, [selectedSize]);
  return (
    <TableRow>
      <TableCell>{index + 1}.</TableCell>
      <TableCell>
        <img style={{ width: "70px" }} src={product.image} />
      </TableCell>
      <TableCell style={{ textTransform: "capitalize" }}>
        {product.category}
      </TableCell>
      <TableCell style={{ textTransform: "capitalize" }}>
        {product.subcategory}
      </TableCell>
      <TableCell style={{ textTransform: "capitalize" }}>
        {product.productName.slice(0, 15)}..
      </TableCell>
      {product.sizes?.length > 0 ? (
        <TableCell>
          <Stack direction={"row"}>
            <Select
              sx={{ height: 20, minWidth: 30 }}
              labelId="select-label"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((product, index) => {
                return (
                  <MenuItem key={index} value={product.size}>
                    {product.size}
                  </MenuItem>
                );
              })}
            </Select>
            <Typography>/{selectedSizeStock?.stock}</Typography>
          </Stack>
        </TableCell>
      ) : (
        <TableCell>{product.stock}</TableCell>
      )}

      <TableCell>${product.price}</TableCell>
      <TableCell>
        <Link to={`/product/edit/${product.uid}`}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Link>

        <IconButton color="error" onClick={() => handleDeleteProduct(product)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default EachRow;
