import { createFinance, deleteFinance, fetchAllFinances, updateFinance } from "@/services/financeService";
import FinancePage from "./FinancePage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const finances = await fetchAllFinances();

  return <>
    <FinancePage
      finances={finances}
      onEdit={updateFinance}
      onDelete={deleteFinance}
      onSubmit={createFinance} />
  </>
}