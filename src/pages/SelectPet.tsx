import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useStory, Pet } from "@/contexts/StoryContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const pets = [
  { id: "baby-dragon" as Pet, emoji: "🐉", name: "Dragón Bebé", description: "Un pequeño dragón valiente" },
  { id: "dog" as Pet, emoji: "🐕", name: "Perrito", description: "Un amigo fiel y juguetón" },
  { id: "cat" as Pet, emoji: "🐈", name: "Gatito", description: "Un felino curioso y ágil" },
  { id: "robot" as Pet, emoji: "🤖", name: "Robot", description: "Un compañero tecnológico" },
  { id: "mini-dinosaur" as Pet, emoji: "🦖", name: "Mini Dinosaurio", description: "Un dino adorable" },
  { id: "fairy" as Pet, emoji: "🧚", name: "Hada", description: "Una hada con poderes mágicos" },
];

const SelectPet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storyData, updateStoryData } = useStory();
  
  const [selectedPet, setSelectedPet] = useState<Pet | null>(storyData.petType);
  const [petName, setPetName] = useState(storyData.petName);

  const handleContinue = () => {
    if (!selectedPet) {
      toast({
        title: "¡Espera!",
        description: "Por favor selecciona una mascota compañera",
        variant: "destructive",
      });
      return;
    }

    if (!petName.trim()) {
      toast({
        title: "¡Espera!",
        description: "Por favor dale un nombre a tu mascota",
        variant: "destructive",
      });
      return;
    }

    updateStoryData({
      petType: selectedPet,
      petName: petName,
    });
    navigate("/trama");
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Tu <span className="bg-gradient-warm bg-clip-text text-transparent">Mascota</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            ¿Quién te acompañará en esta aventura?
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pets.map((pet, index) => {
            const isSelected = selectedPet === pet.id;
            
            return (
              <Card
                key={pet.id}
                onClick={() => setSelectedPet(pet.id)}
                className={`
                  cursor-pointer transition-all duration-300 p-6 space-y-3
                  hover:shadow-float hover:-translate-y-1
                  ${isSelected ? "ring-4 ring-secondary shadow-float scale-105" : "hover:shadow-card"}
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl text-center">
                  {pet.emoji}
                </div>
                
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-foreground">
                    {pet.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {pet.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="text-center text-secondary font-semibold animate-fade-in">
                    <span className="text-xl">✨</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <Card className="p-8 space-y-4 shadow-card">
          <Label htmlFor="petName" className="text-lg font-semibold">
            Nombre de tu mascota
          </Label>
          <Input
            id="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Dale un nombre especial..."
            className="text-lg"
            maxLength={15}
          />
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/protagonista")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Atrás
          </Button>
          
          <Button
            size="lg"
            onClick={handleContinue}
            className="bg-gradient-warm text-white hover:opacity-90 transition-all shadow-float"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPet;
