"use client"


import {  CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TransactionsChartDataType } from "@/features/transaction/types/transaction.types"
import { currencyFormatter } from "@/utils/currencyFormatter.utils"
import { format } from "date-fns"

export const description = "A line chart with a label"


export function TrackChart(props:{chartData : TransactionsChartDataType[] , chartConfig : ChartConfig }) {
  const {chartData , chartConfig } = props;
  return (
    <Card className="border-0 shadow-none p-0 rounded-none bg-background">
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => {
                return format(new Date(value), "MMM dd")
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-48"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className=" shrink-0 rounded-[2px] bg-[--color-bg]"
                        style={
                          {
                            "--color-bg": `var(--color-${name})`,
                          } as React.CSSProperties
                        }
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value as number > 0 ? <span className="text-primary">{currencyFormatter(value as number , 0 )}</span> : <span className="text-red-500">{currencyFormatter(value as number , 0 )}</span>}
                      </div>
                      
                    </>
                  )}
                />
              }
              cursor={false}
              defaultIndex={1}
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-amount)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                
              />
            </Line>
            <Line
            className="hidden"
              dataKey="transactionAmount"
              type="natural"
              stroke="var(--color-transactionAmount)"
              strokeWidth={0}
              dot={{
                fill: "var(--color-transactionAmount)",
              }}
              activeDot={{
                r: 0,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  )
}
