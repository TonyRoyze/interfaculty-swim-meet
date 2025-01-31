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
                {index + 1}
            </TableCell>
            <TableCell className="px-2 md:px-4">
                {editMode ? (
                    <Select value={FACULTY_OPTIONS.find((faculty) => faculty.id === event.faculty_id)?.key} onValueChange={(key) => handleSave(event.id, "faculty_id", FACULTY_OPTIONS.find((faculty) => faculty.key === key)?.id)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select faculty" />
                        </SelectTrigger>
                        <SelectContent>
                            {FACULTY_OPTIONS.map((faculty) => (
                                <SelectItem key={faculty.id} value={faculty.key}>
                                    {faculty.key}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                    <Badge className="text-xs md:text-sm" variant="secondary">
                        {FACULTY_OPTIONS.find((faculty) => faculty.id === event.faculty_id)?.key}
                    </Badge>
                )}
            </TableCell>
            {isEvent && (
                <>
                    <TableCell className="hidden lg:table-cell px-2 text-xs md:text-sm md:px-4">
                        {editMode ? (
                            <Input value={(event as Event).name} onChange={(e) => handleSave(event.id, "name", e.target.value)} />
                        ) : (
                            (event as Event).name
                        )}
                    </TableCell>
                    <TableCell className="lg:hidden px-2 text-xs md:text-sm md:px-4">
                        {editMode ? (
                            <Input value={(event as Event).name} onChange={(e) => handleSave(event.id, "name", e.target.value)} />
                        ) : (
                            (event as Event).name.split(" ")[0]
                        )}
                    </TableCell>
                </>
            )}
            <TableCell className="px-2 text-xs md:text-sm md:px-4">
                {editMode ? (
                    <Input value={event.time} onChange={(e) => handleSave(event.id, "time", e.target.value)} />
                ) : (
                    event.time
                )}
            </TableCell>
            <TableCell className="px-2 text-xs md:text-sm md:px-4">
                {editMode ? (
                    <Button variant="ghost" size="sm" onClick={() => handleRemove(event.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                ) : (
                    event.time && event.points !== undefined ? event.points : "-"
                )}
            </TableCell>
        </TableRow>
    );
}