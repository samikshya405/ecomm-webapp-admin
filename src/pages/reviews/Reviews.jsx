import React, { useEffect } from "react";
import Adminlayout from "../../Component/layout/Adminlayout";
import {
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllReview } from "./reviewAction";

const Reviews = () => {
  const { allReview } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReview());
  }, []);
  return (
    <Adminlayout title={"Reviews"}>
      <TableContainer component={Paper} className="tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S/N</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
                allReview.map((review,index)=>{
                    return <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{review.productName}</TableCell>
                    <TableCell><img width={'100px'}
                     src={review.productImage} alt=''/></TableCell>
                    <TableCell>{review.userName}</TableCell>
                    <TableCell>
                    <Rating name="rating" value={review?.rating} />
                    </TableCell>
                    <TableCell>{review.comment}</TableCell>
                  </TableRow>
                })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Adminlayout>
  );
};

export default Reviews;
