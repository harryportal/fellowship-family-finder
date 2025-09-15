import { FellowshipForm } from "@/components/FellowshipForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-success/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Fellowship
            </span>{" "}
            <span className="text-foreground">Family Registration</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Welcome to our student church fellowship! Join a loving family community 
            where you'll find friendship, support, and spiritual growth together.
          </p>
        </div>
        
        <div className="flex justify-center">
          <FellowshipForm />
        </div>
        
        <div className="text-center mt-12 animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Questions? Contact your fellowship leaders for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
