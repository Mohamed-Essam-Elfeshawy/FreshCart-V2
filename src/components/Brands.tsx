"use client";
import { Box, Pagination, Typography } from "@mui/material";
import Spinner from "./Spinner";
import React, { useState } from "react";
import { useAllBrandQuery } from "@/redux/features/Brand/brand";
import DialogBrand from "./DialogBrand";
import { Brand } from "@/interface";

function Brands() {
  const [pagination, setPagination] = useState(1);
  const itemsPerPage = 8;
  const { isLoading, data } = useAllBrandQuery("");
  if (isLoading) {
    return <Spinner />;
  }

  const allData = data.data;

  const indexOfLastItem = pagination * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const newdata = allData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <Box>
      <Box>
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
          Explore Top Brands{" "}
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
          Discover a curated collection of premium brands from around the world.
          Browse through our extensive catalog and find your favorites.
        </Typography>
      </Box>

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
                {newdata.map((el: Brand) => (
                  <DialogBrand data={el} key={el._id} />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          page={pagination}
          onChange={(event, page) => setPagination(page)}
          count={Math.ceil(allData.length / itemsPerPage)}
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#16a34a",
              color: "white",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Brands;
/*  <Box
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            bgcolor: "white",
            boxShadow:
              "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            sx={{
              animation: "pulse 3s ease-in-out infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" },
                "100%": { transform: "scale(1)" },
              },
            }}
          >
            <Image
              src={logo}
              alt="cao"
              style={{
                display: "block",
              }}
            />
          </Box>{" "}
          <Typography
            sx={{
              fontWeight: "600",
              textAlign: "center",
              fontSize: {
                sm: "0.8rem",
                md: "1rem",
                lg: "1.125rem",
              },
            }}
          >
            Canon
          </Typography>
          <Box
            sx={{
              width: "3rem",
              height: "0.25rem",
              m: "20px auto",
              borderRadius: "10px",
              bgcolor: "#16a34a",
            }}
          />
        </Box>
      </Box> */
