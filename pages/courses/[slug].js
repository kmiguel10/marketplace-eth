import { Modal } from "@components/common";
import { CourseHero, Curriculum, Keypoints } from "@components/course";
import { BaseLayout } from "@components/layout";
import { getAllCourses } from "content/courses/fetcher";

export default function Course({ course }) {
  return (
    <>
      <div className="py-4">
        {" "}
        {course.title}
        <CourseHero />
      </div>
      <Keypoints />
      <Curriculum />
      <Modal />
    </>
  );
}

export function getStaticPaths() {
  //get courses
  const { data } = getAllCourses();

  //Transforms [] of obj into [] of params
  return {
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

//returns course data
export function getStaticProps({ params }) {
  const { data, courseMap } = getAllCourses();
  //Filter for specific course - compare to params
  const course = data.filter((c) => c.slug === params.slug)[0]; //[0] because an [] is returned with 1 item
  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
