import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";

export default function Course({ course }) {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);

  console.log(ownedCourse);

  return (
    <>
      <div className="py-4">
        {" "}
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints points={course.wsl} />
      <Curriculum locked={true} />
      <Modal />
    </>
  );
}

//specifies how many pages we want to create - returns param for chosen course
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
