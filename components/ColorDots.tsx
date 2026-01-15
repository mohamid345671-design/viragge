interface ColorDotsProps {
    colors: string[];
}

const ColorDots = ({ colors }: ColorDotsProps) => {
    if (!colors || colors.length === 0) return null;

    const displayColors = colors.slice(0, 3);
    const remainingCount = colors.length - 3;

    return (
        <div className="flex items-center gap-1.5">
            {displayColors.map((color, index) => (
                <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-300 shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                />
            ))}
            {remainingCount > 0 && (
                <div className="text-[10px] font-semibold text-gray-600 ml-0.5">
                    +{remainingCount}
                </div>
            )}
        </div>
    );
};

export default ColorDots;
