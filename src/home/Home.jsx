import { useEffect, useState } from "react";
import Category from "../components/category/Category";
import axios from "axios";
import Products from "../components/products/Products";

export default function Home() {
  
  return (
    <>
    <Category/>
    <Products/>
    </>
  )
}
