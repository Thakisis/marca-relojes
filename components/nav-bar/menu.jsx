import React from "react";
import { cn } from "@/lib/utils";

import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";


function Menu({ href, children,links, ...otherProps }) {
    if (!otherProps.type) {

        return (
            <NavigationMenuItem>
                <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {children}
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        )
    }
    const classColor = href !== "/store" ? "bg-black/20 text-white" : "bg-white text-black"

    const otherLinks= links.map((link, index) => {
        return (
            <ListItem key={index} {...link}>
                {link.description}
            </ListItem>
        )
    })
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger><Link href={href}>{children}</Link></NavigationMenuTrigger>
            <NavigationMenuContent className={classColor} >
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] isolate">
                    <li className="relative row-span-3">

                        <NavigationMenuLink asChild>
                            <Link
                                className="flex relative h-full w-full select-none flex-col justify-Start rounded-md  no-underline outline-none focus:shadow-md overflow-clip"
                                href={href}
                            >

                                <LeftMenu {...otherProps} />

                            </Link>
                        </NavigationMenuLink>
                    </li>
                    {otherLinks}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}

export default Menu;

function LeftMenu({ type, background, textClass, imageTitle }) {
    if (type === "video")
        return (
            <>
                <video className="absolute inset-0 object-contains object-center" autoPlay loop muted>
                    <source src={`/videos/${background}`} type="video/mp4" />
                </video>
                <div className={cn("relative text-center mt-2 z-10 w-full text-2xl font-medium", textClass)}>
                    {imageTitle}
                </div>
            </>)
    if (type === "image") return (
        <>
            <Image width={600} height={816} src={`/img/${background}`} alt={imageTitle} className="absolute inset-0 object-contains bg-black object-center" />


        </>
    )
}



const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";