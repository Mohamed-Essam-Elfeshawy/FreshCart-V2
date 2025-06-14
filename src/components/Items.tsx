import { Box, Typography } from "@mui/material";
import { IHomeitems } from "@/interface";
import CallIcon from "@mui/icons-material/Call";
function Items({ data }: { data: IHomeitems[] }) {
  const bg = data.some((el) => el.icon == CallIcon);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
        bgcolor: bg ? "#16a34a46" : "transparent",
        borderRadius: bg ? "10px" : "0px",
      }}
    >
      {data.map((item, index) => {
        const Icon = item.icon;
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              bgcolor: bg ? "transparent" : "#16a34a46",
              borderRadius: "10px",
              width: "100%",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                bgcolor: "#16a34a",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon sx={{ color: "white", fontSize: 30 }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#6b7280",
                }}
              >
                {item.refer}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default Items;
