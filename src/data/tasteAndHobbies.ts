// To add a real photo: drop the file in public/assets/hobbies/ and set `image` to its path,
// e.g. image: "/assets/hobbies/my-sketch-01.jpg". Items without `image` render as a
// placeholder tile until a photo is added.

export type HobbyItem = {
  title: string;
  category: "Drawing" | "Photography" | "Behind the Scenes";
  image?: string;
  span?: string; // tailwind col/row span classes for the bento grid
};

export const hobbies: HobbyItem[] = [
  { title: "Pencil Sketch", category: "Drawing", span: "md:col-span-2 md:row-span-2" },
  { title: "Street Photography", category: "Photography" },
  { title: "On-Set Candid", category: "Behind the Scenes" },
  { title: "Digital Illustration", category: "Drawing", span: "md:row-span-2" },
  { title: "Portrait Study", category: "Drawing" },
  { title: "Landscape Shot", category: "Photography", span: "md:col-span-2" },
  { title: "Editing Bay BTS", category: "Behind the Scenes" },
  { title: "Golden Hour", category: "Photography" },
];

export type TasteItem = {
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
};

export type TasteCategory = {
  name: string;
  icon: "film" | "users";
  items: TasteItem[];
};

export const tasteCategories: TasteCategory[] = [
  {
    name: "Favourite Movies",
    icon: "film",
    items: [
      { title: "Interstellar" },
      { title: "Inception" },
      { title: "The Dark Knight" },
      { title: "Whiplash" },
      { title: "3 Idiots" },
      { title: "Spider-Man: Into the Spider-Verse" },
      { title: "Your Name" },
      { title: "Spirited Away" },
      { title: "Big Hero 6" },
    ],
  },
  {
    name: "My Fav Creators",
    icon: "users",
    items: [
      { title: "Peter McKinnon", link: "https://www.youtube.com/@PeterMcKinnon" },
      { title: "Corridor Crew", link: "https://www.youtube.com/@corridorcrew" },
      { title: "Film Riot", link: "https://www.youtube.com/@filmriot" },
      { title: "@cined", link: "https://instagram.com/cined" },
      { title: "@motiondesign", link: "https://instagram.com/motiondesign" },
      { title: "@artstation", link: "https://instagram.com/artstation" },
    ],
  },
];
