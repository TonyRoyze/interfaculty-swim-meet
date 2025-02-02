import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { Event } from "@/types/events"
import { EVENTS } from "@/types/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const calculatePoints = (sortedData: Event[]): Event[] => {
  // Check if event is relay by looking at the first event's event_id
  const isRelay = sortedData[0]?.event_id ?
    EVENTS.find(e => e.id === sortedData[0].event_id)?.key.toLowerCase().includes('relay') :
    false;

  // console.log(isRelay);

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