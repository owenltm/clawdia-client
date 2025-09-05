import CrabDataTable from "@/components/ui/crabs/crabDataTable";
import { fetchAllCrabs } from "@/services/crabService";

export default async function Page() {
  const crabs = await fetchAllCrabs();

  return <>
    <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
      Details
    </h1>
    <div className="mt-4 sm:mt-6 lg:mt-10">
      {/* <CrabTable crabs={crabs} /> */}
      <CrabDataTable crabs={crabs} />
    </div>
  </>
}