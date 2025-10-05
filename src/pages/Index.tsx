import GaugeWidget from "@/components/GaugeWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard Widget</h1>
        <GaugeWidget percentage={40} />
      </div>
    </div>
  );
};

export default Index;
