import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get(`https://mytshop.runasp.net/api/categories`);
    setCategories(response.data);
    console.log(response);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {category.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Details</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
