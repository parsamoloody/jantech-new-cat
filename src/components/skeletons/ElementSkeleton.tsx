interface Props {
    type: "avatar" | "thumbnail" | "picture" | "title" | "text";
    className?: string;
}

export default function ElementSkeleton({
    type,
    className,
}: Props) {
    switch (type) {
        case "avatar":
            return <div className={`w-16 h-16 rounded-full bg-gray-400/25 animate-pulse ${className}`} />;
        case "thumbnail":
            return <div className={`w-64 h-64 rounded-xs bg-gray-400/25 animate-pulse ${className}`} />;
        case "picture":
            return <div className={`w-full aspect-square rounded-xs bg-gray-400/25 animate-pulse ${className}`} />;
        case "title":
            return <div className={`w-full h-7 rounded-xs bg-gray-400/25 animate-pulse ${className}`} />;
        case "text":
            return <div className={`w-full h-4 rounded-xs bg-gray-400/25 animate-pulse ${className}`} />;
    }
}
