import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useStory } from "@/contexts/StoryContext";
import { BookOpen, Download, Volume2, RotateCcw } from "lucide-react";

const Story = () => {
  const navigate = useNavigate();
  const { storyData, resetStory } = useStory();

  // Historia de ejemplo (será reemplazada por la generada por IA)
  const exampleStory = `Había una vez en el Reino de los Dragones, un valiente ${storyData.characterGender === "boy" ? "niño" : storyData.characterGender === "girl" ? "niña" : "pequeño aventurero"} llamado ${storyData.characterName} que tenía ${storyData.characterAge} años.

Un día, mientras exploraba las montañas cerca de su casa, encontró a ${storyData.petName}, una pequeña criatura mágica que se convertiría en su mejor amigo.

Juntos, emprendieron una increíble aventura llena de magia, valentía y descubrimientos maravillosos. A través de bosques encantados y ríos brillantes, ${storyData.characterName} y ${storyData.petName} demostraron que la verdadera magia está en la amistad y el coraje.

Y así, nuestros héroes continuaron explorando el mundo, sabiendo que cada día traería nuevas aventuras emocionantes.

FIN`;

  const story = storyData.generatedStory || exampleStory;
  const title = storyData.storyTitle || `La Aventura de ${storyData.characterName}`;

  const handleReadAloud = () => {
    // Implementar text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(story);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDownloadPDF = () => {
    // Implementar generación de PDF
    alert("Función de descarga PDF en desarrollo");
  };

  const handleNewStory = () => {
    resetStory();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex justify-center">
            <BookOpen className="w-16 h-16 text-primary animate-float" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-magic bg-clip-text text-transparent">
            {title}
          </h1>
        </div>

        {storyData.storyImage && (
          <div className="rounded-2xl overflow-hidden shadow-float animate-fade-in">
            <img 
              src={storyData.storyImage} 
              alt={title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        <div className="bg-card rounded-2xl p-8 shadow-card animate-fade-in">
          <div className="prose prose-lg max-w-none">
            {story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleReadAloud}
            className="bg-gradient-space text-white hover:opacity-90 transition-all"
          >
            <Volume2 className="mr-2 h-5 w-5" />
            Leer en Voz Alta
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={handleDownloadPDF}
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Download className="mr-2 h-5 w-5" />
            Descargar PDF
          </Button>
          
          <Button
            size="lg"
            onClick={handleNewStory}
            className="bg-gradient-magic text-white hover:opacity-90 transition-all shadow-float"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Crear Otro Cuento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Story;
