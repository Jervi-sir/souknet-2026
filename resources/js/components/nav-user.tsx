import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';

export function NavUser() {
    const { auth } = usePage().props as any;
    const isMobile = useIsMobile();

    // Check if we are inside a SidebarProvider
    let isInsideSidebar = true;
    let sidebarState = 'expanded';

    try {
        const sidebar = useSidebar();
        sidebarState = sidebar.state;
    } catch (e) {
        isInsideSidebar = false;
    }

    if (!auth?.user) {
        return null;
    }

    const triggerButton = isInsideSidebar ? (
        <SidebarMenuButton
            size="lg"
            className="group text-sidebar-accent-foreground data-[state=open]:bg-[#22252e] hover:bg-[#22252e] transition-colors border border-[#262930] bg-[#111111]"
            data-test="sidebar-menu-button"
        >
            <UserInfo user={auth.user} />
            <ChevronsUpDown className="ml-auto size-4 text-[#8f9bba]" />
        </SidebarMenuButton>
    ) : (
        <button
            type="button"
            className="flex w-full items-center gap-2 overflow-hidden rounded-sm p-2 text-left text-sm text-sidebar-accent-foreground border border-[#262930] bg-[#111111] hover:bg-[#22252e] transition-colors h-12 focus:outline-none cursor-pointer"
        >
            <UserInfo user={auth.user} />
            <ChevronsUpDown className="ml-auto size-4 text-[#8f9bba] shrink-0" />
        </button>
    );

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {triggerButton}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm bg-[#0c0d12] border border-[#262930] text-white"
                        align="end"
                        side={isMobile ? 'bottom' : sidebarState === 'collapsed' ? 'left' : 'bottom'}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
