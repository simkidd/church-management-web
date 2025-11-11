"use client"
import { motion } from "framer-motion";
import { Users, BookOpen, Calendar, Heart } from "lucide-react";
import React from "react";
import { StatsCard } from "../shared/StatsCard";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      title: "Community Members",
      value: "1,200+",
      description: "Growing together in faith",
    },
    {
      icon: BookOpen,
      title: "Sermons Available",
      value: "350+",
      description: "Life-changing messages",
    },
    {
      icon: Calendar,
      title: "Weekly Events",
      value: "12+",
      description: "Programs for all ages",
    },
    {
      icon: Heart,
      title: "Volunteers",
      value: "200+",
      description: "Serving with love",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Growing Together
          </h2>
          <p className="text-muted-foreground">
            Making an impact in our community and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={stat.title} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
