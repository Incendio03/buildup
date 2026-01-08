import React from "react";

interface FlipCardProps {
  frontTitle?: string;
  frontText?: string;
  backTitle?: string;
  backText?: string;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
  width?: string;
  height?: string;
}

export function FlipCard({
  frontTitle = "FLIP CARD",
  frontText = "Hover Me",
  backTitle = "BACK",
  backText = "Leave Me",
  frontContent,
  backContent,
  width = "w-[190px]",
  height = "h-[254px]",
}: FlipCardProps) {
  return (
    <div className={`group ${width} ${height} [perspective:1000px]`}>
      <div className="relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute flex flex-col justify-center items-center w-full h-full shadow-lg border-2 border-foreground rounded-2xl bg-secondary text-foreground [backface-visibility:hidden]">
          {frontContent || (
            <>
              <p className="text-2xl font-black m-0">{frontTitle}</p>
              <p>{frontText}</p>
            </>
          )}
        </div>

        {/* Back */}
        <div className="absolute flex flex-col justify-center items-center w-full h-full shadow-lg border-2 border-primary rounded-2xl bg-background text-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {backContent || (
            <>
              <p className="text-2xl font-black m-0 text-primary">
                {backTitle}
              </p>
              <p>{backText}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
