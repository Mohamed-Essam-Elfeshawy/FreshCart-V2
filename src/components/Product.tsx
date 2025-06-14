import { Box, IconButton, Rating, Typography } from "@mui/material";
import Image from "next/image";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ICartResponse, IProduct } from "@/interface";
import Link from "next/link";
import {
  useAddProductCartMutation,
  useAllCartQuery,
} from "@/redux/features/Cart/cart";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

function Product({ data }: { data: IProduct }) {
  const [addTocart, { isLoading }] = useAddProductCartMutation();
  const { data: dataCart, isLoading: loadingCart } = useAllCartQuery("") as {
    data: ICartResponse | undefined;
    isLoading: boolean;
  };
  if (loadingCart) {
    return <Spinner />;
  }
  async function handleAddCart(idProduct: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await addTocart({ productId: `${idProduct}` });
    if (res.error) {
      toast.error(`${res.error.data.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    }
    if (res.data) {
      toast.success(`${res.data.message}`, {
        position: "bottom-center",
        duration: 1500,
      });

      console.log(res);
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
        },
        cursor: "pointer",
      }}
    >
      <Link href={`/proudctDetails/${data._id}`}>
        {" "}
        <Box sx={{ textAlign: "center" }}>
          <Image
            src={data.imageCover}
            alt={data.slug}
            width={200}
            height={200}
            style={{
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </Box>
      </Link>

      <Link href={`/proudctDetails/${data._id}`}>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: {
                sm: "0.9rem",
                md: "1.1rem",
                lg: "1.3rem",
              },
              color: "text.primary",
              mb: 0.5,
              textAlign: "center",
              textOverflow: "datalipsis",
            }}
          >
            {data.title}
          </Typography>

          <Typography
            sx={{
              fontWeight: 500,
              fontSize: {
                sm: "0.7rem",
                md: "0.8rem",
                lg: "0.9rem",
              },
              color: "text.secondary",
              textAlign: "center",
              mb: 1,
            }}
          >
            {data.category.name}
          </Typography>
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Box>
          <Rating
            name="half-rating-read"
            defaultValue={data.ratingsAverage || 0}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#16a34a",
              fontSize: {
                sm: "0.9rem",
                md: "1rem",
                lg: "1.1rem",
              },
            }}
          >
            {data.price}$
          </Typography>
        </Box>

        <IconButton
          onClick={() => handleAddCart(data._id)}
          disabled={isLoading}
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
          {dataCart?.data.products.find((el) => el.product._id === data._id) ? (
            <ShoppingCartIcon sx={{ color: "white", fontSize: "1rem" }} />
          ) : (
            <ShoppingCartOutlinedIcon
              sx={{ color: "white", fontSize: "1rem" }}
            />
          )}{" "}
        </IconButton>
      </Box>
    </Box>
  );
}

export default Product;
