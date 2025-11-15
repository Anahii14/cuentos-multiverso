import { createContext, useContext, useState, ReactNode } from "react";

export type Universe = "dragons" | "dinosaurs" | "future" | "time-travel" | "space" | "magic";
export type Gender = "boy" | "girl" | "neutral";
export type Pet = "baby-dragon" | "dog" | "cat" | "robot" | "mini-dinosaur" | "fairy";
export type Plot = "treasure" | "mystery" | "space-mission" | "save-village" | "time-travel" | "magic-school" | "underwater" | "sky-adventure";
export type Style = "sweet" | "adventure" | "funny" | "epic" | "mysterious" | "educational";

export interface StoryData {
  universe: Universe | null;
  characterName: string;
  characterAge: number;
  characterGender: Gender | null;
  characterAvatar: number;
  petType: Pet | null;
  petName: string;
  plot: Plot | null;
  style: Style | null;
  generatedStory: string | null;
  storyTitle: string | null;
  storyImage: string | null;
}

interface StoryContextType {
  storyData: StoryData;
  updateStoryData: (data: Partial<StoryData>) => void;
  resetStory: () => void;
}

const initialStoryData: StoryData = {
  universe: null,
  characterName: "",
  characterAge: 5,
  characterGender: null,
  characterAvatar: 1,
  petType: null,
  petName: "",
  plot: null,
  style: null,
  generatedStory: null,
  storyTitle: null,
  storyImage: null,
};

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export function StoryProvider({ children }: { children: ReactNode }) {
  const [storyData, setStoryData] = useState<StoryData>(initialStoryData);

  const updateStoryData = (data: Partial<StoryData>) => {
    setStoryData(prev => ({ ...prev, ...data }));
  };

  const resetStory = () => {
    setStoryData(initialStoryData);
  };

  return (
    <StoryContext.Provider value={{ storyData, updateStoryData, resetStory }}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
}
