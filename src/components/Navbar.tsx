"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import logo from "../images/freshcart-logo.svg";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ICartResponse } from "@/interface";
import { useAllCartQuery } from "@/redux/features/Cart/cart";
import Spinner from "./Spinner";
const pages = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Brands", path: "/brands" },
];
function Navbar() {
  const { data: dataCart, isLoading } = useAllCartQuery("") as {
    data: ICartResponse | undefined;
    isLoading: boolean;
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const localData =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userData = localData ? localData : null;
  function handleLogOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      location.replace("/signin");
    }
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff99",
        color: "black",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ color: "black" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
            }}
          >
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                loading="lazy"
                style={{ cursor: "pointer" }}
              />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link href={page.path}>
                    <Typography sx={{ textAlign: "center", color: "black" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                loading="lazy"
                style={{ cursor: "pointer" }}
              />
            </Link>{" "}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {pages.map((page) => (
              <Link key={page.name} href={`${page.path}`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "black  ",
                    display: "block",
                    textTransform: "capitalize",
                    "&:hover": {
                      scale: "1.1",
                    },
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {userData ? (
              <>
                {" "}
                <Link href={"/cart"}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <ShoppingCartOutlinedIcon />
                    <Box
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        minWidth: 20,
                        height: 20,
                        borderRadius: "50%",
                        bgcolor: "#16a34a",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: "bold",
                        padding: "2px",
                      }}
                    >
                      {dataCart?.data.products.length}
                    </Box>
                  </Box>
                </Link>
                <Button
                  onClick={handleLogOut}
                  sx={{
                    textTransform: "capitalize",
                    border: "1px solid #e4e4e7",
                    borderRadius: "12px",
                    color: "black",
                    fontWeight: 500,
                    fontSize: ".875rem",
                    padding: "0.3rem 1rem",
                  }}
                >
                  <LoginIcon sx={{ mr: "5px" }} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Link href="/signin">
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      border: "1px solid #e4e4e7",
                      borderRadius: "12px",
                      color: "black",
                      fontWeight: 500,
                      fontSize: ".875rem",
                      padding: "0.3rem 1rem",
                    }}
                  >
                    <LoginIcon sx={{ mr: "5px" }} />
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: "12px",
                      color: "white",
                      border: "1px solid #e4e4e7",

                      backgroundColor: "#18181b",
                      fontWeight: 500,
                      fontSize: ".875rem",
                      padding: "0.3rem 1rem",
                      "&:hover": {
                        backgroundColor: "#3f3f46",
                      },
                    }}
                  >
                    <AssignmentIndIcon sx={{ mr: "5px" }} />
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
