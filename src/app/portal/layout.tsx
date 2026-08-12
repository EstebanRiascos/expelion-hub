import Sidebar from "@/components/layout/Sidebar";
import PortalHeader from "@/components/layout/PortalHeader";
import { PortalProvider } from "@/components/providers/PortalProvider";


export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <PortalProvider>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">


        <Sidebar />


        <div
          className="
            lg:pl-72
          "
        >


          <PortalHeader />


          <main
            className="
              px-4
              py-6
              sm:px-6
              lg:px-8
            "
          >

            {children}

          </main>


        </div>


      </div>
    </PortalProvider>
  );

}
