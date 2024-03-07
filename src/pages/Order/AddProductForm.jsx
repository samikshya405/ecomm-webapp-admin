// import React, { useState } from 'react';
// import { TextField, Button, Typography, Container, Grid, Paper } from '@mui/material';
// // import { makeStyles } from '@mui/material/styles'

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(3),
//   },
//   submitButton: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const AddProductForm = () => {
//   const classes = useStyles();
//   const [productName, setProductName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Submitted:', { productName, price, description });
//     // Add your form submission logic here, such as sending the data to an API
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper className={classes.paper}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Add Product
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Product Name"
//                 variant="outlined"
//                 fullWidth
//                 value={productName}
//                 onChange={(e) => setProductName(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Price"
//                 variant="outlined"
//                 fullWidth
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Category"
//                 variant="outlined"
//                 fullWidth
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Description"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 className={classes.submitButton}
//               >
//                 Add Product
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default AddProductForm;
