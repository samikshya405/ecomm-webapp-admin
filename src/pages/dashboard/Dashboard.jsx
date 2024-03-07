import React from 'react'
import Adminlayout from '../../Component/layout/Adminlayout'
import { Grid, Paper } from '@mui/material'

const Dashboard = () => {
  return (
    <Adminlayout>
        <h1>dashboard</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <Paper>

            </Paper>
          </Grid>
        </Grid>
    </Adminlayout>
  )
}

export default Dashboard