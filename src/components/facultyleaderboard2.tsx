"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";


interface FacultyLeaderboardProps {
    data?: any[]
}


export function FacultyLeaderboard({ data }: FacultyLeaderboardProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-3 text-xs md:text-sm md:px-4">Rank</TableHead>
                    <TableHead className="px-3 text-xs md:text-sm md:px-4">Faculty</TableHead>
                    <TableHead className="px-3 text-xs md:text-sm md:px-4">Points</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((faculty, index) => (
                    faculty.points > 0 ? (<TableRow key={index}>
                        <TableCell className="px-3 text-xs flex justify-center md:justify-start md:text-sm md:px-6">{index + 1}</TableCell>
                        <TableCell className="px-3 md:px-4">
                            <Badge variant="secondary" className="text-xs md:text-sm">
                                {faculty.name}
                            </Badge>
                        </TableCell>
                        <TableCell className="px-3 text-xs md:text-sm md:px-4">{faculty.points / 10}</TableCell>
                    </TableRow>) : null
                ))}
            </TableBody>
        </Table>
    );
}
