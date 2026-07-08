// To add a real photo: drop the file in public/assets/hobbies/ and set `image` to its path,
// e.g. image: "/assets/hobbies/my-sketch-01.jpeg". Items without `image` render as a
// placeholder tile until a photo is added.

export type HobbyItem = {
  title: string;
  category: "Drawing" | "Photography" | "Behind the Scenes";
  image?: string;
  span?: string; // tailwind col/row span classes for the bento grid
};

export const hobbies: HobbyItem[] = [
  { title: "Pencil Sketch", image: "/assets/hobbies/spider-verse.jpeg", category: "Drawing", span: "md:col-span-2 md:row-span-2" },
  { title: "Brainstorming", image: "/assets/hobbies/thinking.jpeg", category: "Drawing", span: "md:row-span-3" },
  { title: "On-Set Candid", image: "/assets/hobbies/painting.jpeg", category: "Behind the Scenes" },
  { title: "cricket", image: "/assets/hobbies/cricket.jpeg", category: "Drawing" },
  { title: "Landscape Shot", image: "/assets/hobbies/landscape.jpeg", category: "Photography", span: "md:col-span-2" },
  { title: "Editing Bay BTS", image: "/assets/hobbies/editing.jpeg", category: "Behind the Scenes" },
  { title: "Jiraya Sensie", image: "/assets/hobbies/jiraya-sensie.jpeg", category: "Drawing", span: "md:col-span-2 md:row-span-2" },
  // { title: "Lion Sketch", image: "/assets/hobbies/lion-sketch.jpeg", category: "Drawing", span: "md:row-span-2" },
  // { title: "Water Boat", image: "/assets/hobbies/portrait.jpeg", category: "Drawing", span: "md:row-span-2" },
  { title: "People", image: "/assets/hobbies/people.jpeg", category: "Photography", span: "md:col-span-2 md:row-span-2" },
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
  aspectRatio: "2/3" | "4/3";
  items: TasteItem[];
};

export const tasteCategories: TasteCategory[] = [
  {
    name: "Favourite Movies",
    icon: "film",
    aspectRatio: "2/3",
    items: [
      { title: "Lunchbox", image: "/assets/mytaste/lunchbox.jpeg" },
      { title: "Inception", image: "/assets/mytaste/inception.jpeg" },
      { title: "Django Unchained", image: "/assets/mytaste/django-unchained.jpeg" },
      { title: "Sherlock Holmes", image: "/assets/mytaste/sherlock-holmes.jpeg" },
      { title: "Oppenheimer", image: "/assets/mytaste/oppenheimer.jpeg" },
      { title: "Mad Max Fury Road", image: "/assets/mytaste/mad-max-fury-road.jpeg" },
      { title: "The Batman", image: "/assets/mytaste/the-batman.jpeg" },
      { title: "The Dark Knight", image: "/assets/mytaste/the-dark-knight.jpeg" },
      { title: "Spider-Man No way home", image: "/assets/mytaste/spider-man.jpeg" },
      { title: "Spider-Man: Into the Spider-Verse", image: "/assets/mytaste/spider-verse.jpeg"  },
      { title: "Spider-Man: Across the Spider-Verse", image: "/assets/mytaste/across-verse.jpeg" },
      { title: "Klaus", image: "/assets/mytaste/klaus.jpeg" },
      { title: "Bhavesh Joshi", image: "/assets/mytaste/bhavesh-joshi.jpeg" },
      { title: "Detective Byomkesh Bakshy", image: "/assets/mytaste/detective-byomkesh-bakshy.jpeg" },
      { title: "Big Hero 6" , image: "/assets/mytaste/big-hero-6.jpeg" },
      { title: "Krishna aur Kans" , image: "/assets/mytaste/krishna-aur-kans.jpeg" },
    ],
  },
  {
    name: "My Fav Creators",
    icon: "users",
    aspectRatio: "4/3",
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
