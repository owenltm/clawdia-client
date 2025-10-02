import { createFinance, deleteFinance, fetchAllFinances, updateFinance } from "@/services/financeService";
import FinancePage from "./FinancePage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const finances = await fetchAllFinances();

  return <>
    <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
      Details
    </h1>
    <div className="mt-4 sm:mt-6 lg:mt-10">
      <FinancePage
        finances={finances}
        onEdit={updateFinance}
        onDelete={deleteFinance}
        onSubmit={createFinance} />
    </div>
  </>
}