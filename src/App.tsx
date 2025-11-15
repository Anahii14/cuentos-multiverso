import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoryProvider } from "./contexts/StoryContext";
import Welcome from "./pages/Welcome";
import SelectUniverse from "./pages/SelectUniverse";
import Protagonist from "./pages/Protagonist";
import SelectPet from "./pages/SelectPet";
import SelectPlot from "./pages/SelectPlot";
import SelectStyle from "./pages/SelectStyle";
import Generating from "./pages/Generating";
import Story from "./pages/Story";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoryProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/seleccionar-universo" element={<SelectUniverse />} />
            <Route path="/protagonista" element={<Protagonist />} />
            <Route path="/mascota" element={<SelectPet />} />
            <Route path="/trama" element={<SelectPlot />} />
            <Route path="/estilo" element={<SelectStyle />} />
            <Route path="/generando" element={<Generating />} />
            <Route path="/cuento" element={<Story />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </StoryProvider>
  </QueryClientProvider>
);

export default App;
