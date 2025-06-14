import SignInForm from "@/components/SignInForm";
import { Box } from "@mui/material";

function page() {
  return (
    <Box
      sx={{
        display: { md: "block", lg: "flex" },
        alignItems: "center",
        height: "90vh",
      }}
    >
      <SignInForm />
    </Box>
  );
}

export default page;
