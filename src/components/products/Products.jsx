import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/products`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
const addToCart = async (id) => {
  const userToken = localStorage.getItem("userToken");
  try {
    const response = await axios.post(`https://mytshop.runasp.net/api/Carts/${id}`, {}, {
      headers: {
        AUTHORIZATION: `Bearer ${userToken}`
      }
    });
    console.log("Added to cart:", response.data);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="180"
              image={
                product.mainImg || "https://via.placeholder.com/300x180?text=No+Image"
              }
              alt={product.name}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="subtitle2" color="primary" sx={{ marginTop: 1 }}>
                ${product.price}
              </Typography>
              <Button onClick={()=>addToCart(product.id)}>Add To Cart</Button>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/product/${product.id}`}>Details</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
