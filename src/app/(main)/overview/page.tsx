import { DashboardLineChart } from "@/components/ui/overview/DashboardLineChart";
import { DashboardMetricCard } from "@/components/ui/overview/DashboardMetricCard";
import { ProgressBarCard } from "@/components/ui/overview/DashboardProgressBarCard";
import { fetchFinancialOverviewData } from "@/services/financeService";
import { fetchInventoryOverviewData } from "@/services/inventoryService";

export const dynamic = "force-dynamic";

export default async function Overview() {
  const [
    inventoryOverviewData,
    financialOverviewData
  ] = await Promise.all([
    fetchInventoryOverviewData(),
    fetchFinancialOverviewData()
  ]);

  const getRevenueBreakdownData = () => {
    return Object.keys(financialOverviewData.totalRevenueByCategory).map(category => {
      return {
        title: category,
        value: financialOverviewData.totalRevenueByCategory[category],
        percentage: Math.round((financialOverviewData.totalRevenueByCategory[category] / financialOverviewData.totalRevenue) * 100)
      }
    });
  }

  const getExpenseBreakdownData = () => {
    return Object.keys(financialOverviewData.totalExpensesByCategory).map(category => {
      return {
        title: category,
        value: financialOverviewData.totalExpensesByCategory[category],
        percentage: Math.round((financialOverviewData.totalExpensesByCategory[category] / financialOverviewData.totalExpenses) * 100)
      }
    });
  }

  const getDailyFinanceData = () => {
    return financialOverviewData.dailySummary.map((item: any) => ({
      date: item.date,
      revenues: item.revenues.reduce((sum: number, item: any) => sum + item.amount, 0),
      expenses: item.expenses.reduce((sum: number, item: any) => sum + item.amount, 0)
    }));
  }

  return (
    <>
      <section aria-labelledby="current-billing-cycle">
        <h1
          id="current-billing-cycle"
          className="scroll-mt-10 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50"
        >
          Stock Overview
        </h1>
        <div className="mt-4 grid grid-cols-1 gap-14 sm:mt-8 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3">
          <DashboardMetricCard
            label="Total Crabs in Stock"
            value={inventoryOverviewData.crabInStock.toString()}
          />
          {/* TODO: Other metrics ? */}
          <DashboardMetricCard
            label="Total Box"
            value={inventoryOverviewData.BoxStatus.total.toString()}
          />
          {/* TODO: Make donut chart */}
          <DashboardMetricCard
            label="Box Occupancy"
            value={inventoryOverviewData.occupancyRate.toString()}
          />
          <DashboardMetricCard
            label="New Crabs (This month)"
            value={inventoryOverviewData.newCrabsThisMonth.toString()}
          />
          <DashboardMetricCard
            label="Dead Crabs (This month)"
            value={inventoryOverviewData.deadCrabsThisMonth.toString()}
          />
          <DashboardMetricCard
            label="Sold Crabs (This month)"
            value={inventoryOverviewData.soldCrabsThisMonth.toString()}
          />

          {/* 
          [ Bar Chart: Box Usage Trend (optional) ] 
           */}
        </div>
      </section>
      <section aria-labelledby="current-billing-cycle">
        <h1
          id="current-billing-cycle"
          className="mt-16 scroll-mt-8 text-lg font-semibold text-gray-900 sm:text-xl dark:text-gray-50"
        >
          Finance Overview
        </h1>
        <div className="mt-4 grid grid-cols-1 gap-14 sm:mt-8 sm:grid-cols-2 lg:mt-10 xl:grid-cols-2">
          <DashboardMetricCard
            label="Total Revenue (This month)"
            value={financialOverviewData.totalRevenue.toString()}
          />
          <DashboardMetricCard
            label="Total Expenses (This month)"
            value={financialOverviewData.totalExpenses.toString()}
          />

          <div>
            <ProgressBarCard
              title="Revenue by Category"
              data={getRevenueBreakdownData()}
            />
          </div>

          <div>
            <ProgressBarCard
              title="Expenses by Category"
              data={getExpenseBreakdownData()}
            />
          </div>

          <div className="col-span-2">
            <DashboardLineChart
              data={getDailyFinanceData()}
              index="date"
              categories={["revenues", "expenses"]}
              colors={["blue", "emerald"]}
              showLegend={true}
            />
          </div>
        </div >
      </section >
    </>
  )
}
