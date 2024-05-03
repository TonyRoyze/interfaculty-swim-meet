import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge";

interface Faculty {
    name: string;
    points: {
        overall: number;
        men: number;
        women: number;
    };
}

interface FacultyLeaderboardProps {
    data: Faculty[];
    type: 'overall' | 'men' | 'women';
}


export function FacultyLeaderboard ({ data, type }: FacultyLeaderboardProps) {
    // Filter faculties based on the type (overall, men, women)
    const filteredFaculties = data.map(faculty => ({
        name: faculty.name,
        points: faculty.points[type]
    })).sort((a, b) => b.points - a.points);

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
                {filteredFaculties.map((faculty, index) => (
                    <TableRow key={index}>
                        <TableCell className="px-3 text-xs flex justify-center md:justify-start md:text-sm md:px-6">{index + 1}</TableCell>
                        <TableCell className="px-3 md:px-4">
                            <Badge variant="secondary" className="text-xs md:text-sm">
                                {faculty.name}
                            </Badge>
                        </TableCell>
                        <TableCell className="px-3 text-xs md:text-sm md:px-4">{faculty.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
