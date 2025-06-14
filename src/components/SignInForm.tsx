/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import Image from "next/image";
import { signinFormInputs, slideLogin } from "@/data";
import { ShoppingCart } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/schema/schema";
import { ILoginInput } from "@/interface";
import { useSigninMutation } from "@/redux/features/Auth/Auth";
import toast from "react-hot-toast";
import Loader from "./Loader";

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
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
  const [signinUser, { isLoading }] = useSigninMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: yupResolver(schemaLogin),
  });
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      console.log(data);
      const res: any = await signinUser(data);
      console.log(res);

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
        localStorage.setItem("token", res.data.token);
        location.replace("/");
      }
    } catch (error) {
      toast.error(`${error}`, {
        position: "bottom-center",
        duration: 1500,
      });
    }
  };
  const renderFormSignin = signinFormInputs.map((el, idx) =>
    el.type !== "password" ? (
      <FormControl key={idx}>
        <Typography sx={{ fontWeight: 500, fontSize: ".875rem" }}>
          {el.title}
        </Typography>
        <TextField
          id={el.id}
          type={el.type}
          sx={{ width: "100%", mt: "5px" }}
          placeholder={el.placeholder}
          {...register(el.id, el.validation)}
          error={!!errors[el.id]}
          helperText={errors[el.id]?.message}
        />
      </FormControl>
    ) : (
      <Box key={idx}>
        <Typography sx={{ fontWeight: 500, fontSize: ".875rem", mb: "5px" }}>
          {el.title}
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <OutlinedInput
            id="outlined-adornment-password"
            {...register("password", { required: true, min: 6 })}
            type={showPassword ? "text" : "password"}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>{" "}
      </Box>
    )
  );

  return (
    <>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          sx={{
            padding: "15px",
            border: "1px solid #e4e4e7",
            borderRadius: "12px",
            color: "black",
            textAlign: "center",
            width: { md: "100%", lg: "80%" },
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
            Login to FreshCart
          </Typography>
          <Typography sx={{ fontSize: ".875rem", color: "#71717a" }}>
            Enter your credentials to access your account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                textAlign: "start",
                mt: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {renderFormSignin}
              <Box>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    bgcolor: "#18181b",
                    textTransform: "capitalize",
                    mt: "10px",
                    "&:hover": {
                      bgcolor: "#333",
                    },
                  }}
                  variant="contained"
                >
                  {isLoading ? <Loader /> : " Login"}
                </Button>
              </Box>
            </Box>
          </form>

          <Box
            sx={{
              mt: "5px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            <Typography
              component="span"
              sx={{
                height: "0.5px",
                bgcolor: "#71717a",
                flexGrow: "1",
              }}
            ></Typography>
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: "14px",
                color: "#71717a",
              }}
            >
              or continue with
            </Typography>
            <Typography
              component="span"
              sx={{
                height: "0.5px",
                bgcolor: "#71717a",
                flexGrow: "1",
              }}
            ></Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              sx={{
                bgcolor: "#DB4437",
                color: "#fff",
                textTransform: "capitalize",
                fontWeight: "bold",
                borderRadius: "10px",
                flexGrow: 1,

                px: 3,
                "&:hover": {
                  bgcolor: "#c33d2e",
                },
              }}
            >
              Google
            </Button>

            <Button
              variant="contained"
              startIcon={<GitHubIcon />}
              sx={{
                bgcolor: "#24292e",
                flexGrow: 1,
                color: "#fff",
                textTransform: "capitalize",
                fontWeight: "bold",
                borderRadius: "10px",
                px: 3,
                "&:hover": {
                  bgcolor: "#1b1f23",
                },
              }}
            >
              GitHub
            </Button>
          </Stack>
          <Typography sx={{ fontSize: ".875rem", cursor: "pointer" }}>
            Forgot password?{" "}
          </Typography>
          <Typography sx={{ fontSize: ".875rem", color: "#71717a" }}>
            Don&apos;t have an account?{" "}
            <Typography
              component={"span"}
              sx={{ textDecoration: "underline", fontWeight: "500" }}
            >
              <Link href={"/signup"}>Sign up</Link>
            </Typography>{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          position: "relative",
          display: "block",
          height: { md: "80vh" },
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
                height: "80vh",
                display: "flex !important",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                gap: 2,
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
                    xs: "1.8rem",
                    sm: "2.2rem",
                    md: "2.8rem",
                    lg: "3.5rem",
                  },
                  textAlign: "center",
                }}
              >
                Welcome to FreshCart
              </Typography>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Your ultimate destination for fashion, electronics, and more
              </Typography>
              <ShoppingCart sx={{ fontSize: "5rem" }} />
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}

export default SignInForm;
