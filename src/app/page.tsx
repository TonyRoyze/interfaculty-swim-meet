import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {EventLeaderboard} from "@/components/eventLeaderboard";
import Header from "@/components/header";
import {EventSelector} from "@/components/eventselector";

export default function Home({searchParams,}:{searchParams: {event: string};}) {

    return (
        <div className="flex flex-col">
            <Header/>
            <main className="flex flex-1 gap-4 overflow-auto p-4">
                <div className="flex w-full max-w-2xl h-fit flex-col rounded-xl bg-muted/50 p-4">
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
            </main>
        </div>
    );
}

