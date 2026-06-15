import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {AppHeader} from "@/components/app-header";

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full h-full">
                <AppHeader>
                    <SidebarTrigger />
                </AppHeader>
                {children}
            </main>
        </SidebarProvider>
    )
}
    