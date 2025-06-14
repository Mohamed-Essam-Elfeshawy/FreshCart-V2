"use client";

import { Box, Typography } from "@mui/material";
import { useAllCategoreQuery } from "@/redux/features/categore/Categore";
import Spinner from "./Spinner";
import { ICategory } from "@/interface";
import DialogCategory from "./DialogCategory";

function Categories() {
  const { isLoading, data } = useAllCategoreQuery("");
  if (isLoading) {
    return <Spinner />;
  }
  const allCategore: ICategory[] = data.data;
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: {
            sm: "1rem",
            md: "2.5rem",
            lg: "3rem",
          },
        }}
      >
        Discover Our Collections
      </Typography>

      <Box
        sx={{
          width: "8rem",
          height: "8px",
          m: "20px auto",
          borderRadius: "10px",
          bgcolor: "#16a34a",
        }}
      />

      <Typography
        sx={{
          width: "70%",
          fontWeight: "200",
          m: "16px auto",
          textAlign: "center",
          fontSize: {
            sm: "0.5rem",
            md: "0.8rem",
            lg: "1.5rem",
          },
        }}
      >
        Explore our curated categories and find products that match your style
        and needs. From the latest electronics to trendy fashion, we&apos;ve got
        everything you desire.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 4,
          px: 2,
        }}
      >
        {allCategore.map((el) => (
          <DialogCategory data={el} key={el._id} />
        ))}
      </Box>
    </Box>
  );
}

export default Categories;
