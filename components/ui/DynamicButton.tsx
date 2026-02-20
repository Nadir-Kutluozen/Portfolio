import React, { useRef, useState, ElementType, ReactNode } from "react";
import Link from "next/link";
import styles from './DynamicButton.module.css';

interface DynamicButtonProps {
    children: ReactNode;
    href?: string;
    className?: string;
    onClick?: () => void;
    as?: ElementType;
    [key: string]: any;
}

const DynamicButton = ({ children, href, className = "", onClick, as, ...props }: DynamicButtonProps) => {
    const buttonRef = useRef<HTMLElement>(null);
    const [hoverDir, setHoverDir] = useState<"left" | "right">("left");
    const [hovering, setHovering] = useState(false);

    const getDirection = (e: React.MouseEvent<HTMLElement>) => {
        if (!buttonRef.current) return "left";
        const rect = buttonRef.current.getBoundingClientRect();
        return e.clientX - rect.left < rect.width / 2 ? "left" : "right";
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
        setHoverDir(getDirection(e));
        setHovering(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
        setHoverDir(getDirection(e)); // keep origin same as exit
        setHovering(false);
    };

    const combinedClassName = `${styles.dynamicButton} ${styles[hoverDir]} ${hovering ? styles.hovering : ''} ${className}`;

    if (href) {
        if (href.startsWith("http") || href.startsWith("mailto")) {
            return (
                <a
                    href={href}
                    ref={buttonRef as any}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={onClick}
                    className={combinedClassName}
                    {...props}
                >
                    {children}
                </a>
            );
        }
        return (
            <Link
                href={href}
                ref={buttonRef as any}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                className={combinedClassName}
                {...props}
            >
                {children}
            </Link>
        );
    }

    const Component: any = as || "button";

    return React.createElement(
        Component,
        {
            ref: buttonRef,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onClick,
            className: combinedClassName,
            ...props
        },
        children
    );
};

export default DynamicButton;
