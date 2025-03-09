import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import { useState, useEffect } from "react";

const NavigationButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(!disabled);

  useEffect(() => {
    if (!disabled) {
      setIsVisible(true);
    } else {
      // Delay hiding to allow fade-out animation
      const timeout = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [disabled]);

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full bg-white/90 backdrop-blur-sm border-gray-200 shadow-md p-8 transition-opacity duration-200 ${
        disabled ? "opacity-0 cursor-not-allowed" : "opacity-100"
      } ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}
      onClick={onClick}
    >
      {direction === "left" ? (
        <ChevronLeft className="size-8" />
      ) : (
        <ChevronRight className="size-8" />
      )}
    </Button>
  );
};

export default NavigationButton;
