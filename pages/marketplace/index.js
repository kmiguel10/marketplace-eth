import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { WalletBar } from "@components/ui/web3";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";

export default function Marketplace({ courses }) {
  const { account } = useAccount(); //custom hook
  const { network } = useNetwork();
  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasInitialResponse,
          }}
        />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button variant="lightPurple">Purchase</Button>
              </div>
            )}
          />
        )}
      </CourseList>
      <OrderModal />
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
