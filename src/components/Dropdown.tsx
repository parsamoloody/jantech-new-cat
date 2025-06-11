"use client";

import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
    title: string;
    content: string;
}

export default function Dropdown({ title, content }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px");

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen]);

    return (
        <div className="bg-white my-1 max-w-2xl mx-auto">
            <div
                className="flex items-center justify-between p-4 cursor-pointer select-none"
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span>{title}</span>
                <IoIosArrowDown
                    className={`size-5 transition-transform duration-300 ease-linear ${
                        isOpen ? "-rotate-180" : "rotate-0"
                    }`}
                />
            </div>

            <div
                ref={contentRef}
                style={{ maxHeight: height }}
                className="transition-[max-height] duration-300 ease-linear overflow-hidden px-4 bg-white"
            >
                <div className="py-2">{content}</div>
            </div>
        </div>
    );
}