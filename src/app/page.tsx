import { Box, Typography } from "@mui/material";
import { homeItems, serviesItems } from "@/data";

import SlideHome from "@/components/SlideHome";
import CategoreSlide from "@/components/CategoreSlide";
import Items from "@/components/Items";
import BestSeller from "@/components/BestSeller";
import PopularItems from "@/components/PopularItems";

export default function Home() {
  return (
    <>
      <Items data={homeItems} />

      <SlideHome />
      <Box sx={{ textAlign: "center", my: "1rem" }}>
        <Typography sx={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          Shop By Category
        </Typography>
      </Box>
      <CategoreSlide />
      <Box sx={{ mt: "4rem" }}>
        <Items data={serviesItems} />
      </Box>
      <BestSeller />
      <PopularItems />
    </>
  );
}
