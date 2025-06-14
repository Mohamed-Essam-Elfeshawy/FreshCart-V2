import SingleProduct from "@/components/SingleProduct";

interface IProps {
  params: Promise<{
    id: string;
  }>;
}
async function page(props: IProps) {
  const params = await props.params;
  const { id } = params;
  return (
    <div>
      <SingleProduct productID={id} />
    </div>
  );
}

export default page;
