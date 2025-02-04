"use client"

import React, { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableRow, TableHeader, TableHead } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Save, Upload } from "lucide-react"
import { Event } from "@/types/events"
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
import { useToast } from "@/hooks/use-toast"
import { SortableTableRow } from "./sortableTableRow2"

interface EventLeaderboardProps {
  selectedEvent: string,
  results: Event[],
  // allResults?: Event[],
  // overallPoints?: Points[],
  setResults: React.Dispatch<React.SetStateAction<Event[]>>
  // setEventPoints?: React.Dispatch<React.SetStateAction<Points[]>>
  // setOverallPoints?: React.Dispatch<React.SetStateAction<Points[]>>
}

export function EventLeaderboard({ selectedEvent, results, setResults }: EventLeaderboardProps) {
  const isEvent = !selectedEvent.includes('relay');
  const [editMode, setEditMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [heats, setHeats] = useState<Event[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const unassignedResults = results.filter(
      (event) => event.heat === null
    )
    const assignedResults = results.filter(
      (event) => event.heat !== null
    ).sort((a, b) => {
      if (!a.heat && !b.heat) {
        return 1;
      }
      if (!a.heat) return 1;
      if (!b.heat) return -1;
      if (a.heat !== b.heat) {
        return a.heat - b.heat;
      }
      if (!a.lane && !b.lane) {
        return 0;
      }
      if (!a.lane) return 1;
      if (!b.lane) return -1;
      return a.lane - b.lane;
    });

    // Fill in missing lanes for each heat
    const maxHeat = Math.max(...assignedResults.map(r => r.heat || 0));
    const filledResults = [];

    for (let heat = 1; heat <= maxHeat; heat++) {
      const heatResults = assignedResults.filter(r => r.heat === heat);
      const existingLanes = heatResults.map(r => r.lane);

      // Add existing results
      filledResults.push(...heatResults);

      // Add empty results for missing lanes
      for (let lane = 1; lane <= 6; lane++) {
        if (!existingLanes.includes(lane)) {
          filledResults.push({
            id: crypto.randomUUID(),
            event_id: results[0].event_id,
            faculty_id: 1,
            name: "",
            time: "",
            points: 0,
            heat: heat,
            lane: lane
          });
        }
      }
    }

    // Sort by heat and lane
    filledResults.sort((a, b) => {
      if (!a.heat || !b.heat) return 0;
      if (a.heat !== b.heat) return a.heat - b.heat;
      if (!a.lane || !b.lane) return 0;
      return a.lane - b.lane;
    });
    // console.log("Filled", filledResults)
    // console.log("Assigned", assignedResults)
    // console.log("Unassigned", unassignedResults)
    setHeats([...filledResults, ...unassignedResults]);
  }, [selectedEvent, results]);

  const handleAdd = async () => {
    const eventId = heats[0].event_id;

    const newRow = {
      id: crypto.randomUUID(),
      event_id: eventId,
      faculty_id: 1,
      name: "",
      time: "",
      points: 0,
    }
    setHeats([...heats, newRow])
  }

  const handleSave = (id: string, field: string, value?: string | number) => {

    const updatedResults = [...heats];
    const itemIndex = updatedResults.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
      updatedResults[itemIndex] = {
        ...updatedResults[itemIndex],
        [field]: value
      };
      setHeats(updatedResults);
      // console.log('updatedResults', updatedResults);
    }
  }

  const handleRemove = async (id: string) => {
    const updatedResults = heats.filter(item => item.id !== id)
    setHeats(updatedResults)
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
      await Promise.all(heats.map(async (item, index) => {
        if (typeof item.id === 'number') {
          const { error } = await supabase
            .from('swims')
            .update({
              event_id: item.event_id,
              faculty_id: item.faculty_id,
              name: item.name,
              time: item.time,
              points: item.points,
              heat: Math.floor(index / 6) + 1,
              lane: (index + 1) % 6 === 0 ? (6) : (index + 1) % 6,
            })
            .eq('id', item.id)
          if (error) throw error
        }
      }));

      toast({
        title: "Success",
        description: "Results have been updated successfully",
      })
      setEditMode(false)
    } catch (error) {
      console.error('Error submitting data:', error)
      toast({
        title: "Error",
        description: "Failed to update results",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveChanges = () => {
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
      setHeats((items) => {
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
        <Button
          variant="outline"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-2 text-xs md:text-sm md:px-4">
                Lane
              </TableHead>
              <TableHead className="px-2 text-xs md:text-sm md:px-4">
                Faculty
              </TableHead>
              {isEvent && (
                <TableHead className="px-2 text-xs md:text-sm md:px-4">
                  Name
                </TableHead>
              )}
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
            {Array.isArray(heats) ? (
              <SortableContext
                items={heats.map(event => event.id)}
                strategy={verticalListSortingStrategy}
              >
                {heats.map((event, index) => (
                  <React.Fragment key={event.id}>
                    {index % 6 === 0 && (
                      <TableRow className="bg-muted/50">
                        <TableCell
                          colSpan={4}
                          className="px-4 py-2 text-md md:text-xl font-bold"
                        >
                          Heat {event.heat}
                        </TableCell>
                      </TableRow>
                    )}
                    <SortableTableRow
                      key={event.id}
                      event={event}
                      index={index}
                      editMode={editMode}
                      isEvent={isEvent}
                      handleSave={handleSave}
                      handleRemove={handleRemove}
                    />
                  </React.Fragment>
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
