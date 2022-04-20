import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { Button, Message } from "@components/ui/common";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";

export default function Course({ course }) {
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data); //if null then the current user is not an owner of the course, if there is data then user is the owner
  //const courseState = ownedCourse.data?.state;
  const courseState = "deactivated";

  console.log(ownedCourse);

  return (
    <>
      <div className="py-4">
        {" "}
        <CourseHero
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints points={course.wsl} />
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === "purchased" && (
            <Message type="warning">
              Course is purchased and waiting for activation. Process can take
              up to 24 hours
              <i className="block font-normal">
                in case of any questions, please contact info@eincode.com
              </i>
            </Message>
          )}
          {courseState === "activated" && (
            <Message type="success">
              Course is activated. Enjoy your course!
            </Message>
          )}
          {courseState === "deactivated" && (
            <Message type="danger">
              Course has been deactivated, due to incorrect purchase data. The
              functionality to watch the course has been temporarily disabled.
              <i className="block font-normal">
                in case of any questions, please contact info@eincode.com
              </i>
            </Message>
          )}
        </div>
      )}

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
