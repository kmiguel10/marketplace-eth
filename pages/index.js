import { Navbar, Footer, Hero, Breadcrumbs } from "@components/common";
import { OrderCard } from "@components/common/order";
import { CourseList } from "@components/course";
import { EthRates, WalletBar } from "@components/web3";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar />
          <div className="fit">
            <Hero />
            <Breadcrumbs />
            <WalletBar />
            <EthRates />
            <CourseList />
            <OrderCard />
          </div>
        </div>
        {/*------ FOOTER STARTS ------*/}
        <Footer />
        {/*------ FOOTER ENDS ------*/}
      </div>
    </div>
  );
}
