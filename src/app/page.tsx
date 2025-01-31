"use client"
import { useState, useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventLeaderboard } from "@/components/eventLeaderboard2";
import Header from "@/components/header";
import { EventSelector } from "@/components/eventselector";
import { Event, Relay } from "@/types/events";
import { resultdata as data } from "@/constants";
import { supabase } from '@/lib/supabase'


export default function Home() {
    const [selectedEvent, setSelectedEvent] = useState("25free")
    const handleEventSelect = (value: string) => {
        setSelectedEvent(value.replace(/^[MW]/, ""))
    }
    const [menResults, setMenResults] = useState<Event[] | Relay[]>([])
    const [womenResults, setWomenResults] = useState<Event[] | Relay[]>([])

    useMemo(() => {
        const menEvent = `M${selectedEvent}` as keyof typeof data.events
        const womenEvent = `W${selectedEvent}` as keyof typeof data.events

        setMenResults(
            data.events[menEvent]?.map((result, index) => ({
                id: `men-${index}`,
                ...result,
                points: 0,
            })) || [],
        )

        setWomenResults(
            data.events[womenEvent]?.map((result, index) => ({
                id: `women-${index}`,
                ...result,
                points: 0,
            })) || [],
        )
    }, [selectedEvent])

    const handleMenDataChange = (newData: Event[] | Relay[]) => {
        setMenResults(newData)
    }

    const handleWomenDataChange = (newData: Event[] | Relay[]) => {
        setWomenResults(newData)
    }
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 gap-4 overflow-auto p-4">
                <div className="flex w-full max-w-2xl h-fit flex-col rounded-xl bg-muted/50 p-4">
                    <EventSelector selectedEvent={selectedEvent} onEventSelect={handleEventSelect} />
                    <Tabs defaultValue="men" className="relative">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="men">
                            <EventLeaderboard
                                selectedEvent={selectedEvent}
                                type="men"
                            />
                        </TabsContent>
                        <TabsContent value="women">
                            <EventLeaderboard
                                selectedEvent={selectedEvent}
                                type="women"
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}

