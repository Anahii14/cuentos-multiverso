import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStory, Style } from "@/contexts/StoryContext";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const styles = [
  {
    id: "sweet" as Style,
    title: "Tierno",
    emoji: "🥰",
    description: "Dulce, amoroso y lleno de momentos entrañables",
    color: "bg-pink-100 hover:bg-pink-200 text-pink-900",
    borderColor: "border-pink-300",
  },
  {
    id: "adventure" as Style,
    title: "Aventura",
    emoji: "⚔️",
    description: "Emocionante, valiente y lleno de acción",
    color: "bg-orange-100 hover:bg-orange-200 text-orange-900",
    borderColor: "border-orange-300",
  },
  {
    id: "funny" as Style,
    title: "Divertido",
    emoji: "😄",
    description: "Gracioso, alegre y con muchas risas",
    color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-900",
    borderColor: "border-yellow-300",
  },
  {
    id: "epic" as Style,
    title: "Épico",
    emoji: "🏆",
    description: "Grandioso, heroico y memorable",
    color: "bg-purple-100 hover:bg-purple-200 text-purple-900",
    borderColor: "border-purple-300",
  },
  {
    id: "mysterious" as Style,
    title: "Misterioso",
    emoji: "🔮",
    description: "Intrigante, enigmático y sorprendente",
    color: "bg-indigo-100 hover:bg-indigo-200 text-indigo-900",
    borderColor: "border-indigo-300",
  },
  {
    id: "educational" as Style,
    title: "Educativo",
    emoji: "📚",
    description: "Instructivo, aprendiendo mientras te diviertes",
    color: "bg-green-100 hover:bg-green-200 text-green-900",
    borderColor: "border-green-300",
  },
];

const SelectStyle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storyData, updateStoryData } = useStory();
  
  const [selected, setSelected] = useState<Style | null>(storyData.style);

  const handleContinue = () => {
    if (!selected) {
      toast({
        title: "¡Espera!",
        description: "Por favor selecciona el estilo de tu cuento",
        variant: "destructive",
      });
      return;
    }

    updateStoryData({ style: selected });
    navigate("/generando");
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Estilo del <span className="bg-gradient-magic bg-clip-text text-transparent">Cuento</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            ¿Cómo quieres que sea tu historia?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {styles.map((style, index) => {
            const isSelected = selected === style.id;
            
            return (
              <Card
                key={style.id}
                onClick={() => setSelected(style.id)}
                className={`
                  cursor-pointer transition-all duration-300 p-6 space-y-3
                  hover:shadow-float hover:-translate-y-1
                  ${isSelected ? "ring-4 ring-primary shadow-float scale-105" : "hover:shadow-card"}
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    text-5xl p-3 rounded-xl ${style.color} border-2 ${style.borderColor}
                    ${isSelected ? "animate-float" : ""}
                  `}>
                    {style.emoji}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {style.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {style.description}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="text-primary font-semibold animate-fade-in flex items-center gap-2">
                    <span>Estilo seleccionado</span>
                    <span className="text-xl">✨</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/trama")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Atrás
          </Button>
          
          <Button
            size="lg"
            onClick={handleContinue}
            className="bg-gradient-magic text-white hover:opacity-90 transition-all shadow-float"
          >
            ¡Crear mi Cuento!
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectStyle;
