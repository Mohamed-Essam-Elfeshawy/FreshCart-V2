"use client";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Typography } from "@mui/material";
import { useAllProductsQuery } from "@/redux/features/Product/Proudct";
import { IProduct } from "@/interface";
import Spinner from "./Spinner";
import Product from "./Product";
import { bestSell } from "@/data";
import Link from "next/link";

function PopularItems() {
  const { data: allData } = useAllProductsQuery("");
  const { data }: { data: IProduct[] } = allData || {
    data: [],
  };
  const limitedProducts = data.slice(11, 23);
  return (
    <Box
      sx={{
        mt: "2rem",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          color: "#16a34a",
          fontSize: {
            sm: "1rem",
            md: "1.5rem",
            lg: "2rem",
          },
        }}
      >
        <span style={{ color: "black", borderBottom: "3px solid #16a34a" }}>
          Popular
        </span>{" "}
        Items
      </Typography>

      <Box sx={{ my: "2rem" }}>
        <Box>
          {data.length === 0 ? (
            <Spinner />
          ) : (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {" "}
                {limitedProducts.map((el: IProduct) => (
                  <Product data={el} key={el._id} />
                ))}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Link href={"/products"}>
                  <Button
                    sx={{
                      mt: "1rem",
                      bgcolor: "#16a34a",
                      p: "10px 20px",
                      width: "fit-content",
                      color: "white",
                    }}
                  >
                    {bestSell.button}{" "}
                    <ArrowForwardIcon sx={{ fontSize: "1.5rem" }} />
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default PopularItems;
