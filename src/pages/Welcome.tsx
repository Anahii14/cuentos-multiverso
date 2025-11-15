import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Sparkles className="w-20 h-20 text-primary animate-float" />
              <Sparkles className="w-12 h-12 text-secondary absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-magic bg-clip-text text-transparent">
            Cuentos Multiverso
          </h1>
          
          <p className="text-xl md:text-2xl text-foreground/80">
            ¡Crea tu propia aventura mágica!
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Selecciona tu universo favorito, crea tu personaje único y deja que la magia de la inteligencia artificial 
            escriba un cuento especialmente para ti.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/seleccionar-universo")}
            className="bg-gradient-magic text-white hover:opacity-90 transition-all shadow-float text-lg px-8 py-6"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Comenzar Aventura
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => {/* Modal de cómo funciona */}}
            className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            ¿Cómo funciona?
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">1️⃣</span>
            </div>
            <p className="text-sm text-muted-foreground">Elige tu mundo</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">2️⃣</span>
            </div>
            <p className="text-sm text-muted-foreground">Crea tu héroe</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">3️⃣</span>
            </div>
            <p className="text-sm text-muted-foreground">¡Lee tu cuento!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
