"use client"


import { DashboardMetricCard } from "@/components/ui/overview/DashboardMetricCard"

export default function Overview() {

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
            label="Total Crabs"
            value="75"
          />
          <DashboardMetricCard
            label="Male Vs Female (Donut Chart)"
            value="75"
          />
          <DashboardMetricCard
            label="Box Occupancy (Donut Chart)"
            value="75"
          />
          <DashboardMetricCard
            label="New Crabs (This month)"
            value="10"
          />
          <DashboardMetricCard
            label="Dead Crabs (This month)"
            value="10"
          />
          <DashboardMetricCard
            label="Sold Crabs (This month)"
            value="10"
          />

          {/* 
          [ Donut Chart: Occupancy (Used vs Free) ]
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
        <div className="mt-4 grid grid-cols-1 gap-14 sm:mt-8 sm:grid-cols-2 lg:mt-10 xl:grid-cols-3">
          <DashboardMetricCard
            label="Total Revenue (This month)"
            value="10"
          />
          <DashboardMetricCard
            label="Total Expenses (This month)"
            value="10"
          />
          <DashboardMetricCard
            label="Net Profit (This month)"
            value="10"
          />

          {/* [ Pie/Bar Chart: Revenue Breakdown by Category (optional) ] */}
          {/* [ Line Chart: Revenue vs Expenses over Time ] */}
        </div >
      </section >
    </>
  )
}
