'use client'
import { useEffect, useState } from "react"
import { FacultyLeaderboard } from "@/components/facultyleaderboard2"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventLeaderboard } from "@/components/eventLeaderboard2"
import { EventSelector } from "@/components/eventselector"
import Header from "@/components/header"
import { FACULTY_OPTIONS } from "@/types/constants"
import { supabase } from "@/lib/supabase"



export default function Home() {
    const [selectedEvent, setSelectedEvent] = useState("25free")
    const [points, setPoints] = useState<any[]>([]);
    const [overallPoints, setOverallPoints] = useState<any[]>([]);

    const fetchData = async () => {

        const { data, error } = await supabase
            .from('swims')
            .select('*')

        if (error) {
            console.error('Error fetching data:', error)
            return
        }

        const facultyPoints = FACULTY_OPTIONS.map(faculty => ({
            name: faculty.key,
            points: data
                .filter(item => item.faculty_id === faculty.id)
                .reduce((sum, item) => sum + (item.points || 0), 0)
        })).sort((a, b) => b.points - a.points);

        console.log("Fetched faculty points", facultyPoints)

        setOverallPoints(facultyPoints)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="flex flex-col">
            <Header />
            <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex h-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                    <EventSelector selectedEvent={selectedEvent} onEventSelect={setSelectedEvent} />
                    <Tabs defaultValue="men" className="relative">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="men">
                            <EventLeaderboard
                                selectedEvent={selectedEvent}
                                type="men"
                                setPoints={setPoints}
                            />
                        </TabsContent>
                        <TabsContent value="women">
                            <EventLeaderboard
                                selectedEvent={selectedEvent}
                                type="women"
                                setPoints={setPoints}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="flex h-fit flex-col rounded-xl bg-muted/50 p-4">
                    <Tabs defaultValue="event">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="overall">Overall</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="event">Event</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overall">
                            <FacultyLeaderboard leaderboard="event" selectedEvent={selectedEvent} data={overallPoints} />
                        </TabsContent>
                        <TabsContent value="event">
                            <FacultyLeaderboard leaderboard="event" selectedEvent={selectedEvent} data={points} />
                        </TabsContent>
                    </Tabs>

                </div>
                {/* <div className="flex h-fit flex-col rounded-xl bg-muted/50 p-4">
                    <Tabs defaultValue="overall">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="overall">Overall</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overall">
                            <FacultyLeaderboard leaderboard="event" type="overall" selectedEvent={selectedEvent} />
                        </TabsContent>
                        <TabsContent value="men">
                            <FacultyLeaderboard leaderboard="event" type="men" selectedEvent={selectedEvent} data={points} />
                        </TabsContent>
                        <TabsContent value="women">
                            <FacultyLeaderboard leaderboard="event" type="women" selectedEvent={selectedEvent} data={points} />
                        </TabsContent>
                    </Tabs>

                </div> */}

            </main>
        </div>
    )
}
