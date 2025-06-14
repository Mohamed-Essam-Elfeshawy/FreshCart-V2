"use client";
import {
  Box,
  Button,
  InputBase,
  Typography,
  styled,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
  DeleteOutline,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import Spinner from "./Spinner";
import { ICartResponse } from "@/interface";
import {
  useAllCartQuery,
  useDeleteProudctCartMutation,
  useUpdateProudctCountMutation,
} from "@/redux/features/Cart/cart";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FlexContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  margin: theme.spacing(4, 0),
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const CartItemContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid",
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    gap: theme.spacing(3),
  },
}));

function CartDetails() {
  const { push } = useRouter();
  const localData =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userData = localData ? localData : null;
  useEffect(() => {
    if (userData) {
      console.log(userData);
    } else {
      push("/");
    }
  }, [userData]);

  const { data, isLoading } = useAllCartQuery("");
  const [idProudct, setID] = useState<string | null>(null);
  const [deleteProudct, { isLoading: loadDelete }] =
    useDeleteProudctCartMutation();
  const [updateCount, {}] = useUpdateProudctCountMutation();
  if (isLoading) {
    return <Spinner />;
  }
  const allData: ICartResponse = data;
  console.log(allData);
  const subtotal = allData.data.products.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  async function handleDelete(id: string) {
    setID(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await deleteProudct(id);
    if (res.error) {
      toast.error(`${res.error.data.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    }
    if (res.data) {
      toast.success(`Product Deleted `, {
        position: "bottom-center",
        duration: 1500,
      });

      console.log(res);
    }
  }
  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 2,
          gap: 2,
        }}
      >
        <Link href="/products" passHref>
          <Button
            variant="text"
            sx={{ color: "#16a34a" }}
            startIcon={<ShoppingBagOutlined />}
          >
            Continue Shopping
          </Button>
        </Link>

        <Box display="flex" gap={3}>
          <Typography variant="body1" fontWeight={500}>
            Need Help? <Box component="span">(+20) 111-222-3333</Box>
          </Typography>
        </Box>
      </Box>

      <FlexContainer>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight={600} mb={3}>
            Your Cart ({allData.data.products.length})
          </Typography>

          {allData.data.products.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                py: 10,
                gap: 2,
              }}
            >
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <ShoppingBagOutlined sx={{ fontSize: 80, color: "grey.400" }} />
              </Box>
              <Typography variant="h5" fontWeight={500}>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Looks like you haven&apos;t added any items to your cart yet
              </Typography>
              <Link href="/products" passHref>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ backgroundColor: "#16a34a" }}
                >
                  Start Shopping
                </Button>
              </Link>
            </Box>
          ) : (
            <>
              {allData.data.products.map((el) => (
                <CartItemContainer key={el._id}>
                  <Box sx={{ flexShrink: 0 }}>
                    <Image
                      src={el.product.imageCover}
                      alt={el.product.title}
                      width={120}
                      height={120}
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                        border: "1px solid #eee",
                      }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Link href={`/product/${el._id}`} passHref>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          cursor: "pointer",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        {el.product.title}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      Category: {el.product.category.name}
                    </Typography>
                    <Typography variant="body1" fontWeight={600} mt={1}>
                      {el.price.toFixed(2)} EGP
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      aria-label="decrease quantity"
                      disabled={el.count <= 1}
                      onClick={() =>
                        updateCount({
                          id: el.product._id,
                          body: { count: `${el.count - 1}` },
                        })
                      }
                    >
                      <RemoveCircleOutlineOutlined />
                    </IconButton>

                    <Typography
                      variant="body1"
                      sx={{ minWidth: 30, textAlign: "center" }}
                    >
                      {el.count}
                    </Typography>

                    <IconButton
                      aria-label="increase quantity"
                      onClick={() =>
                        updateCount({
                          id: el.product._id,
                          body: { count: `${el.count + 1}` },
                        })
                      }
                    >
                      <AddCircleOutlineOutlined />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ minWidth: 100, textAlign: "right" }}
                  >
                    {(el.price * el.count).toFixed(2)} EGP
                  </Typography>

                  <IconButton
                    onClick={() => handleDelete(el.product._id)}
                    aria-label="remove item"
                    sx={{ color: "error.main" }}
                  >
                    {loadDelete && idProudct == el.product._id ? (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <DeleteOutline />
                    )}
                  </IconButton>
                </CartItemContainer>
              ))}
            </>
          )}
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: 350 },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            boxShadow: 1,
            alignSelf: { md: "flex-start" },
            position: { md: "sticky" },
            top: 20,
          }}
        >
          <Typography variant="h5" fontWeight={600} mb={3}>
            Order Summary
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <InputBase
              placeholder="Enter promo code"
              fullWidth
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                px: 2,
                py: 1,
              }}
            />
            <Button variant="outlined" sx={{ whiteSpace: "nowrap" }}>
              Apply
            </Button>
          </Box>

          <Stack spacing={1} mb={3}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {subtotal.toFixed(2)} EGP
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary">
                Tax (5%)
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {tax.toFixed(2)} EGP
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight={600}>
                Total
              </Typography>
              <Typography variant="h6" fontWeight={600} color="primary">
                {total.toFixed(2)} EGP
              </Typography>
            </Box>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={allData.data.products.length === 0}
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            Proceed to Checkout
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            mt={2}
            color="text.secondary"
          >
            <Link href="/login" passHref>
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Sign in
              </Box>
            </Link>{" "}
            to your account for rewards and faster checkout
          </Typography>
        </Box>
      </FlexContainer>
    </Box>
  );
}

export default CartDetails;
