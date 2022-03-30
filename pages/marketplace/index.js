import { CourseList } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useAccount } from "@components/hooks/web3/useAccount";

export default function Marketplace({ courses }) {
  const { account } = useAccount(); //custom hook
  return (
    <>
      <div className="py-4">
        <WalletBar address={account.data} />
      </div>

      <CourseList courses={courses} />
    </>
  );
}

export function getStaticProps() {
  const { data, courseMap } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
