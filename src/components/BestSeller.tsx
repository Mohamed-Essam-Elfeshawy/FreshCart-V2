"use client";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAllProductsQuery } from "@/redux/features/Product/Proudct";
import Spinner from "./Spinner";
import { IProduct } from "@/interface";
import Slider from "react-slick";
import Product from "./Product";
import { bestSell } from "@/data";
import Link from "next/link";
function BestSeller() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { data: allData } = useAllProductsQuery("");
  const { data }: { data: IProduct[] } = allData || {
    data: [],
  };
  const limitedProducts = data.slice(0, 3);

  return (
    <Box
      sx={{
        mt: "2rem",
        display: "grid",
        alignItems: "center",

        gridTemplateColumns: {
          xs: "100%",
          sm: "50% 50%",
          md: "30% 70%",
        },
        gap: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: {
              sm: "1rem",
              md: "1.5rem",
              lg: "2.5rem",
            },
          }}
        >
          Best <span style={{ color: "#16a34a" }}>Seller</span> <br />
          <span style={{ color: "#16a34a" }}>Gifts</span> And Proudcts
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "#6b7280",
            fontSize: {
              sm: "0.4rem",
              md: "0.5rem",
              lg: "1.2rem",
            },
          }}
        >
          {bestSell.paragraph}
        </Typography>
        <Link href={"/products"}>
          <Button
            sx={{
              bgcolor: "#16a34a",
              p: "10px 20px",
              width: "fit-content",
              color: "white",
            }}
          >
            {bestSell.button} <ArrowForwardIcon sx={{ fontSize: "1.5rem" }} />
          </Button>
        </Link>
      </Box>
      <Box>
        {data.length === 0 ? (
          <Spinner />
        ) : (
          <Box>
            {" "}
            <Slider {...sliderSettings}>
              {limitedProducts.map((el: IProduct) => (
                <Product data={el} key={el._id} />
              ))}
            </Slider>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BestSeller;
