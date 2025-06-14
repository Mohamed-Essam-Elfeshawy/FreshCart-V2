"use client";
import StarIcon from "@mui/icons-material/Star";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSingleProductQuery } from "@/redux/features/Product/Proudct";
import Spinner from "./Spinner";
import { IProduct } from "@/interface";
import { Box, Button, IconButton, Rating, Typography } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import Related from "./Related";
import DialogImage from "./DialogImage";

interface IProps {
  productID: string;
}
function SingleProduct({ productID }: IProps) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 1000,
  };
  const { isLoading, data: alldata } = useSingleProductQuery(productID);
  if (isLoading) return <Spinner />;
  const { data }: { data: IProduct } = alldata;
  return (
    <Box
      sx={{
        mt: "2rem",
      }}
    >
      <Box
        sx={{
          display: "grid",
          alignItems: "flex-end",
          gridTemplateColumns: {
            xs: "100%",
            sm: "50% 50%",
            md: "30% 70%",
          },
          gap: 4,
        }}
      >
        <Box sx={{}}>
          <Slider {...settings}>
            {data.images.map((el, idx) => (
              <Image
                key={idx}
                src={el}
                alt={data.slug}
                width={300}
                height={300}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            ))}
          </Slider>
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              mt: "1rem",
              justifyContent: "space-between",
            }}
          >
            {data.images.map((el, idx) => (
              <DialogImage key={idx} data={el} />
            ))}
          </Box>
        </Box>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "semibold" }}>
              {data.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "medium",
                color: "#16a34a",
                fontSize: "1.5rem",
              }}
            >
              {data.price}$
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ my: 2, width: "70%" }}
            >
              {data.description}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Category: {data.category.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Brand: {data.brand?.name}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              Quantity: {data.quantity}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={data.ratingsAverage}
                  precision={0.5}
                  readOnly
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                <Typography variant="body2">{data.ratingsAverage}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  width: "fit-content",
                  py: 1,
                  fontWeight: "bold",
                  borderRadius: "4px",
                  transition: "transform 0.5s",

                  bgcolor: "#16a34a",
                }}
              >
                ADD TO CART
              </Button>
              <IconButton
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  bgcolor: "#16a34a",
                  "&:hover": {
                    bgcolor: "#16a34a",
                  },
                }}
              >
                <FavoriteBorderIcon
                  sx={{ color: "white", fontSize: "1.5rem" }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      <Related id={data.category._id} />
    </Box>
  );
}

export default SingleProduct;
