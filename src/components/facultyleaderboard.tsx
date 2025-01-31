"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { EVENTS } from "@/types/constants";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Event } from "@/types/events";
import { resultdata } from "@/constants";

interface Faculty {
    faculty_id: number;
    sum: {
        points: number;
    }[];
}

interface FacultyLeaderboardProps {
    type: 'overall' | 'men' | 'women';
    leaderboard: 'event' | 'overall'
    selectedEvent: string
}

const calculatePoints = (sortedData: Event[]): Event[] => {
    // Check if event is relay by looking at the first event's event_id
    const isRelay = sortedData[0]?.event_id ?
        EVENTS.find(e => e.id === sortedData[0].event_id)?.key.toLowerCase().includes('relay') :
        false;

    const pointsArray = isRelay ? [10, 7, 5, 4, 3, 2, 1] : [7, 5, 4, 3, 2, 1]

    const timeGroups: { [key: string]: Event[] } = {}
    sortedData.forEach(event => {
        if (!timeGroups[event.time]) {
            timeGroups[event.time] = []
        }
        timeGroups[event.time].push(event)
    })

    let currentIndex = 0
    return sortedData.map(item => {
        const sameTimeEvents = timeGroups[item.time]
        if (sameTimeEvents.length > 1) {
            // Calculate average points for tied positions
            const startIndex = currentIndex
            const endIndex = currentIndex + sameTimeEvents.length - 1
            let totalPoints = 0

            // Sum up points for the positions
            for (let i = startIndex; i <= endIndex && i < pointsArray.length; i++) {
                totalPoints += pointsArray[i] || 0
            }

            // Calculate average points
            const averagePoints = totalPoints / sameTimeEvents.length

            if (sameTimeEvents[sameTimeEvents.length - 1] === item) {
                currentIndex += sameTimeEvents.length
            }

            return {
                ...item,
                points: averagePoints
            }
        } else {
            const points = currentIndex < pointsArray.length ? pointsArray[currentIndex] : 0
            currentIndex++
            return {
                ...item,
                points
            }
        }
    })
}

export function FacultyLeaderboard({ type, leaderboard, selectedEvent }: FacultyLeaderboardProps) {

    const [results, setResults] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const eventId = type == 'men'
                ? EVENTS.find((event) => event.key === `M${selectedEvent}`)?.id
                : EVENTS.find((event) => event.key === `W${selectedEvent}`)?.id;

            if (leaderboard === 'overall') {
                const { data, error } = await supabase
                    .rpc('get_total_points');

                if (error) {
                    console.error('Error fetching data:', error)
                    return
                }

                setResults(data)
                console.log("Leaderboard Data", data)
            }
            else {
                const { data, error } = await supabase
                    .rpc(`get_total_points({event_id: ${eventId}})`);

                if (error) {
                    console.error('Error fetching data:', error)
                    return
                }

                setResults(data)
                console.log("Leaderboard Data", data)
            }
        }
        fetchData()
    }, [selectedEvent, type])

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-3 text-xs md:text-sm md:px-4" > Rank </TableHead>
                    < TableHead className="px-3 text-xs md:text-sm md:px-4" > Faculty </TableHead>
                    < TableHead className="px-3 text-xs md:text-sm md:px-4" > Points </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    results.map((faculty, index) => (
                        <TableRow key={index} >
                            <TableCell className="px-3 text-xs flex justify-center md:justify-start md:text-sm md:px-6" > {index + 1} </TableCell>
                            < TableCell className="px-3 md:px-4" >
                                <Badge variant="secondary" className="text-xs md:text-sm" >
                                    {faculty.name}
                                </Badge>
                            </TableCell>
                            < TableCell className="px-3 text-xs md:text-sm md:px-4" > {faculty.total_points} </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}
