'use client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";
import {options} from "@/constants";
import {usePathname, useRouter} from "next/navigation";

interface EventSelectorProps {
    eventName: string;
}

export function EventSelector({eventName}:EventSelectorProps) {
    const router = useRouter();
    const pathname = usePathname();



    return (
        <div className="grid w-full items-start gap-6 overflow-auto p-1 pb-4">
            <Select value={eventName} onValueChange={(value) => {
                if (pathname === '/dashboard')
                    router.push(`/dashboard/?event=${value}`);
                else
                    router.push(`/?event=${value}`);

            }}>
                <SelectTrigger className="text-xs md:text-sm">
                    <SelectValue placeholder="Select an event"/>
                </SelectTrigger>
                <SelectContent>
                    {options.map((group, index) => (
                        <div key={index}>
                            <SelectGroup>
                                <SelectLabel className="text-xs md:text-sm">{group.label}</SelectLabel>
                                {group.items.map((item, itemIndex) => (
                                    <SelectItem key={itemIndex} className="text-xs md:text-sm"
                                                value={item.value}>{item.label}</SelectItem>
                                ))}
                            </SelectGroup>
                            {index < options.length - 1 && <Separator className="my-4"/>}
                        </div>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
