

import * as React from "react";
import { menus } from "@/constants";

import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Menu from "./menu";


export function MainMenu() {
    const menuslist = menus.map((menu) => (<Menu key={menu.href} {...menu}>{menu.text}</Menu>))
    return (
        <NavigationMenu >
            <NavigationMenuList>
                {menuslist}


            </NavigationMenuList>
        </NavigationMenu>
    );
}


