import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TableHead, TableRow, TableCell, TableBody, Table, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AccordionContent = ({ details,handleSubCategoryDelete,handleCatgeoryEdit }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Sub Categories</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {
          details.length ? (
            <Table>
            <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              
                {
                    details.map((item,index)=>{
                        return <TableRow key={item.id}>
                          <TableCell>{index+1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                              <img width={'50px'} src={item.categoryImage} alt=''/>
                            </TableCell>
                            <TableCell>
                              <IconButton color='primary' onClick={()=>handleCatgeoryEdit(item)}>
                                <EditIcon/>
                              </IconButton>
                              <IconButton color='error' onClick={()=>handleSubCategoryDelete(item.parentCatId, item.id)}>
                                <DeleteIcon/>
                              </IconButton>
                            </TableCell>
                    
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>

          ):(<Typography>No subCategories has been added yet</Typography>)
        }
        
       
        
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionContent;
