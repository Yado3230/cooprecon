import TemplateFormat from "@/components/imports/reconciliation/ExcelFormat";
import prismadb from "@/lib/prismadb";

async function getClients() {
  const feed = await prismadb.client.findMany();
  return feed;
}
export const revalidate = 1;

const Page = async () => {
  const clients = await getClients();

  return (
    <div>
      <TemplateFormat />
    </div>
  );
};

export default Page;
