import { create } from 'zustand';

export type Creator = {
  name: string;
  avatar: string;
  fans: Fan[];
};

export type Fan = {
  name: string;
  avatar: string;
}

interface CreatorsState {
  creators: Creator[];
  setCreators: (n: Creator[]) => void;
}

export const creatorsStore = create<CreatorsState>((set) => ({
  creators: [],
  setCreators: (n: Creator[]) => set(() => ({ creators: n })),
}));