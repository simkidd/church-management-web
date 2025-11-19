"use client";
import PageTitle from "@/components/shared/PageTitle";
import { StatsCard } from "@/components/shared/StatsCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth.store";
import { BookOpen, Calendar, Clock, FileText, Heart, Trophy, Users } from "lucide-react";
import Link from "next/link";

const DashboardComp = () => {
  const { user } = useAuthStore();

  const stats = [
    {
      icon: BookOpen,
      title: "Active Courses",
      value: "3",
      description: "In progress",
    },
    {
      icon: FileText,
      title: "Completed Exams",
      value: "12",
      description: "This month",
    },
    { icon: Trophy, title: "Certificates", value: "5", description: "Earned" },
    {
      icon: Clock,
      title: "Study Hours",
      value: "24",
      description: "This week",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <PageTitle
          title={`Welcome back, ${user?.firstName}`}
          subtitle="Continue your spiritual growth journey with our courses and programs."
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            index={index}
            gradient={index === 0}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Biblical Foundations",
                progress: 75,
                lessons: "12/16 lessons",
              },
              {
                title: "Prayer & Worship",
                progress: 50,
                lessons: "6/12 lessons",
              },
              {
                title: "Christian Leadership",
                progress: 30,
                lessons: "3/10 lessons",
              },
            ].map((course, index) => (
              <div key={course.title} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{course.title}</h4>
                  <span className="text-sm text-muted-foreground">
                    {course.lessons}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full gradient-primary transition-smooth"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
            <Button asChild className="w-full mt-4">
              <Link href="/dashboard/courses">View All Courses</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Upcoming Exams</CardTitle>
            <CardDescription>
              Stay prepared for your assessments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Old Testament Survey",
                date: "Dec 15, 2023",
                time: "2:00 PM",
              },
              {
                title: "New Testament Theology",
                date: "Dec 18, 2023",
                time: "10:00 AM",
              },
              {
                title: "Church History",
                date: "Dec 22, 2023",
                time: "3:00 PM",
              },
            ].map((exam) => (
              <div key={exam.title} className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">{exam.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{exam.date}</span>
                  <span>•</span>
                  <span>{exam.time}</span>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/dashboard/exams">View All Exams</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="mt-6 gradient-primary ">
        <CardContent className="p-6">
          <h3 className="text-xl font-serif font-semibold mb-2">
            📢 New Course Available!
          </h3>
          <p className=" mb-4">
            Enroll in "Spiritual Disciplines for Modern Life" - Learn practical
            ways to deepen your faith through prayer, fasting, and meditation.
          </p>
          <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
            Enroll Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardComp;
