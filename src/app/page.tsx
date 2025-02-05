"use client"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventLeaderboard } from "@/components/eventLeaderboard";
import Header from "@/components/header";
import { EventSelector } from "@/components/eventselector";
import { supabase } from "@/lib/supabase";
import { EVENTS, FACULTY_OPTIONS } from "@/types/constants";
import { Points, Event } from "@/types/events";


export default function Home() {
    const [selectedEvent, setSelectedEvent] = useState("25free");
    const [menPoint, setMenPoints] = useState<Points[]>([]);
    const [womenPoints, setWomenPoints] = useState<Points[]>([]);
    const [eventPoints, setEventPoints] = useState<Points[]>([]);
    const [overallPoints, setOverallPoints] = useState<Points[]>([]);
    const [menResults, setMenResults] = useState<Event[]>([]);
    const [womenResults, setWomenResults] = useState<Event[]>([]);
    const [allResults, setAllResults] = useState<Event[]>([]);

    const fetchData = async () => {

        const { data, error } = await supabase
            .from('swims')
            .select('*')
            .order('time', { ascending: true });

        if (error) {
            console.error('Error fetching data:', error)
            return
        }

        const sortedData = [...data].sort((a, b) => {
            if (!a.time) return 1
            if (!b.time) return -1
            const timeA = a.time.split(":").reduce((acc: number, time: string) => acc * 60 + Number.parseFloat(time), 0)
            const timeB = b.time.split(":").reduce((acc: number, time: string) => acc * 60 + Number.parseFloat(time), 0)
            return timeA - timeB
        })
        setAllResults(sortedData);

        const menEventId = EVENTS.find((event) => event.key === `M${selectedEvent}`)?.id;
        const womenEventId = EVENTS.find((event) => event.key === `W${selectedEvent}`)?.id;


        const facultyPoints = FACULTY_OPTIONS.map(faculty => ({
            name: faculty.key,
            points: sortedData
                .filter(item => item.faculty_id === faculty.id)
                .reduce((sum, item) => sum + (item.points || 0), 0)
        })).sort((a, b) => b.points - a.points);

        setOverallPoints(facultyPoints);

        const menResults = sortedData.filter(item => item.event_id === menEventId);
        setMenResults(menResults);
        const womenResults = sortedData.filter(item => item.event_id === womenEventId);
        setWomenResults(womenResults);
    }


    useEffect(() => {
        fetchData();
    }, [selectedEvent]);

    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 gap-4 overflow-auto p-4">
                <div className="flex w-full max-w-3xl h-fit flex-col rounded-xl bg-muted/50 p-4">
                    <EventSelector selectedEvent={selectedEvent} onEventSelect={setSelectedEvent} />
                    <Tabs defaultValue="men" className="relative">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="men">
                            <EventLeaderboard
                                selectedEvent={selectedEvent}

                                results={menResults}
                                allResults={allResults}
                                setResults={setMenResults}
                            // setEventPoints={setEventPoints}
                            // overallPoints={overallPoints}
                            // setOverallPoints={setOverallPoints}
                            />
                        </TabsContent>
                        <TabsContent value="women">
                            <EventLeaderboard
                                selectedEvent={selectedEvent}
                                results={womenResults}
                                allResults={allResults}
                                setResults={setMenResults}
                            // setEventPoints={setEventPoints}
                            // overallPoints={overallPoints}
                            // setOverallPoints={setOverallPoints}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}

