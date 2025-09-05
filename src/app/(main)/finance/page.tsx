import FinanceDataTable from "@/components/ui/finances/financeDataTable";
import { fetchAllFinances } from "@/services/financeService";

export default async function Page() {
  const finances = await fetchAllFinances();

  return <>
    <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
      Details
    </h1>
    <div className="mt-4 sm:mt-6 lg:mt-10">
      <FinanceDataTable finances={finances} />
    </div>
  </>
}