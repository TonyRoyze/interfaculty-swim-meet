'use client';
import {Button} from "@/components/ui/button";
import {
    BarChart2,
    UsersRound,
    LayoutDashboard,
    CircleSlash,
} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useRouter} from "next/navigation";

export default function Sidebar(){
    const route = useRouter();
    const goToDash = () => {
        route.push("/dashboard");
    }
    const goToFaculty = () => {
        route.push("/faculty");
    }
    const goToSwimmer = () => {
        route.push("/");
    }
    return (
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button className="hidden md:flex" onClick={goToDash} variant="outline" size="icon" aria-label="Home">
                                <LayoutDashboard className="size-5"/>
                            </Button>

                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Dashboard</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button className="md:hidden" variant="outline" size="icon" aria-label="Home">
                    <CircleSlash className="size-5"/>
                </Button>
            </div>
            <nav className="grid gap-1 p-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={goToFaculty}
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Faculty Leaderboard"
                            >
                                <BarChart2 className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Faculty Leaderboard</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={goToSwimmer}
                                variant="ghost"
                                size="icon"
                                className="rounded-lg"
                                aria-label="Event Leaderboard"
                            >
                                <UsersRound className="size-5"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Event Leaderboard</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
};

