import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Info } from "lucide-react";

interface GaugeWidgetProps {
  percentage: number;
  title?: string;
}

const GaugeWidget = ({ percentage, title = "Day win %" }: GaugeWidgetProps) => {
  // Calculate segments based on percentage
  // Green segment: 0-33%, Gray: 34-66%, Red: 67-100%
  const getSegments = (value: number) => {
    const segments = [
      { value: 33, color: "hsl(var(--gauge-success))", active: value >= 0 },
      { value: 33, color: "hsl(var(--gauge-neutral))", active: value >= 34 },
      { value: 34, color: "hsl(var(--gauge-danger))", active: value >= 67 },
    ];
    
    return segments.map((segment) => ({
      ...segment,
      opacity: segment.active ? 1 : 0.2,
    }));
  };

  const data = getSegments(percentage);

  return (
    <Card className="p-6 border-2 border-border/50">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Percentage Display */}
        <div className="flex-1">
          <p className="text-6xl font-bold text-foreground">{percentage}%</p>
        </div>

        {/* Gauge Chart */}
        <div className="flex-1 flex flex-col items-center">
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="90%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={entry.opacity}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Legend Dots */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-6 h-6 rounded-full bg-gauge-success" />
            <div className="w-6 h-6 rounded-full bg-gauge-neutral" />
            <div className="w-6 h-6 rounded-full bg-gauge-danger" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GaugeWidget;
