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
import { Separator } from "@/components/ui/separator";
import { EVENT_OPTIONS } from "@/types/constants";

interface EventSelectorProps {
    selectedEvent: string
    onEventSelect: (value: string) => void
}

export function EventSelector({ selectedEvent, onEventSelect }: EventSelectorProps) {
    return (
        <div className="grid w-full items-start gap-6 overflow-auto p-1 pb-4">
            <Select value={selectedEvent} onValueChange={onEventSelect}>
                <SelectTrigger className="text-xs md:text-sm">
                    <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                    {EVENT_OPTIONS.map((group, index) => (
                        <div key={index}>
                            <SelectGroup>
                                <SelectLabel className="text-xs md:text-sm">{group.label}</SelectLabel>
                                {group.items.map((item, itemIndex) => (
                                    <SelectItem key={itemIndex} className="text-xs md:text-sm"
                                        value={item.value}>{item.label}</SelectItem>
                                ))}
                            </SelectGroup>
                            {index < EVENT_OPTIONS.length - 1 && <Separator className="my-4" />}
                        </div>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
