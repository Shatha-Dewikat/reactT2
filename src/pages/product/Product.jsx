import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';

export default function Product() {
  const { id } = useParams(); // صححنا هني
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://mytshop.runasp.net/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Product with id ${id} not found`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4} color="error.main">
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
      {product.mainImg && (
        <CardMedia
          component="img"
          height="300"
          image={product.mainImg}
          alt={product.name}
          sx={{ objectFit: 'contain' }}
        />
      )}
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
