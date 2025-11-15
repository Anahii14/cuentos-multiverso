import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useStory, Universe } from "@/contexts/StoryContext";
import { Flame, Footprints, Rocket, Clock, Globe, Wand2, ArrowRight } from "lucide-react";

const universes = [
  {
    id: "dragons" as Universe,
    title: "Reino de Dragones",
    description: "Vuela con dragones mágicos en tierras lejanas",
    icon: Flame,
    gradient: "from-red-500 to-orange-500",
  },
  {
    id: "dinosaurs" as Universe,
    title: "Era de Dinosaurios",
    description: "Explora la prehistoria con dinosaurios gigantes",
    icon: Footprints,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "future" as Universe,
    title: "Futuro Tecnológico",
    description: "Aventuras en ciudades del futuro con robots",
    icon: Rocket,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "time-travel" as Universe,
    title: "Viajes en el Tiempo",
    description: "Viaja al pasado y al futuro en una máquina del tiempo",
    icon: Clock,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "space" as Universe,
    title: "Espacio Exterior",
    description: "Explora planetas y estrellas en el universo",
    icon: Globe,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: "magic" as Universe,
    title: "Mundo Mágico",
    description: "Hechizos, pociones y criaturas fantásticas",
    icon: Wand2,
    gradient: "from-violet-500 to-fuchsia-500",
  },
];

const SelectUniverse = () => {
  const navigate = useNavigate();
  const { storyData, updateStoryData } = useStory();
  const [selected, setSelected] = useState<Universe | null>(storyData.universe);

  const handleSelect = (universe: Universe) => {
    setSelected(universe);
  };

  const handleContinue = () => {
    if (selected) {
      updateStoryData({ universe: selected });
      navigate("/protagonista");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Elige tu <span className="bg-gradient-magic bg-clip-text text-transparent">Universo</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            ¿En qué mundo quieres vivir tu aventura?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {universes.map((universe, index) => {
            const Icon = universe.icon;
            const isSelected = selected === universe.id;
            
            return (
              <Card
                key={universe.id}
                onClick={() => handleSelect(universe.id)}
                className={`
                  cursor-pointer transition-all duration-300 p-6 space-y-4
                  hover:shadow-float hover:-translate-y-1
                  ${isSelected ? "ring-4 ring-primary shadow-float scale-105" : "hover:shadow-card"}
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`
                  w-16 h-16 rounded-full bg-gradient-to-br ${universe.gradient}
                  flex items-center justify-center
                  ${isSelected ? "animate-float" : ""}
                `}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {universe.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {universe.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="flex items-center gap-2 text-primary font-semibold animate-fade-in">
                    <span className="text-sm">Seleccionado</span>
                    <span className="text-xl">✨</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selected}
            className="bg-gradient-magic text-white hover:opacity-90 transition-all shadow-float px-8"
          >
            Continuar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectUniverse;
