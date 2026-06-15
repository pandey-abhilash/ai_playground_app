import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { Settings } from 'lucide-react';

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader >
                <div className="text-lg font-extrabold italic text-center p-4">
                    Talksy
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />

                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <div className="flex bg-neutral-700 text-white line-height-4 justify-center font-light italic p-2">
                    <Settings  className="cursor-pointer"/>
                    <div className="ml-2 text-sm cursor-pointer">
                        Settings
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}