import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStory, Plot } from "@/contexts/StoryContext";
import { ArrowRight, ArrowLeft, Gem, Search, Rocket, Heart, Clock, Book, Waves, Cloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plots = [
  {
    id: "treasure" as Plot,
    title: "Buscar un Tesoro",
    description: "Encuentra un tesoro escondido siguiendo un mapa misterioso",
    icon: Gem,
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "mystery" as Plot,
    title: "Resolver un Misterio",
    description: "Descubre pistas y resuelve un enigma intrigante",
    icon: Search,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "space-mission" as Plot,
    title: "Misión Espacial",
    description: "Viaja al espacio en una importante misión galáctica",
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "save-village" as Plot,
    title: "Salvar un Pueblo",
    description: "Ayuda a salvar tu pueblo de un gran peligro",
    icon: Heart,
    gradient: "from-red-500 to-pink-500",
  },
  {
    id: "time-travel" as Plot,
    title: "Viaje en el Tiempo",
    description: "Viaja al pasado o futuro para cambiar la historia",
    icon: Clock,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "magic-school" as Plot,
    title: "Escuela de Magia",
    description: "Aprende hechizos y pociones en una academia mágica",
    icon: Book,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: "underwater" as Plot,
    title: "Aventura Submarina",
    description: "Explora las profundidades del océano",
    icon: Waves,
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    id: "sky-adventure" as Plot,
    title: "Aventura en el Cielo",
    description: "Vuela por encima de las nubes en una gran aventura",
    icon: Cloud,
    gradient: "from-sky-500 to-blue-500",
  },
];

const SelectPlot = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { storyData, updateStoryData } = useStory();
  
  const [selected, setSelected] = useState<Plot | null>(storyData.plot);

  const handleContinue = () => {
    if (!selected) {
      toast({
        title: "¡Espera!",
        description: "Por favor selecciona una trama para tu aventura",
        variant: "destructive",
      });
      return;
    }

    updateStoryData({ plot: selected });
    navigate("/estilo");
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            La <span className="bg-gradient-space bg-clip-text text-transparent">Trama</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            ¿Qué aventura vivirás?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plots.map((plot, index) => {
            const Icon = plot.icon;
            const isSelected = selected === plot.id;
            
            return (
              <Card
                key={plot.id}
                onClick={() => setSelected(plot.id)}
                className={`
                  cursor-pointer transition-all duration-300 p-5 space-y-3
                  hover:shadow-float hover:-translate-y-1
                  ${isSelected ? "ring-4 ring-accent shadow-float scale-105" : "hover:shadow-card"}
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`
                  w-14 h-14 rounded-full bg-gradient-to-br ${plot.gradient}
                  flex items-center justify-center
                  ${isSelected ? "animate-float" : ""}
                `}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {plot.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {plot.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="text-accent font-semibold animate-fade-in flex items-center gap-1">
                    <span className="text-sm">Seleccionada</span>
                    <span className="text-lg">✨</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/mascota")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Atrás
          </Button>
          
          <Button
            size="lg"
            onClick={handleContinue}
            className="bg-gradient-space text-white hover:opacity-90 transition-all shadow-float"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPlot;
