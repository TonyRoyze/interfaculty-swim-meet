import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchEventLeaderboardData } from "@/app/_lib/readEventLeaderboard";

interface EventLeaderboardProps {
  type: "men" | "women";
  eventName: string;
}

interface Event {
  faculty: string;
  name: string;
  time: string;
}

interface Relay {
  faculty: string;
  time: string;
}

export async function EventLeaderboard({
  type,
  eventName,
}: EventLeaderboardProps) {
  const event = eventName === "" ? eventName.split(" ")[0] : eventName;
  const data: Event[] | Relay[] = await fetchEventLeaderboardData({
    type,
    event,
  });

  const isEvent = Array.isArray(data) && data.length > 0 && "name" in data[0];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="px-2 text-xs md:text-sm md:px-4">
            Rank
          </TableHead>
          <TableHead className="px-2 text-xs md:text-sm md:px-4">
            Faculty
          </TableHead>
          {isEvent && (
            <TableHead className="px-2 text-xs md:text-sm md:px-4">
              Name
            </TableHead>
          )}
          <TableHead className="px-2 text-xs md:text-sm md:px-4">
            Time
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(data) ? ( // Check if data is an array
          data.map((event, index) => (
            <TableRow key={index}>
              <TableCell className="px-3 text-xs flex justify-center md:justify-start md:text-sm md:px-6">
                {index + 1}
              </TableCell>
              <TableCell className="px-2 md:px-4">
                <Badge className="text-xs md:text-sm" variant="secondary">
                  {event.faculty}
                </Badge>
              </TableCell>
              {isEvent && (
                <TableCell className="hidden lg:table-cell px-2 text-xs md:text-sm md:px-4">
                  {(event as Event).name}
                </TableCell>
              )}
              {isEvent && (
                <TableCell className="lg:hidden px-2 text-xs md:text-sm md:px-4">
                  {(event as Event).name.split(" ")[0]}
                </TableCell>
              )}
              <TableCell className="px-2 text-xs md:text-sm md:px-4">
                {event.time}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
