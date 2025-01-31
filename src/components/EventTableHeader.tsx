import { TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface EventTableHeaderProps {
    isEvent: boolean;
    editMode: boolean;
}

export function EventTableHeader({ isEvent, editMode }: EventTableHeaderProps) {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="px-2 text-xs md:text-sm md:px-4">
                    Rank
                </TableHead>
                <TableHead className="px-2 text-xs md:text-sm md:px-4">
                    Faculty
                </TableHead>
                {isEvent && (
                    <TableHead className="px-2 text-xs md:text-sm md:px-4">
                        Name
                    </TableHead>
                )}
                <TableHead className="px-2 text-xs md:text-sm md:px-4">
                    Time
                </TableHead>
                {!editMode ? (
                    <TableHead className="px-2 text-xs md:text-sm md:px-4">
                        Points
                    </TableHead>
                ) : (
                    <TableHead className="px-2 text-xs md:text-sm md:px-4" colSpan={2}>
                        Actions
                    </TableHead>
                )}
            </TableRow>
        </TableHeader>
    )
}