import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Info } from "lucide-react";

interface GaugeWidgetProps {
  percentage: number;
  title?: string;
  legendValues?: [number, number, number];
}

const GaugeWidget = ({ 
  percentage, 
  title = "Day win %",
  legendValues = [8, 0, 12]
}: GaugeWidgetProps) => {
  // All segments are always visible
  const data = [
    { value: 33, color: "hsl(var(--gauge-success))" },
    { value: 33, color: "hsl(var(--gauge-neutral))" },
    { value: 34, color: "hsl(var(--gauge-danger))" },
  ];
  const colors = ["hsl(var(--gauge-success))", "hsl(var(--gauge-neutral))", "hsl(var(--gauge-danger))"];

  return (
    <Card className="p-6 border-2 border-border/50">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-2">
          <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Percentage Display */}
        <div className="flex-1">
          <p className="text-6xl font-bold text-foreground tracking-tight">{percentage}%</p>
        </div>

        {/* Gauge Chart */}
        <div className="flex-1 flex flex-col items-center">
          <ResponsiveContainer width="100%" height={110}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="95%"
                startAngle={180}
                endAngle={0}
                innerRadius={55}
                outerRadius={85}
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend Dots with Numbers */}
          <div className="flex items-center gap-3 mt-1">
            {legendValues.map((value, index) => (
              <div 
                key={index}
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-background"
                style={{ backgroundColor: colors[index] }}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GaugeWidget;
