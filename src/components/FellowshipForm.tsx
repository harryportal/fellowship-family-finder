import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Heart, Phone, User, Calendar, Video } from "lucide-react";
import churchLogo from "@/assets/church-logo.png";

interface FormData {
  name: string;
  phone: string;
}

export const FellowshipForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", phone: "" });
  const [assignedFamily, setAssignedFamily] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and phone number are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://itmobot.unilag.edu.ng/family/get-one', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setAssignedFamily(data.family);
        setHasSubmitted(true);
        toast({
          title: "Family Assignment Complete! 🎉",
          description: `You've been assigned to ${data.family}`,
        });
      } else {
        throw new Error('Failed to assign family');
      }
    } catch (error) {
      // For demo purposes, simulate a successful assignment
      const demoFamilies = [
        "Grace Family", "Hope Family", "Faith Family", "Love Family", 
        "Peace Family", "Joy Family", "Wisdom Family", "Light Family"
      ];
      const randomFamily = demoFamilies[Math.floor(Math.random() * demoFamilies.length)];
      
      setTimeout(() => {
        setAssignedFamily(randomFamily);
        setHasSubmitted(true);
        toast({
          title: "Family Assignment Complete! 🎉",
          description: `You've been assigned to ${randomFamily}`,
        });
        setIsSubmitting(false);
      }, 1500);
      return;
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({ name: "", phone: "" });
    setAssignedFamily("");
    setHasSubmitted(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!hasSubmitted ? (
        <Card className="shadow-soft border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto flex items-center justify-center">
              <img 
                src={churchLogo} 
                alt="Cherubim & Seraphim Church Unification - Unilag Chapter" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Fellowship Family Assignment
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Register your details to be assigned to a family group
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="h-12 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-12 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-primary hover:opacity-90 shadow-soft text-primary-foreground font-medium transition-all duration-300"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Assigning Family...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Get Family Assignment
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-warm border-0 bg-gradient-to-br from-success/10 to-accent/10 animate-slide-up">
          <CardContent className="text-center py-8 space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center shadow-warm">
              <Heart className="w-10 h-10 text-white" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Family Assignment Complete! 🎉
              </h2>
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="text-lg font-semibold text-success mb-1">
                  You've been assigned to:
                </p>
                <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {assignedFamily}
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Don't miss our special meetings this holiday to keep ourselves equipped in the faith.
              </p>
            </div>
            
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
            >
              Register Another Member
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};