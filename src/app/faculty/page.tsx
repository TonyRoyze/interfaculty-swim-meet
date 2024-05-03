import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Header from "@/components/header";
import {FacultyLeaderboard} from "@/components/facultyleaderboard";
import {fetchFacultyLeaderboardData} from "@/app/_lib/readFacultyLeaderboard";

export default async function Home() {
    const data = await fetchFacultyLeaderboardData();

    return (
        <div className="flex flex-col">
            <Header/>
            <main className="flex flex-1 gap-4 overflow-auto p-4">
                <div className="flex w-full max-w-xl h-fit flex-col rounded-xl bg-muted/50 p-4">
                    <Tabs defaultValue="overall">
                        <TabsList className="justify-evenly">
                            <TabsTrigger className="text-xs md:text-sm" value="overall">Overall</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="men">Men</TabsTrigger>
                            <TabsTrigger className="text-xs md:text-sm" value="women">Women</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overall">
                            <FacultyLeaderboard data={data} type="overall"/>
                        </TabsContent>
                        <TabsContent value="men">
                            <FacultyLeaderboard data={data} type="men"/>
                        </TabsContent>
                        <TabsContent value="women">
                            <FacultyLeaderboard data={data} type="women"/>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
