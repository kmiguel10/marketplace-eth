import { Hero, Breadcrumbs } from "@components/common";
import { OrderCard } from "@components/common/order";
import { CourseList } from "@components/course";
import { EthRates, WalletBar } from "@components/web3";
import { BaseLayout } from "@components/layout";

export default function Home() {
  return (
    <>
      <Hero />
      <Breadcrumbs />
      <WalletBar />
      <EthRates />
      <OrderCard />
      <CourseList />
    </>
  );
}

Home.Layout = BaseLayout;
