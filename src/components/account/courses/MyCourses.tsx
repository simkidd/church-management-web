import CourseStats from './CourseStats'
import EnrolledCourses from './EnrolledCourses'

const MyCourses = () => {
  return (
    <div className="space-y-8">
      <CourseStats />
      <EnrolledCourses />
    </div>
  )
}

export default MyCourses