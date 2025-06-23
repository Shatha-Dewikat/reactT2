import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

export default function Cart() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("userToken");

  const getProductFromCart = async () => {
    try {
      const response = await axios.get(`https://mytshop.runasp.net/api/Carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data.cartResponse)) {
        setProducts(response.data.cartResponse);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`https://mytshop.runasp.net/api/Carts/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const increaseCount = async (productId) => {
    try {
      await axios.patch(
        `https://mytshop.runasp.net/api/Carts/increaseCount/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, count: (p.count || 1) + 1 } : p
        )
      );
    } catch (error) {
      console.error("Error increasing count:", error);
    }
  };

  const decreaseCount = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product || (product.count || 1) <= 1) return;

    try {
      await axios.patch(
        `https://mytshop.runasp.net/api/Carts/decreaseCount/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, count: p.count - 1 } : p
        )
      );
    } catch (error) {
      console.error("Error decreasing count:", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("https://mytshop.runasp.net/api/Carts/clearCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    getProductFromCart();
  }, []);

  if (!products.length) {
    return (
      <Box p={2}>
        <Typography variant="h5">Your cart is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h2" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {products.map((product) => (
            <Card
              sx={{ display: "flex", alignItems: "center", p: 2, mb: 2 }}
              key={product.id}
            >
              <CardMedia
                component="img"
                image={product.imageUrl || "https://placehold.co/100"}
                alt={product.name}
                sx={{ borderRadius: 2, width: 100, height: 100 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="h6" color="primary">
                  {product.price}$
                </Typography>
              </CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, pr: 2 }}>
                <IconButton onClick={() => decreaseCount(product.id)}>
                  <Remove />
                </IconButton>
                <Typography>{product.count || 1}</Typography>
                <IconButton onClick={() => increaseCount(product.id)}>
                  <Add />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => removeFromCart(product.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Summary
          </Typography>

          <Button variant="outlined" color="error" onClick={clearCart}>
            Clear Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
