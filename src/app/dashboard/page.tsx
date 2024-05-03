import {FacultyLeaderboard} from "@/components/facultyleaderboard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {EventLeaderboard} from "@/components/eventLeaderboard";
import {EventSelector} from "@/components/eventselector";
import Header from "@/components/header";
import {fetchFacultyLeaderboardData} from "@/app/_lib/readFacultyLeaderboard";

export default async function Home({searchParams,}:{searchParams: {event: string};}) {
    const facultyData = await fetchFacultyLeaderboardData();
    return (
        <div className="flex flex-col">
            <Header/>
            <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex h-full flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                    <EventSelector eventName={searchParams.event}/>
                    <Tabs defaultValue="men">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="men">
                            <EventLeaderboard type={'men'} eventName={searchParams.event}/>
                        </TabsContent>
                        <TabsContent value="women">
                            <EventLeaderboard type={'women'} eventName={searchParams.event}/>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="flex h-fit flex-col rounded-xl bg-muted/50 p-4">
                    <Tabs defaultValue="overall">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="overall">Overall</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overall">
                            <FacultyLeaderboard data={facultyData} type="overall"/>
                        </TabsContent>
                        <TabsContent value="men">
                            <FacultyLeaderboard data={facultyData} type="men"/>
                        </TabsContent>
                        <TabsContent value="women">
                            <FacultyLeaderboard data={facultyData} type="women"/>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
