"use client";
import { Box, Button, Checkbox, Pagination, Typography } from "@mui/material";
import Spinner from "./Spinner";
import { filterBrand } from "@/utils";
import { btnBrand } from "@/data";

import React, { useState } from "react";
import { useAllProductsQuery } from "@/redux/features/Product/Proudct";
import { IProduct } from "@/interface";
import Product from "./Product";
function Shop() {
  const [pagination, setPagination] = useState(1);
  const [btnCategory, setbtnCategorn] = useState<string | null>(null);
  const itemsPerPage = 6;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const { isLoading, data } = useAllProductsQuery("");
  if (isLoading) {
    return <Spinner />;
  }
  const allData = data.data;

  const filteredData = btnCategory
    ? filterBrand(allData, btnCategory)
    : allData;
  const indexOfLastItem = pagination * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const newdata = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  console.log(newdata);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonText: string | null = event.currentTarget.textContent;
    console.log(buttonText);
    setbtnCategorn(buttonText);
    setPagination(1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "300px" },
          position: { md: "sticky" },
          top: { md: "20px" },
          overflowY: { md: "auto" },
          flexShrink: 0,
          bgcolor: "white",
          p: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            mb: 1,
          }}
        >
          Category
        </Typography>
        <Box
          sx={{
            width: "6rem",
            height: "3px",
            mb: 3,
            borderRadius: "10px",
            bgcolor: "#16a34a",
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {btnBrand.map((el, idx) => (
            <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                {...label}
                sx={{ color: "#16a34a" }}
                checked={el === btnCategory}
              />
              <Button
                onClick={(e) => handleButtonClick(e)}
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: "0.9rem",
                  p: 0.5,
                  "&:hover": { bgcolor: "transparent" },
                }}
              >
                {el}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: "calc(100% - 324px)" },
        }}
      >
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
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              {newdata.map((el: IProduct) => (
                <Product data={el} key={el._id} />
              ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <Pagination
                page={pagination}
                onChange={(event, page) => setPagination(page)}
                count={Math.ceil(filteredData.length / itemsPerPage)}
                sx={{
                  "& .Mui-selected": {
                    backgroundColor: "#16a34a",
                    color: "white",
                    "&:hover": { backgroundColor: "#12803d" },
                  },
                  "& .MuiPaginationItem-root": {
                    color: "#16a34a",
                    border: "1px solid #e5e7eb",
                    "&:hover": { backgroundColor: "#f0fdf4" },
                  },
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Shop;
