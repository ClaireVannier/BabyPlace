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
    capacity: 10,
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
    capacity: 15,
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
    capacity: 20,
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
    capacity: 30,
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
    capacity: 15,
  },
];

const fakeParents = [
  {
    id: 1,
    firstname: "John",
    lastname: "lastname",
    tel: "000000000",
    children: [
      {
        id: 1,
        firstname: "children 1",
        birthDate: "2015-10-01",
        isWalking: false,
        doctor: "je sais pas",
        allergies: "gluten, lactoz",
      },
      {
        id: 6,
        firstname: "children 2",
        birthDate: "2013-10-09",
        isWalking: false,
        doctor: "Tremblais",
        allergies: "gluten, lactoz & co",
      },
    ],
  },
];
const exports = {
  fakeNurseries,
  fakeParents,
};
export default exports;
