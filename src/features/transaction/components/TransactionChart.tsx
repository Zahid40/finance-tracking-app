"use client"

import { TrendingUp } from "lucide-react"
import { Bar, CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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
import { toCapitalizeFirstLetter } from "@/utils/string.utils"
import { formatRelative, subDays } from "date-fns"
import { currencyFormatter } from "@/utils/currencyFormatter.utils"

export const description = "A line chart with a label"


export function TrackChart(props:{chartData : TransactionsChartDataType[] , chartConfig : ChartConfig , title : string , desc : string}) {
  const {chartData , chartConfig , title , desc} = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
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
                return new Date(value).toLocaleDateString("en-US", {
                  hour:"2-digit",
                  minute:'numeric',
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            {/* <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" nameKey="name" className="w-40" labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  hour:"2-digit",
                  minute:'numeric',
                  month: "short",
                  day: "numeric",
                })
              }} />}
            /> */}
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
