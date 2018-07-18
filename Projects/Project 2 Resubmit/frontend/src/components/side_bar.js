import React from "react";

//material-ui
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

const SideBar = () => (
  <Grid container spacing={24}>
    <Grid item xs={12}>
      <Divider />
      <List>Test</List>
      <Divider />
      <List>Test</List>
    </Grid>
  </Grid>
);

export default SideBar;
