import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Event } from "@/types/events"
import { FACULTY_OPTIONS } from "@/types/constants"
import { GripVertical, Trash2 } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface SortableTableRowProps {
    event: Event;
    index: number;
    editMode: boolean;
    isEvent: boolean;
    handleSave: (id: string, field: string, value?: string | number) => void;
    handleRemove: (id: string) => void;
}

export function SortableTableRow({ event, index, editMode, isEvent, handleSave, handleRemove }: SortableTableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: event.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow ref={setNodeRef} style={style}>
            <TableCell className="px-3 text-xs md:text-sm md:px-6">
                {editMode && <GripVertical className="h-4 w-4 inline mr-2 cursor-move" {...attributes} {...listeners} />}
                {(index + 1) % 6 === 0 ? (6) : (index + 1) % 6}
            </TableCell>
            <TableCell className="px-2 md:px-4">
                {event.name && <Badge className="text-xs md:text-sm" variant="secondary">
                    {FACULTY_OPTIONS.find((faculty) => faculty.id === event.faculty_id)?.key}
                </Badge>}
            </TableCell>
            {isEvent && (
                <>
                    <TableCell className="hidden lg:table-cell px-2 text-xs md:text-sm md:px-4">
                        {(event as Event).name}
                    </TableCell>
                    <TableCell className="lg:hidden px-2 text-xs md:text-sm md:px-4">
                        {(event as Event).name.split(" ")[1]}
                    </TableCell>
                </>
            )}

            <TableCell className="px-2 text-xs md:text-sm md:px-4">
                {editMode ? (
                    !event.name && <Button variant="ghost" size="sm" onClick={() => handleRemove(event.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                ) : (
                    event.name ? (event.points !== undefined ? event.points / 10 : "-") : ""
                )}
            </TableCell>
        </TableRow>
    );
}
