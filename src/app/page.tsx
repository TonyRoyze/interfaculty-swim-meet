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

