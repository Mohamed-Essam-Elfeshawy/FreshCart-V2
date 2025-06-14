import { Box, Typography } from "@mui/material";
import Spinner from "./Spinner";
import { useRelatedProductQuery } from "@/redux/features/Product/Proudct";
import { IProduct } from "@/interface";
import Product from "./Product";
interface IProps {
  id: string;
}
function Related({ id }: IProps) {
  const { data: alldata } = useRelatedProductQuery(id);
  const { data }: { data: IProduct[] } = alldata || {
    data: [],
  };
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mt: "2rem",
          fontWeight: 700,
          color: "#16a34a",
          fontSize: {
            sm: "1rem",
            md: "1.5rem",
            lg: "2rem",
          },
        }}
      >
        <span style={{ color: "black", borderBottom: "5px solid #16a34a" }}>
          Related
        </span>{" "}
        Items
      </Typography>
      <Box sx={{ my: "2rem" }}>
        <Box>
          {data.length === 0 ? (
            <Spinner />
          ) : (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {" "}
                {data.map((el: IProduct) => (
                  <Product data={el} key={el._id} />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Related;
