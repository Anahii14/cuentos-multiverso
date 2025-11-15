import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useStory, Gender } from "@/contexts/StoryContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const avatars = [
  { id: 1, emoji: "👦", gender: "boy" },
  { id: 2, emoji: "👧", gender: "girl" },
  { id: 3, emoji: "🧒", gender: "neutral" },
  { id: 4, emoji: "👶", gender: "neutral" },
  { id: 5, emoji: "🧑", gender: "neutral" },
];

const Protagonist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storyData, updateStoryData } = useStory();
  
  const [name, setName] = useState(storyData.characterName);
  const [age, setAge] = useState(storyData.characterAge.toString());
  const [gender, setGender] = useState<Gender | null>(storyData.characterGender);
  const [avatar, setAvatar] = useState(storyData.characterAvatar);

  const handleContinue = () => {
    if (!name.trim()) {
      toast({
        title: "¡Espera!",
        description: "Por favor ingresa un nombre para tu personaje",
        variant: "destructive",
      });
      return;
    }

    const ageNum = parseInt(age);
    if (!ageNum || ageNum < 3 || ageNum > 12) {
      toast({
        title: "¡Espera!",
        description: "La edad debe estar entre 3 y 12 años",
        variant: "destructive",
      });
      return;
    }

    if (!gender) {
      toast({
        title: "¡Espera!",
        description: "Por favor selecciona el género del personaje",
        variant: "destructive",
      });
      return;
    }

    updateStoryData({
      characterName: name,
      characterAge: ageNum,
      characterGender: gender,
      characterAvatar: avatar,
    });
    navigate("/mascota");
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Tu <span className="bg-gradient-magic bg-clip-text text-transparent">Protagonista</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            ¿Quién será el héroe de esta historia?
          </p>
        </div>

        <Card className="p-8 space-y-6 shadow-card">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-semibold">
              Nombre del personaje
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Sofía, Mateo, Alex..."
              className="text-lg"
              maxLength={20}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-lg font-semibold">
              Edad
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Entre 3 y 12 años"
              className="text-lg"
              min={3}
              max={12}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold">
              Género
            </Label>
            <div className="flex gap-4">
              <Button
                variant={gender === "boy" ? "default" : "outline"}
                onClick={() => setGender("boy")}
                className="flex-1 h-12"
              >
                Niño
              </Button>
              <Button
                variant={gender === "girl" ? "default" : "outline"}
                onClick={() => setGender("girl")}
                className="flex-1 h-12"
              >
                Niña
              </Button>
              <Button
                variant={gender === "neutral" ? "default" : "outline"}
                onClick={() => setGender("neutral")}
                className="flex-1 h-12"
              >
                Neutro
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold">
              Apariencia
            </Label>
            <div className="grid grid-cols-5 gap-4">
              {avatars.map((av) => (
                <button
                  key={av.id}
                  onClick={() => setAvatar(av.id)}
                  className={`
                    aspect-square rounded-xl text-5xl flex items-center justify-center
                    transition-all duration-300 hover:scale-110
                    ${avatar === av.id 
                      ? "ring-4 ring-primary bg-primary/10 scale-110" 
                      : "bg-muted hover:bg-muted/80"
                    }
                  `}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/seleccionar-universo")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Atrás
          </Button>
          
          <Button
            size="lg"
            onClick={handleContinue}
            className="bg-gradient-magic text-white hover:opacity-90 transition-all shadow-float"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Protagonist;
