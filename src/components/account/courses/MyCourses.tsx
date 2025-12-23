import React from 'react'
import CourseStats from './CourseStats'
import RecentCourse from './RecentCourse'
import EnrolledCourses from './EnrolledCourses'

const MyCourses = () => {
  return (
    <>
      <CourseStats />
      <RecentCourse />
      <EnrolledCourses />
    </>
  )
}

export default MyCourses