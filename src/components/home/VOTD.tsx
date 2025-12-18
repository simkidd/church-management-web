import React from "react";
import VerseOfTheDay from "./VerseOfTheDay";
import UpcomingEvents from "./UpcomingEvents";

const VOTD = () => {
  return (
    <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 h-full">
        <VerseOfTheDay />
      </div>
      <div className="lg:col-span-7 flex flex-col gap-6">
        <UpcomingEvents />
      </div>
    </section>
  );
};

export default VOTD;
