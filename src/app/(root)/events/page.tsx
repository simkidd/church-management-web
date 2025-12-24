import EventsGridContent from '@/components/events/EventsGridContent'
import FeaturedEvents from '@/components/events/FeaturedEvents'
import React from 'react'

const EventsPage = () => {
  return (
    <div className="space-y-12">
      <FeaturedEvents />

      <EventsGridContent />
    </div>
  )
}

export default EventsPage