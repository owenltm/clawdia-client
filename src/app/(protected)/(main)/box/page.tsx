import { BoxArrayHeader } from "@/components/ui/boxes/BoxArrayHeader";
import BoxArrayLayout from "@/components/ui/boxes/BoxArrayLayout";
import { BoxArraySkeleton } from "@/components/ui/boxes/BoxArraySkeleton";
import { BoxProvider } from "@/contexts/BoxContext";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Page() {
  /* const [inventory, setInventory] = useState<Inventory[] | null>(null);

  const loadInventory = async () => {
    const data = await fetchCurrentInventory();
    setInventory(data.items);
  }

  useEffect(() => {
    loadInventory();
  }, []); */

  return <>
    <BoxProvider>
      <h1 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50">
        Inventory Details
      </h1>
      <div className="mt-4 sm:mt-6">
        <BoxArrayHeader />
        <div className="overflow-x-auto pb-4">
          {/* {!inventory && <BoxArraySkeleton />}
          {inventory && <BoxArrayLayout inventory={inventory} />} */}
          <Suspense fallback={<BoxArraySkeleton />}>
            {/* @ts-expect-error Async Server Component */}
            <BoxArrayLayout inventory={null} />
          </Suspense>
        </div>
      </div>
    </BoxProvider>
  </>
}