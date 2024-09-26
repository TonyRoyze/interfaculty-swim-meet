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
