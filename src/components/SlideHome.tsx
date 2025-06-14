"use client";
import { Box, Button, Typography } from "@mui/material";
import { slideLogin } from "@/data";
import { ShoppingCart } from "@mui/icons-material";
import slide1 from "../images/slide1.jpg";
import Image from "next/image";
import Slider from "react-slick";
function SlideHome() {
  const sliderSettings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
  };
  return (
    <>
      <Box
        sx={{
          mt: "2rem",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "30% minmax(0,1fr)",
          },
          gap: 2,
        }}
      >
        <div
          style={{
            position: "relative",
            height: "50vh",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <Image
            src={slide1}
            alt="Background"
            fill
            style={{
              borderRadius: "10px",

              objectFit: "cover",
              zIndex: 0,
            }}
            quality={100}
          />
          <Box
            component="div"
            sx={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "2.8rem",
                  lg: "3rem",
                },
                textAlign: "center",
                textTransform: "capitalize",
              }}
            >
              Fresh arrival and new selection
            </Typography>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Your ultimate destination for fashion, electronics, and more
            </Typography>
            <ShoppingCart sx={{ fontSize: "5rem" }} />
          </Box>
        </div>
        <Box
          sx={{
            flex: 1,
            position: "relative",
            display: "block",
            height: { md: "50vh" },
            overflow: "hidden",
            borderRadius: "12px",
            mt: { xs: "10px", lg: "0px" },
          }}
        >
          <Slider {...sliderSettings}>
            {slideLogin.map((slide, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  height: "50vh",
                  display: "flex !important",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "white",
                  gap: 2,
                  p: "10px",
                }}
              >
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    zIndex: -1,
                    filter: "blur(5px)",
                  }}
                  priority={index === 0}
                />
                <Box
                  sx={{
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
                  New Arrival !
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
                  Discover Our <br /> New Collection
                </Typography>
                <Button
                  sx={{
                    bgcolor: "#16a34a",
                    p: "10px 20px",
                    width: "fit-content",
                    color: "white",
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </>
  );
}

export default SlideHome;
