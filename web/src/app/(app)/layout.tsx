import { SideMenu } from "~/components/side-menu";
import { MainHeader } from "~/components/main-header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-secondary-foreground">
      <SideMenu />
      <div className="flex-1 flex flex-col">
        <MainHeader />
        <div className="flex-1 p-10 border borde-red-600 bg-background rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
