import { IResearchData } from "./iResearchData";
import { TECHNOLOGIES } from "./technologyData";

export const RESEARCHES: IResearchData[] = [
  {
    id: "m",
    name: "Metallurgist",
    description: "Unlock Metallurgists",
    price: 100,
    unitsToUnlock: ["A", "a", "w", "W", "4", "5"],
    researchToUnlock: ["p", "s1", "n", "s", "x", "M", "P"],
    max: 1,
    type: [TECHNOLOGIES.MilitaryEngineering],
    technologiesToUnlock: ["e", TECHNOLOGIES.CivilEngineering.id]
  },
  {
    id: "p",
    name: "Physics",
    description: "Unlock Physics Technology",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Physics],
    researchToUnlock: ["c", "E"],
    technologiesToUnlock: ["p"]
  },
  {
    id: "c",
    name: "Computing",
    description: "Unlock Computing Technology",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Computing],
    technologiesToUnlock: ["c"]
  },
  {
    id: "n",
    name: "Naval Logistics",
    description: "Unlock Naval Capacity Technology",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Computing],
    technologiesToUnlock: ["n"],
    researchToUnlock: ["b"]
  },
  {
    id: "s",
    name: "Searching",
    description: "Unlock Searchers",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Search],
    unitsToUnlock: ["r", "R", "6"],
    technologiesToUnlock: ["r"],
    researchToUnlock: ["r1"]
  },
  {
    id: "P",
    name: "Propulsion",
    description: "Unlock Propulsion",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Propulsion],
    technologiesToUnlock: [TECHNOLOGIES.Propulsion.id]
  },
  {
    id: "x",
    name: "Robotics",
    description: "Unlock Replicators",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Robotics],
    unitsToUnlock: ["x", "X", "7"],
    technologiesToUnlock: [TECHNOLOGIES.Robotics.id]
  },
  {
    id: "M",
    name: "Materials",
    description: "Unlock Materials Technology",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Materials],
    technologiesToUnlock: ["m"]
  },
  {
    id: "E",
    name: "Energy",
    description: "Unlock Energy Technology",
    price: 100,
    max: 1,
    type: [TECHNOLOGIES.Energy],
    technologiesToUnlock: [TECHNOLOGIES.Energy.id]
  },
  {
    id: "r1",
    name: "Optimistic zone",
    description: "Search 1",
    price: 100,
    type: [TECHNOLOGIES.Search],
    researchToUnlock: ["r2", "r3"],
    battleMulti: [{ materialId: "j", multi: 0.5 }]
  },
  {
    id: "r2",
    name: "Conservative zone",
    description: "Search 2",
    price: 100,
    type: [TECHNOLOGIES.Search],
    battleMulti: [{ materialId: "j", multi: 1 }]
  },
  {
    id: "r3",
    name: "Astrogeology",
    description: "Astrogeology",
    price: 100,
    type: [TECHNOLOGIES.Search],
    researchToUnlock: ["r4", "r5"],
    battleMulti: [
      { materialId: "P", multi: 0.5 },
      { materialId: "k", multi: 0.5 }
    ]
  },
  {
    id: "r4",
    name: "Asteroid Mining",
    description: "Asteroid Mining",
    price: 100,
    type: [TECHNOLOGIES.Search],
    battleMulti: [{ materialId: "P", multi: 1 }]
  },
  {
    id: "r5",
    name: "Renewable energy",
    description: "Renewable energy",
    price: 100,
    type: [TECHNOLOGIES.Search],
    battleMulti: [{ materialId: "k", multi: 1 }]
  },
  {
    id: "b",
    name: "Nuke",
    description: "Nuke",
    price: 100,
    type: [TECHNOLOGIES.MilitaryEngineering],
    unitsToUnlock: ["b", "B", "10", "11"]
  }
];
