import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (courses, account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedCourses/${account}` : null),
    async () => {
      const ownedCourses = [];

      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];

        if (!course.id) {
          continue; //go to the next iteration
        }

        const courseHash = createCourseHash(web3)(course.id, account);
        //Fetch course from contract if purchased (exist)
        const ownedCourse = await contract.methods
          .getCourseByHash(courseHash)
          .call(); //.call does not cost any gas

        //if course is not owned
        if (
          ownedCourse.owner !== "0x0000000000000000000000000000000000000000"
        ) {
          const normalize = normalizeOwnedCourse(web3)(course, ownedCourse);
          ownedCourses.push(normalize);
        }
      }
      return ownedCourses;
    }
  );

  return swrRes;
};
