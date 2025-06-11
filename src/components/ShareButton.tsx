"use client";

import { FiShare2 } from "react-icons/fi";
import Button from '@/components/Button';

interface Props {
    title: string;
    text: string;
}

const ShareButton = ({ title, text }: Props) => {
    const shareHandler = async () => {
        try {
            await navigator.share({
                title,
                text,
                url: window.location.href,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.log(`An error occurred when sharing the product: ${error.message}`);
            }
        }
    };

    return (
        <Button
            icon={<FiShare2 className="size-5" />}
            title={title}
            className="bg-red-primary !text-white px-8 py-3 !line-clamp-1 !w-full mt-8 !rounded-none"
            onClick={shareHandler}
        />
    );
};

export default ShareButton;