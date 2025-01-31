"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit, Save, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Event } from "@/types/events"
import { FACULTY_OPTIONS, EVENTS } from "@/types/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"


const calculatePoints = (sortedData: Event[]): Event[] => {
    // Check if event is relay by looking at the first event's event_id
    const isRelay = sortedData[0]?.event_id ?
        EVENTS.find(e => e.id === sortedData[0].event_id)?.key.toLowerCase().includes('relay') :
        false;

    const pointsArray = isRelay ? [10, 7, 5, 4, 3, 2, 1] : [7, 5, 4, 3, 2, 1]

    const timeGroups: { [key: string]: Event[] } = {}
    sortedData.forEach(event => {
        if (!timeGroups[event.time]) {
            timeGroups[event.time] = []
        }
        timeGroups[event.time].push(event)
    })

    let currentIndex = 0
    return sortedData.map(item => {
        const sameTimeEvents = timeGroups[item.time]
        if (sameTimeEvents.length > 1) {
            // Calculate average points for tied positions
            const startIndex = currentIndex
            const endIndex = currentIndex + sameTimeEvents.length - 1
            let totalPoints = 0

            // Sum up points for the positions
            for (let i = startIndex; i <= endIndex && i < pointsArray.length; i++) {
                totalPoints += pointsArray[i] || 0
            }

            // Calculate average points
            const averagePoints = totalPoints / sameTimeEvents.length

            if (sameTimeEvents[sameTimeEvents.length - 1] === item) {
                currentIndex += sameTimeEvents.length
            }

            return {
                ...item,
                points: averagePoints
            }
        } else {
            const points = currentIndex < pointsArray.length ? pointsArray[currentIndex] : 0
            currentIndex++
            return {
                ...item,
                points
            }
        }
    })
}

interface EventLeaderboardProps {
    selectedEvent: string,
    type: 'men' | 'women',
}

export function EventLeaderboard({ selectedEvent, type }: EventLeaderboardProps) {
    const isEvent = !selectedEvent.includes('relay');
    const [editMode, setEditMode] = useState(false)
    const [results, setResults] = useState<Event[]>([])


    useEffect(() => {
        const fetchData = async () => {
            const eventId = type == 'men'
                ? EVENTS.find((event) => event.key === `M${selectedEvent}`)?.id
                : EVENTS.find((event) => event.key === `W${selectedEvent}`)?.id;

            const { data, error } = await supabase
                .from('swims')
                .select('*')
                .eq('event_id', eventId)
                .order('time', { ascending: true })

            if (error) {
                console.error('Error fetching data:', error)
                return
            }

            // Sort and calculate points before setting state
            const sortedData = [...data].sort((a, b) => {
                const timeA = a.time.split(":").reduce((acc: number, time: string) => acc * 60 + parseFloat(time), 0);
                const timeB = b.time.split(":").reduce((acc: number, time: string) => acc * 60 + parseFloat(time), 0);
                return timeA - timeB
            })
            const dataWithPoints = calculatePoints(sortedData)
            setResults(dataWithPoints)
            console.log("Fetched Data", dataWithPoints)
        }
        fetchData()
    }, [selectedEvent, type])

    const handleAdd = async () => {
        const eventId = type === 'men'
            ? EVENTS.find((event) => event.key === `M${selectedEvent}`)?.id
            : EVENTS.find((event) => event.key === `W${selectedEvent}`)?.id

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
        if (typeof id === 'string') {
            const updatedResults = results.filter(item => item.id !== id)
            setResults(updatedResults)
        }
        else {
            const { error } = await supabase
                .from('swims')
                .delete()
                .eq('id', id)
            if (error) throw error
        }

    }

    const handleSubmit = async () => {
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
                    console.log('string', item)
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
        } catch (error) {
            console.error('Error submitting data:', error)
        }
    }


    const handleSaveChanges = () => {
        const sortedData = [...results].sort((a, b) => {
            const timeA = a.time.split(":").reduce((acc, time) => acc * 60 + Number.parseFloat(time), 0)
            const timeB = b.time.split(":").reduce((acc, time) => acc * 60 + Number.parseFloat(time), 0)
            return timeA - timeB
        })

        const dataWithPoints = calculatePoints(results)
        setResults(dataWithPoints)
        setEditMode(false)
    }

    return (
        <div>
            <div className="absolute top-0 right-0 space-x-2">
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
                <Button variant="outline" onClick={handleSubmit}>
                    <Upload className="h-4 w-4 mr-2" />Submit
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
                                            {/* <Button variant="ghost" size="sm"> */}
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        event.time && event.points !== undefined ? event.points : "-"
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
                <Button variant="outline" onClick={handleAdd} className="mt-4">
                    {/* <Button variant="outline" className="mt-4"> */}
                    <Plus className="h-4 w-4 mr-2" />Add
                </Button>
            )}
        </div>
    );
}
