'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/header";
import { FacultyLeaderboard } from "@/components/facultyleaderboard2";
import { supabase } from "@/lib/supabase"; ``
import { FACULTY_OPTIONS } from "@/types/constants";
import { useState, useEffect } from "react";



export default function Home() {

    const [overallPoints, setOverallPoints] = useState<any[]>([]);
    const [menPoints, setMenPoints] = useState<any[]>([]);
    const [womenPoints, setWomenPoints] = useState<any[]>([]);
    const fetchData = async () => {

        const { data, error } = await supabase
            .from('swims')
            .select('*')

        if (error) {
            console.error('Error fetching data:', error)
            return
        }

        const overallData = FACULTY_OPTIONS.map(faculty => ({
            name: faculty.key,
            points: data
                .filter(item => item.faculty_id === faculty.id)
                .reduce((sum, item) => sum + (item.points || 0), 0)
        })).sort((a, b) => b.points - a.points);

        setOverallPoints(overallData)

        const menData = FACULTY_OPTIONS.map(faculty => ({
            name: faculty.key,
            points: data
                .filter(item => item.faculty_id === faculty.id && item.event_id > 16)
                .reduce((sum, item) => sum + (item.points || 0), 0)
        })).sort((a, b) => b.points - a.points);

        setMenPoints(menData)


        const womenData = FACULTY_OPTIONS.map(faculty => ({
            name: faculty.key,
            points: data
                .filter(item => item.faculty_id === faculty.id && item.event_id <= 16)
                .reduce((sum, item) => sum + (item.points || 0), 0)
        })).sort((a, b) => b.points - a.points);

        setWomenPoints(womenData)

    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 gap-4 overflow-auto p-4">
                <div className="flex w-full max-w-xl h-fit flex-col rounded-xl bg-muted/50 p-4">
                    <Tabs defaultValue="overall">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="overall">Overall</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overall">
                            <FacultyLeaderboard data={overallPoints} type="overall" leaderboard="overall" />
                        </TabsContent>
                        <TabsContent value="men">
                            <FacultyLeaderboard data={menPoints} type="men" leaderboard="overall" />
                        </TabsContent>
                        <TabsContent value="women">
                            <FacultyLeaderboard data={womenPoints} type="women" leaderboard="overall" />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
