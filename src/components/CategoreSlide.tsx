"use client";
import { useAllCategoreQuery } from "@/redux/features/categore/Categore";
import { Box, Button, Typography } from "@mui/material";
import Spinner from "./Spinner";
import Image from "next/image";
import { ICategory } from "@/interface";
import Slider from "react-slick";

function CategoreSlide() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
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

  const { isLoading, data } = useAllCategoreQuery("");
  if (isLoading) {
    return <Spinner />;
  }
  const allCategore: ICategory[] = data.data;
  return (
    <Box sx={{ mt: "2rem" }}>
      <Box>
        <Slider {...sliderSettings}>
          {allCategore.map((el) => (
            <Box
              key={el._id}
              sx={{
                borderRadius: "10px",
                position: "relative",
                height: "30vh",
                display: "flex !important",
                flexDirection: "column",
                alignItems: "end",
                justifyContent: "center",
                color: "white",
                gap: 2,
                padding: "20px",
              }}
            >
              <Image
                src={el.image}
                alt={el.slug}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                  zIndex: -1,
                  filter: "blur(5px)",
                  borderRadius: "10px",
                }}
              />
              <Box
                sx={{
                  borderRadius: "10px",

                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  zIndex: -1,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    sm: "1rem",
                    md: "1.2rem",
                    lg: "1.5rem",
                  },
                }}
              >
                {el.slug}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    sm: "1.5rem",
                    md: "2rem",
                    lg: "3.5rem",
                  },
                }}
              >
                {el.name}
              </Typography>
              <Button
                sx={{
                  bgcolor: "#16a34a",
                  p: "10px 20px",
                  width: "fit-content",
                  borderRadius: "40px",
                  color: "white",
                }}
              >
                Discover Now
              </Button>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default CategoreSlide;
