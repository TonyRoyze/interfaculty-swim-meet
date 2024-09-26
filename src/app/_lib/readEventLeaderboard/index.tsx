import { data } from "@/constants";

interface EventLeaderboardProps {
  type: "men" | "women";
  event: string;
}

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
