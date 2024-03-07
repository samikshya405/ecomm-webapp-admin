// import {
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import React from "react";

// const SubCategoriesTable = ({subCategoryList,handleCatgeoryEdit,handleSubCategoryDelete}) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>S/N</TableCell>
//             <TableCell>Name</TableCell>
//             <TableCell>Parent Cat</TableCell>
//             <TableCell>SubCat Image</TableCell>
//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {subCategoryList.map((item, index) => {
//             return (
//               <TableRow key={item.id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{item.parentCat}</TableCell>
//                 <TableCell>
//                   <img width={"50px"} src={item.categoryImage} alt="" />
//                 </TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     onClick={(event) => handleCatgeoryEdit(event, item)}
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     color="error"
//                     onClick={() => handleSubCategoryDelete(item.parentCatId,item.id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
          
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SubCategoriesTable;
