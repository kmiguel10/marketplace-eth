import { CourseList, CourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "content/courses/fetcher";
import { EthRates, WalletBar } from "@components/ui/web3";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { useEthPrice } from "@components/hooks/useEthPrice";

export default function Marketplace({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { account } = useAccount(); //custom hook
  const { network } = useNetwork();
  const { eth } = useEthPrice();

  //User can purchase if there is account data and connected to the coorect network
  const canPurchaseCourse = !!(account.data && network.isSupported); //!! to get boolean

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
        <EthRates eth={eth.data} ethPerItem={eth.perItem} />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            disabled={!canPurchaseCourse}
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button
                  disabled={!canPurchaseCourse}
                  onClick={() => setSelectedCourse(course)}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
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
