import SignUPForm from "@/components/SignUPForm";
import { Box } from "@mui/material";

function page() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "90vh",
        flexWrap: "wrap",
      }}
    >
      <SignUPForm />
    </Box>
  );
}

export default page;
