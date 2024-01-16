import creche1 from "../../assets/creche1.jpeg";
import creche2 from "../../assets/creche2.jpeg";

const fakeNurseries = [
  {
    id: 1,
    name: "Crèche Picoti",
    adress: "31 Rue du Pradas Merignac",
    picture_url: creche1,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    outdoor_space: true,
    homemade_meals: false,
    developmental_activities: false,
    musical_activities: false,
  },
  {
    id: 2,
    name: "Crèche Picota",
    adress: "31 Rue du Pradas Merignac",

    picture_url: creche1,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    outdoor_space: true,
    homemade_meals: false,
    developmental_activities: true,
    musical_activities: false,
  },
  {
    id: 3,
    name: "Crèche Les Ptits Loups",
    adress: "31 Rue du Pradas Merignac",

    picture_url: creche2,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    outdoor_space: false,
    homemade_meals: true,
    developmental_activities: false,
    musical_activities: true,
  },
  {
    id: 4,
    name: "Crèche Au Berceau",
    adress: "31 Rue du Pradas Merignac",

    picture_url: creche2,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    outdoor_space: true,
    homemade_meals: true,
    developmental_activities: true,
    musical_activities: true,
  },
  {
    id: 5,
    name: "Crèche Pilou Nursery",
    adress: "31 Rue du Pradas Merignac",

    picture_url: creche2,
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet",
    outdoor_space: false,
    homemade_meals: true,
    developmental_activities: true,
    musical_activities: true,
  },
];

export default fakeNurseries;
