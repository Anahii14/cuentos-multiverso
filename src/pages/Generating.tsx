import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Wand2 } from "lucide-react";
import { useStory } from "@/contexts/StoryContext";

const Generating = () => {
  const navigate = useNavigate();
  const { storyData } = useStory();

  useEffect(() => {
    // Aquí se integrará la llamada real a la IA
    // Por ahora simulamos con un timeout
    const timer = setTimeout(() => {
      navigate("/cuento");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const magicPhrases = [
    "La magia está creando tu historia...",
    "Los personajes cobran vida...",
    "Tejiendo las palabras perfectas...",
    "Dando forma a tu aventura...",
    "Preparando la magia narrativa...",
  ];

  return (
    <div className="min-h-screen bg-gradient-magic flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-center relative">
            <Wand2 className="w-24 h-24 text-white animate-float" />
            <Sparkles className="w-16 h-16 text-yellow-300 absolute top-0 right-1/3 animate-pulse" />
            <Sparkles className="w-12 h-12 text-yellow-200 absolute bottom-0 left-1/3 animate-pulse delay-300" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Creando tu Cuento Mágico
          </h1>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-300 to-white animate-shimmer" 
                   style={{ 
                     width: '100%',
                     backgroundSize: '200% 100%',
                   }} 
              />
            </div>
            
            <p className="text-xl text-white/90 animate-pulse">
              {magicPhrases[Math.floor(Math.random() * magicPhrases.length)]}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-3">
            <p className="text-white/80 text-sm">
              <span className="font-semibold">Universo:</span> {storyData.universe}
            </p>
            <p className="text-white/80 text-sm">
              <span className="font-semibold">Protagonista:</span> {storyData.characterName}
            </p>
            <p className="text-white/80 text-sm">
              <span className="font-semibold">Mascota:</span> {storyData.petName}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default Generating;
