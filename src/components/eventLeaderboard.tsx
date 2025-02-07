"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit, Save, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Event } from "@/types/events"
import { FACULTY_OPTIONS, EVENTS } from "@/types/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { calculatePoints } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface EventLeaderboardProps {
    selectedEvent: string,
    results: Event[],
    allResults?: Event[],
    // overallPoints?: Points[],
    setResults: React.Dispatch<React.SetStateAction<Event[]>>
    // setEventPoints?: React.Dispatch<React.SetStateAction<Points[]>>
    // setOverallPoints?: React.Dispatch<React.SetStateAction<Points[]>>
}

export function EventLeaderboard({ selectedEvent, results, setResults }: EventLeaderboardProps) {
    const { toast } = useToast()
    const isEvent = !selectedEvent.includes('relay');
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editMode, setEditMode] = useState(false)


    const handleAdd = async () => {
        const eventId = results[0].event_id;


        const newRow = {
            id: crypto.randomUUID(),
            event_id: eventId,
            faculty_id: 1,
            name: "",
            time: "",
            points: 0,
        }
        setResults([...results, newRow])
    }

    const handleSave = (id: string, field: string, value?: string | number) => {

        const updatedResults = [...results];
        const itemIndex = updatedResults.findIndex(item => item.id === id);

        if (itemIndex !== -1) {
            updatedResults[itemIndex] = {
                ...updatedResults[itemIndex],
                [field]: value
            };
            setResults(updatedResults);
        }
    }

    const handleRemove = async (id: string) => {
        const updatedResults = results.filter(item => item.id !== id)
        setResults(updatedResults)
        if (typeof id === 'number') {
            const { error } = await supabase
                .from('swims')
                .delete()
                .eq('id', id)
            if (error) throw error
        }

    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            for (const item of results) {

                if (typeof item.id === 'string') {
                    const { error } = await supabase
                        .from('swims')
                        .insert({
                            event_id: item.event_id,
                            faculty_id: item.faculty_id,
                            name: item.name,
                            time: item.time,
                            points: item.points
                        })
                    if (error) throw error
                    // console.log('string', item)
                } else {
                    const { error } = await supabase
                        .from('swims')
                        .update({
                            event_id: item.event_id,
                            faculty_id: item.faculty_id,
                            name: item.name,
                            time: item.time,
                            points: item.points
                        })
                        .eq('id', item.id)
                    if (error) throw error
                }
            }
            setEditMode(false)
            toast({
                title: "Success",
                description: "Results have been submitted successfully",
                variant: "default",
            })
        } catch (error) {
            console.error('Error submitting data:', error)
            toast({
                title: "Error",
                description: "Failed to submit results. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }


    const handleSaveChanges = () => {
        console.log(results);
        const sortedData = [...results].sort((a, b) => {
            if (a.time && b.time) {
                const timeA = a.time.split(":").reduce((acc, time) => acc * 60 + Number.parseFloat(time), 0)
                const timeB = b.time.split(":").reduce((acc, time) => acc * 60 + Number.parseFloat(time), 0)
                return timeA - timeB
            }
            return 0
        })

        const dataWithPoints = calculatePoints(sortedData)
        setResults(dataWithPoints)
        setEditMode(false)
    }

    return (
        <div>
            <div className="absolute top-0 right-0 space-x-2 md:text-sm">
                {editMode ? (
                    <>
                        <Button variant="outline" onClick={handleSaveChanges}>
                            <Save className="h-4 w-4 mr-2" /> Save
                        </Button>
                    </>
                ) : (
                    <Button variant="outline" onClick={() => setEditMode(true)}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                )}
                <Button
                    variant="outline"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    <Upload className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </div>

            <Table>
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
                <TableBody>
                    {Array.isArray(results) ? (
                        results.map((event, index) => (
                            <TableRow key={index.valueOf()}>
                                <TableCell className="px-3 text-xs md:text-sm md:px-6">
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
                                                (event as Event).name.split(" ")[1]
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
                                        event.time && event.points !== undefined ? event.points / 10 : "-"
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {editMode && (
                <Button variant="outline" onClick={handleAdd} className="mt-4 md:text-sm">
                    <Plus className="h-4 w-4 mr-2" />Add
                </Button>
            )}
        </div>
    );
}

