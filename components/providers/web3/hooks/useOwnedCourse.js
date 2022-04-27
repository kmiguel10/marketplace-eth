import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (course, account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/ownedCourse/${account}` : null),
    async () => {
      const courseHash = createCourseHash(web3)(course.id, account);

      //Fetch course from contract if purchased (exist)
      const ownedCourse = await contract.methods
        .getCourseByHash(courseHash)
        .call(); //.call does not cost any gas

      //if course is not owned
      if (ownedCourse.owner === "0x0000000000000000000000000000000000000000") {
        return null;
      }

      return normalizeOwnedCourse(web3)(course, ownedCourse);
    }
  );

  return swrRes;
};
