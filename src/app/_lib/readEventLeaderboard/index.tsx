import { log } from "console";

interface EventLeaderboardProps {
  type: "men" | "women";
  event: string;
}

const data = {
  events: {
    W25free: [
      {
        faculty: "FIM",
        name: "Tamia",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Stefanie",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Jaunita",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Alfreda",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Pearline",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Alycia",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Lelah",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Vita",
        time: "48.03",
      },
    ],
    W50free: [
      {
        faculty: "FOM",
        name: "Marcia",
        time: "47.71",
      },
      {
        faculty: "FON",
        name: "Jailyn",
        time: "47.73",
      },
      {
        faculty: "FOS",
        name: "Sheila",
        time: "47.77",
      },
      {
        faculty: "FOT",
        name: "Kiana",
        time: "47.83",
      },
      {
        faculty: "FIM",
        name: "Ashlynn",
        time: "47.89",
      },
      {
        faculty: "FMF",
        name: "Elsie",
        time: "47.97",
      },
      {
        faculty: "FOA",
        name: "Shany",
        time: "48.00",
      },
      {
        faculty: "FOL",
        name: "Amie",
        time: "48.03",
      },
    ],
    W100free: [],
    W25back: [],
    W50back: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W100back: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W25breast: [
      {
        faculty: "FIM",
        name: "Angelica McClure",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Angelica McClure",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jude Shah",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kori Guzman",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W50breast: [
      {
        faculty: "FIM",
        name: "Angelica McClure",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Angelica McClure",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jude Shah",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kori Guzman",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W100breast: [
      {
        faculty: "FIM",
        name: "Angelica McClure",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Angelica McClure",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jude Shah",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kori Guzman",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W25fly: [
      {
        faculty: "FIM",
        name: "Angelica McClure",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Angelica McClure",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jude Shah",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kori Guzman",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W50fly: [
      {
        faculty: "FIM",
        name: "Angelica McClure",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Angelica McClure",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jude Shah",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kori Guzman",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W100fly: [
      {
        faculty: "FIM",
        name: "Angelica McClure",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Angelica McClure",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jude Shah",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kori Guzman",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    W100IM: [
      {
        faculty: "FIM",
        name: "Angelica McClure",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Angelica McClure",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jude Shah",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kori Guzman",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    Wfreerelay: [
      {
        faculty: "FMF",
        time: "03:20.23",
      },
      {
        faculty: "FOA",
        time: "03:20.66",
      },
      {
        faculty: "FOM",
        time: "03:44.28",
      },
      {
        faculty: "FOT",
        time: "03:59.26",
      },
      {
        faculty: "FOS",
        time: "04:41.17",
      },
      {
        faculty: "FON",
        time: "04:51.17",
      },
    ],
    Wmedleyrelay: [
      {
        faculty: "FMF",
        time: "03:20.23",
      },
      {
        faculty: "FOA",
        time: "03:20.66",
      },
      {
        faculty: "FOM",
        time: "03:44.28",
      },
      {
        faculty: "FOT",
        time: "03:59.26",
      },
      {
        faculty: "FOS",
        time: "04:41.17",
      },
      {
        faculty: "FON",
        time: "04:51.17",
      },
    ],
    M25free: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M50free: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M100free: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M25back: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M50back: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M100back: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M25breast: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M50breast: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M100breast: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M25fly: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M50fly: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M100fly: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    M100IM: [
      {
        faculty: "FIM",
        name: "Kori Guzman",
        time: "47.71",
      },
      {
        faculty: "FMF",
        name: "Jude Shah",
        time: "47.73",
      },
      {
        faculty: "FOA",
        name: "Angelica McClure",
        time: "47.77",
      },
      {
        faculty: "FOL",
        name: "Reese Gill",
        time: "47.83",
      },
      {
        faculty: "FOM",
        name: "Jordan Castillo",
        time: "47.89",
      },
      {
        faculty: "FON",
        name: "Kai Herrera",
        time: "47.97",
      },
      {
        faculty: "FOS",
        name: "Mathias Humphrey",
        time: "48.00",
      },
      {
        faculty: "FOT",
        name: "Journi Flores",
        time: "48.03",
      },
    ],
    Mfreerelay: [
      {
        faculty: "FMF",
        time: "03:20.23",
      },
      {
        faculty: "FOA",
        time: "03:20.66",
      },
      {
        faculty: "FOM",
        time: "03:44.28",
      },
      {
        faculty: "FOT",
        time: "03:59.26",
      },
      {
        faculty: "FOS",
        time: "04:41.17",
      },
      {
        faculty: "FON",
        time: "04:51.17",
      },
    ],
    Mmedleyrelay: [
      {
        faculty: "FMF",
        time: "03:20.23",
      },
      {
        faculty: "FOA",
        time: "03:20.66",
      },
      {
        faculty: "FOM",
        time: "03:44.28",
      },
      {
        faculty: "FOT",
        time: "03:59.26",
      },
      {
        faculty: "FOS",
        time: "04:41.17",
      },
      {
        faculty: "FON",
        time: "04:51.17",
      },
    ],
  },
};

type EventKeys =
  | "W25free"
  | "W50free"
  | "W100free"
  | "W25back"
  | "W50back"
  | "W100back"
  | "W25breast"
  | "W50breast"
  | "W100breast"
  | "W25fly"
  | "W50fly"
  | "W100fly"
  | "W100IM"
  | "Wfreerelay"
  | "Wmedleyrelay"
  | "M25free"
  | "M50free"
  | "M100free"
  | "M25back"
  | "M50back"
  | "M100back"
  | "M25breast"
  | "M50breast"
  | "M100breast"
  | "M25fly"
  | "M50fly"
  | "M100fly"
  | "M100IM"
  | "Mfreerelay"
  | "Mmedleyrelay";

export const fetchEventLeaderboardData = async ({
  type,
  event = "100free",
}: EventLeaderboardProps) => {
  const eventKey =
    type === "men" ? (`M${event}` as EventKeys) : (`W${event}` as EventKeys);
  const result = data.events[eventKey];
  console.log(result);

  return result;
};

// export const fetchEventLeaderboardData = async ({
//   type,
//   event = "100free",
// }: EventLeaderboardProps) => {
//   try {
//     const url = `https://script.google.com/macros/s/AKfycbxGneTdRxUksYri3plBFoCSGOWW46V6v4po634ylEx7AQEd2H0TWJzlbXdgPPRaizx8/exec?timestamp=${new Date().getTime()}`; // Added timestamp
//     const res = await fetch(url, { next: { revalidate: 300 } });

//     const { events } = await res.json();

//     return type === "men" ? events[`M${event}`] : events[`W${event}`];
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// };

// export const fetchEventLeaderboardData = async ({ type, event = "100free" }: EventLeaderboardProps) => {
//     try {
//     superbase.init('https://superbase.io/api/v1/1c5c0f0c-d0a2-4d3c-b4f6-c2a0e8c8d1d2');
//     const res = await superbase.get(`/events/${type}/${event}`);
//     return res.data;
//     }
//     catch (error) {
//         console.error('Error fetching data:', error);
//         return [];
//     }
// }
