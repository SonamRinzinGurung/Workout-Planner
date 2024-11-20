import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Sheet } from "react-modal-sheet";
import { BsThreeDots } from "react-icons/bs";

const MobileBottomSheet = ({ content }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close the bottom sheet when clicking outside the container
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setIsOpen]);

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev)
                }}
                className="rounded-full p-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800"
            >
                <BsThreeDots size="25" />
            </button>
            <Sheet
                isOpen={isOpen}
                detent="content-height"
                onClose={() => setIsOpen(false)}
                dragToDismiss={true}
            >
                <Sheet.Container
                    className="bg-black"
                    ref={containerRef}
                    style={{
                        padding: "16px",
                        backgroundColor: "var(--bottom-sheet-bg-color)",
                        color: "var(--bottom-sheet-text-color)",

                    }}

                >
                    <Sheet.Content>{content}</Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </>
    );
};

MobileBottomSheet.propTypes = {
    content: PropTypes.node,
};
export default MobileBottomSheet;
