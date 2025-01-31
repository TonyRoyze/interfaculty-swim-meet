"use client"

import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Save, Upload, Factory } from "lucide-react"
import { Event } from "@/types/events"
import { calculatePoints } from "@/lib/utils"
import { FACULTY_OPTIONS, EVENTS } from "@/types/constants"
import { supabase } from "@/lib/supabase"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { EventTableHeader } from "./EventTableHeader"
import { SortableTableRow } from "./SortableTableRow"



interface EventLeaderboardProps {
  selectedEvent: string,
  type: 'men' | 'women',
  setPoints?: React.Dispatch<React.SetStateAction<any[]>>
}

export function EventLeaderboard({ selectedEvent, type, setPoints }: EventLeaderboardProps) {
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


      const sortedData = [...data].sort((a, b) => {
        const timeA = a.time.split(":").reduce((acc: number, time: string) => acc * 60 + parseFloat(time), 0);
        const timeB = b.time.split(":").reduce((acc: number, time: string) => acc * 60 + parseFloat(time), 0);
        return timeA - timeB
      })

      const dataWithPoints = calculatePoints(sortedData);
      setResults(dataWithPoints);


      const facultyPoints = FACULTY_OPTIONS.map(faculty => ({
        name: faculty.key,
        points: dataWithPoints
          .filter(item => item.faculty_id === faculty.id)
          .reduce((sum, item) => sum + (item.points || 0), 0)
      })).sort((a, b) => b.points - a.points); // Sort in descending order based on points


      if (setPoints) {
        setPoints(facultyPoints);
      }
    }
    fetchData()
  }, [selectedEvent, type, setPoints])

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
    const dataWithPoints = calculatePoints(results);
    setResults(dataWithPoints);

    const facultyPoints = FACULTY_OPTIONS.map(faculty => ({
      name: faculty.key,
      points: dataWithPoints
        .filter(item => item.faculty_id === faculty.id)
        .reduce((sum, item) => sum + (item.points || 0), 0)
    })).sort((a, b) => b.points - a.points);

    //TODO: update points for faculty

    //   const sortedData = [...results].sort((a, b) => {
    //     const timeA = a.time.split(":").reduce((acc, time) => acc * 60 + Number.parseFloat(time), 0)
    //     const timeB = b.time.split(":").reduce((acc, time) => acc * 60 + Number.parseFloat(time), 0)
    //     return timeA - timeB
    // })

    if (setPoints) {
      setPoints(facultyPoints);
    }

    setEditMode(false);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setResults((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <EventTableHeader isEvent={isEvent} editMode={editMode} />
          <TableBody>
            {Array.isArray(results) ? (
              <SortableContext
                items={results.map(event => event.id)}
                strategy={verticalListSortingStrategy}
              >
                {results.map((event, index) => (
                  <SortableTableRow
                    key={event.id}
                    event={event}
                    index={index}
                    editMode={editMode}
                    isEvent={isEvent}
                    handleSave={handleSave}
                    handleRemove={handleRemove}
                  />
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>
      {editMode && (
        <Button variant="outline" onClick={handleAdd} className="mt-4 md:text-sm">
          <Plus className="h-4 w-4 mr-2" />Add
        </Button>
      )}
    </div>
  );
}
