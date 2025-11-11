"use client"
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  gradient?: boolean;
  index: number;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  gradient = false,
  index,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={`overflow-hidden ${
          gradient ? "gradient-primary text-primary-foreground" : ""
        } hover:shadow-elevated transition-smooth`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`p-3 rounded-lg ${
                gradient ? "bg-white/20" : "bg-primary/10"
              }`}
            >
              <Icon
                className={`h-6 w-6 ${
                  gradient ? "text-white" : "text-primary"
                }`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <p
              className={`text-sm font-medium ${
                gradient ? "text-white/80" : "text-muted-foreground"
              }`}
            >
              {title}
            </p>
            <p className="text-3xl font-bold font-serif">{value}</p>
            {description && (
              <p
                className={`text-sm ${
                  gradient ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
