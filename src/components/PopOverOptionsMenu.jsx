import { useState } from "react";
import PropTypes from "prop-types";
import { Popover } from "react-tiny-popover";
import { BsThreeDots } from "react-icons/bs";

const PopOverOptionsMenu = ({
    align = "end",
    positions = ["bottom", "left", "right", "top"],
    content,
}) => {
    const [popOverMenu, setPopOverMenu] = useState(false);

    return (
        <Popover
            align={align}
            isOpen={popOverMenu}
            positions={positions}
            content={content}
            onClickOutside={() => setPopOverMenu(false)}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setPopOverMenu((prev) => !prev)
                }}
                className="rounded-full p-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800"
            >
                <BsThreeDots size="25" />
            </button>
        </Popover>
    );
};

PopOverOptionsMenu.propTypes = {
    align: PropTypes.string,
    positions: PropTypes.array,
    content: PropTypes.node,
};
export default PopOverOptionsMenu;
