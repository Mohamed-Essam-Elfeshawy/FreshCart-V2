"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { Brand } from "@/interface";
import { detalisCategory } from "@/data";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function DialogBrand({ data }: { data: Brand }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        onClick={handleClickOpen}
        sx={{
          border: "1px solid gray",
          cursor: "pointer",
          position: "relative",
          height: "14rem",
          bgcolor: "white",
          borderRadius: "10px",
          transition: "all 0.5s ease",
          transformOrigin: "center",
          overflow: "hidden",
          "&:hover": {
            transform: "scale(1.05)",
            "& .overlay": {
              bgcolor: "rgba(22, 163, 74, 0.5)",
            },
            "& .discover-button .arrow-icon": {
              transform: "translateX(8px)",
              transition: "transform 0.3s ease",
            },
          },
        }}
      >
        <Image
          src={data.image}
          alt={data.slug}
          fill
          style={{ borderRadius: "10px", objectFit: "cover" }}
          className="scale-animation"
        />

        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "all 0.3s ease",
          }}
        />

        <Box
          className="content-box"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: {
                sm: "1rem",
                md: "1.2rem",
                lg: "1.5rem",
              },
              color: "black",
            }}
          >
            {data.name}
          </Typography>

          <Box
            sx={{
              width: "3rem",
              height: "5px",
              borderRadius: "10px",
              bgcolor: "#16a34a",
            }}
          />
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiBackdrop-root": {
            backdropFilter: "blur(3px)",
          },
          "& .MuiDialog-paper": {
            maxWidth: "750px",
          },
        }}
      >
        <DialogContent sx={{ padding: "0" }}>
          {data.image && (
            <Box sx={{ position: "relative" }}>
              <Image
                src={data.image}
                alt={data.name || "Category"}
                width={500}
                height={300}
                style={{ width: "100%", objectFit: "cover" }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  transition: "all 0.3s ease",
                }}
              />
              <Box
                className="content-box"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  transition: "all 0.3s ease",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      sm: "1.5rem",
                      md: "2rem",
                      lg: "3rem",
                    },
                    color: "white",
                  }}
                >
                  {data.name}
                </Typography>

                <Box
                  sx={{
                    width: "5rem",
                    height: "5px",
                    borderRadius: "10px",
                    bgcolor: "#16a34a",
                  }}
                />
              </Box>
            </Box>
          )}
          <Box
            sx={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              gap: 4,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {detalisCategory.map((el, idx) => (
              <Box key={idx}>
                <Typography sx={{ fontWeight: "bold" }}>{el.name}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {data[el.referApi as keyof typeof data]}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogBrand;
