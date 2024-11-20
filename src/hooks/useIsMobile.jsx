import { useState, useEffect } from "react";

const useIsMobile = (minSize = 430) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const isSmallScreen = window.innerWidth < minSize;
            setIsMobile(isSmallScreen);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, [minSize]);

    return isMobile;
};

export default useIsMobile;
