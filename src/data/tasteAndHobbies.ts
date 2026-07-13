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
      { title: "Teo Crawford", image: "/assets/mytaste/teo-crawford.jpeg", link: "https://www.youtube.com/@teocrawford" },
      { title: "Ben Marriott", image: "/assets/mytaste/ben-marriott.jpeg", link: "https://www.youtube.com/@BenMarriott" }, 
      { title: "Jackie Droujko", image: "/assets/mytaste/jackie-droujko.jpeg", link: "https://www.youtube.com/@JackieDroujko" },
      { title: "Digital Spaghetti", image: "/assets/mytaste/digital-spaghetti.jpeg", link: "https://www.youtube.com/@digspaghetti" },
      { title: "RG bucket list", image: "/assets/mytaste/rg-bucket-list.jpeg", link: "https://www.youtube.com/@RGBucketList" },
      { title: "Bhuvan Bam", image: "/assets/mytaste/bhuvan-bam.jpeg", link: "https://www.youtube.com/@BBKiVines" },
      { title: "Purav Jha", image: "/assets/mytaste/purav-jha.jpeg", link: "https://www.youtube.com/@puravjha/" },
      { title: "Sankho Kun", image: "/assets/mytaste/sankho-kun.jpeg", link: "https://www.youtube.com/@Sankhokun" },
      { title: "mubikishore", image: "/assets/mytaste/mubikishore.jpeg", link: "https://www.youtube.com/@mubikishore" },
      { title: "Gawx Art", image: "/assets/mytaste/gawx-art.jpeg", link: "https://www.youtube.com/@GawxArt" },
      { title: "Natalie Lynn", image: "/assets/mytaste/natalie-lynn.jpeg", link: "https://www.youtube.com/@nataliexlynn" },
      { title: "KK create", image: "/assets/mytaste/kk-create.jpeg", link: "https://www.youtube.com/@kk.create.original" },
      { title: "Zakir Khan", image: "/assets/mytaste/zakir-khan.jpeg", link: "https://www.instagram.com/zakirkhan_208/" },
      { title: "Agyaat Aadarsh", image: "/assets/mytaste/agyaat-aadarsh.jpeg", link: "https://www.instagram.com/agyaat.aadarsh/" },
      { title: "Varun Mayya", image: "/assets/mytaste/varun-mayya.jpeg", link: "https://www.youtube.com/@varunmayya/" },
      { title: "Tanmay Bhat", image: "/assets/mytaste/tanmay-bhat.jpeg", link: "https://www.youtube.com/@TanmayBhat" },
      
    ],
  },
];
