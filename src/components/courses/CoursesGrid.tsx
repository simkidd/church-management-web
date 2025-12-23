"use client";
import { ChevronDown, User, User2 } from "lucide-react";
import React from "react";

const courses = [
  {
    id: 1,
    title: "Understanding the Old Testament",
    category: "BIBLICAL STUDIES",
    description:
      "A comprehensive journey through the history, culture, and key themes of the Old Testament scriptures.",
    instructor: "Dr. James Wilson",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmk5LqKVzohmPyCtpOTDRNBb63ARJ6Za0xnLNVNtpe4AtwmeFhpJONRDBVjX48Vm6hMkJrnPqBDZjg3umPUH8LENxr926rxD935KF2wqBDv3BqpRHT10dmwEpuEqEnlEU-9XuFPNOmpVy9OjE5q9tYE4N1m4xVIiVP3a4PjuWAjqvpNUqN1OMR5uIdNKlTzu6X192_F5w6cOK_ma_fIuYulfglp9Jl5r7zMSoiGAc9ENcmdv5zSsSJhF2h9krgJdwo70oqF_cgXb8x",
  },
  {
    id: 2,
    title: "New Believers Class",
    category: "DISCIPLESHIP",
    description:
      "Start your walk with Christ on the right foot. Learn the essentials of salvation, prayer, and community.",
    instructor: "Pastor Sarah Lee",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKLkpNUByLSXGPfKVixdF0oetZnKCsO25wHZrwqdd_9V9LksLAPC4C7uZidfOm59oy7d7ZQaN0Wof5NMkgB3FHcXtLaUIs7uMrdjdL1A_OThqeKTRM4C_klebFnXJKega08gNWcImCV8E9WQobNfcjtCqro58Xol-ZJnHp8oUp8WvoDU8yN_UhAgy2BUrlD4GN3c6iq1vtNLfttTmud3IaOiQY3xwzrKZa3ME7N-oorg8Rfs99lqt0XhAQGAYnNjTyQtlSYeysT9Sy",
  },
  {
    id: 3,
    title: "Servant Leadership 101",
    category: "LEADERSHIP",
    description:
      "Developing the heart and skills to lead others effectively in ministry and the marketplace.",
    instructor: "Rev. Mark Thompson",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCh3Z9DOWwdrwO21NYc_X38CJpNJhrD7KakdtHUqRdtgRIcpMX5eBi3n9cyumpKr8C43CIgA3L4EeACgOzAJ6o-sPRlx8nHLG3Ypc0WmQQNi45JwKpp9VFLzF6TMGdOZNOLqJdF10PoG3omZdptpZkSD--Lgou0P1K7BbwZwJo3_Tmj6I4Hzq_R65thA8_Vu3g1OrW2OvJQh_lK0KEsq6VaoFbP3G04ZYfwEGaonRKWjSB-raqjdFHj1oDyb91329XuV58KrS-6P--o",
  },
  {
    id: 4,
    title: "Kingdom Marriage",
    category: "MARRIAGE & FAMILY",
    description:
      "Building a lasting, God-centered relationship that thrives through all seasons of life.",
    instructor: "Pastors John & Mary",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1s-4csAGPY19ZFRoi3mE332hy91ypvLgMFqJE0dm33JKT137ZBOvxFJgtZ3l6UlrHioV2pzViaON6lDI86ZA51RqyBD37QJJ-_N1TksdnqWvTe3N_yDZbjaJRLEZ6oyI707SvSGqltBzSg_rniViFsORQSxThmS6AP3rajVUKAYtErYokHTt1R3Cyoq9Sy3-aRq2UZGnQsWXOglhJ3T1KJcZatrZkP089Gw8afxNjF_lTlzz3AUCBoPzbIaulDsW5ijZnymOu9odY",
  },
  {
    id: 5,
    title: "Biblical Finance",
    category: "FINANCES",
    description:
      "Learn stewardship, budgeting, and generosity from a biblical perspective to achieve financial freedom.",
    instructor: "Elder David Chen",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmf5L95bU-g-RAS1xW7YmNmhSZZmmBwYOIDuGRjkxMwZiH7P-FquZEbVpVas-w3juD2DZuy_gzQUI9r0cPJgspQFBgbDqDj6UyaV0l-1uU9Abhc3dETGLFE0yAiM_XutWixLILFWaE5YMhhntWxm2b9MlkmuDaEfRuNtu6olTZ--yz5dwjO-Cnh7-n5BxqU5hHQ_z60Q4izkX08OumxSy3SKTarTBo14LkOVMehqUz39yDCj0wki2XAPS5Go-tRts7q3OdChvwJRHU",
  },
  {
    id: 6,
    title: "Overcoming Anxiety",
    category: "PERSONAL GROWTH",
    description:
      "Finding peace in a chaotic world through scripture, prayer, and practical mental health tools.",
    instructor: "Dr. Grace Kim",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBEixg6uj6DRdlyNddqIOOi4AK5RI9HfQzzz35QAGvaC3BUSvk-zQ-87IUrN47I4vU7M0V28CmCX-GjhyAZYj4C3uMib9c9UjD_NcVpTIlhwPi9txDOVgAfDYnxsfkFz-yQZz804lNhSNOOd0OAFGysA8sClkdzxB3r5Vs35xXTkZ4PgSdg8kEsYMkiTez4_ThbclObE0BQWeVA7qi58H2Ja8eTCcpmxeHXXQ1unnGEdUSZXzDQ3Y9qupL-mroxA8XGqxNOL7OM4DGv",
  },
];

const categories = [
  { name: "All Courses", isActive: true },
  { name: "Biblical Studies", isActive: false },
  { name: "Leadership", isActive: false },
  { name: "Marriage & Family", isActive: false },
  { name: "Finances", isActive: false },
  { name: "Discipleship", isActive: false },
];

const CoursesGrid = () => {
  return (
    <div className="container px-4 mx-auto space-y-10">
      <section className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.name}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              category.isActive
                ? "bg-primary text-white font-semibold shadow-md shadow-primary/20"
                : "bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary"
            }`}
          >
            {category.name}
          </button>
        ))}
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group flex flex-col bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all duration-300 h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${course.imageUrl}')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {/* Level badge removed from here */}
            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary dark:text-primary-light mb-2">
                  {course.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                  {course.description}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                  <User2 size={18} />
                  <span>{course.instructor}</span>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 mt-auto flex gap-3">
              <button className="flex-1 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                View Details
              </button>
              <button className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-center mt-4">
        <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
          Load More Courses
          <ChevronDown
            size={18}
            className="group-hover:translate-y-0.5 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default CoursesGrid;
