// Overview LineChart Component

"use client"

import { AvailableChartColors, AvailableChartColorsKeys } from "@/lib/chartUtils"
import React from "react"
import { LineChart, type LineChartEventProps } from "../../LineChart"

interface DashboardLineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Array<Record<string, any>>
  index: string              // x-axis field name
  categories: string[]       // y-axis field names (multiple lines)
  colors?: string[]          // ['blue', 'cyan', 'indigo']
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showGridLines?: boolean
  showAnimation?: boolean
  onValueChange?: (value: LineChartEventProps) => void
}

const DashboardLineChart = React.forwardRef<HTMLDivElement, DashboardLineChartProps>(
  (props, ref) => {
    const {
      data = [],
      index,
      categories = [],
      colors,
      valueFormatter = (value: number) => value.toString(),
      showLegend = true,
      showGridLines = true,
      showAnimation = true,
      onValueChange,
      className,
      ...other
    } = props

    // Map color strings to AvailableChartColorsKeys
    const chartColors: AvailableChartColorsKeys[] = React.useMemo(() => {
      if (colors) {
        return colors.map(color => {
          // Map common color names to available chart colors
          const colorMap: Record<string, AvailableChartColorsKeys> = {
            'blue': 'blue',
            'cyan': 'cyan',
            'indigo': 'indigo',
            'violet': 'violet',
            'pink': 'pink',
            'amber': 'amber',
            'emerald': 'emerald',
            'gray': 'gray',
          }
          return colorMap[color] || 'blue'
        })
      }
      return AvailableChartColors.slice(0, categories.length)
    }, [colors, categories.length])

    return (
      <LineChart
        ref={ref}
        data={data}
        index={index}
        categories={categories}
        colors={chartColors}
        valueFormatter={valueFormatter}
        showLegend={showLegend}
        showGridLines={showGridLines}
        showTooltip={true}
        showXAxis={true}
        showYAxis={true}
        autoMinValue={true}
        allowDecimals={true}
        connectNulls={false}
        intervalType="equidistantPreserveStart"
        enableLegendSlider={false}
        onValueChange={onValueChange}
        className={className}
        {...other}
      />
    )
  },
)

DashboardLineChart.displayName = "DashboardLineChart"

export { DashboardLineChart, type DashboardLineChartProps }

