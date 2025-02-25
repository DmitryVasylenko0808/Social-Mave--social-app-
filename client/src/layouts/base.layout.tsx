import { Outlet } from "react-router";
import { Header } from "../modules/common/components";
import { Container, Loader } from "../modules/common/ui";
import SideBar from "../modules/common/components/sidebar.component";
import { Suspense } from "react";

const BaseLayout = () => {
  return (
    <main className="dark:bg-dark-100">
      <Header />
      <main>
        <Container className="flex">
          <SideBar />
          <section className="flex-auto border-r border-secondary-50 dark:border-dark-200">
            <Suspense fallback={<Loader className="py-12" position="center" />}>
              <Outlet />
            </Suspense>
          </section>
        </Container>
      </main>
    </main>
  );
};

export default BaseLayout;
