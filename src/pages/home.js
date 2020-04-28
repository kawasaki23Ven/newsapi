import React from 'react';
import { Grid } from '@material-ui/core';

export default function Home() {
    return (
        <Grid container justify="center">
            <Grid item md={6} sm={12} justify="center" style={{ textAlign: "center" }}>
                <img src="./logo512.png" style={{ maxWidth: "100%" }} alt="logo" />
            </Grid>
        </Grid>
    )
}