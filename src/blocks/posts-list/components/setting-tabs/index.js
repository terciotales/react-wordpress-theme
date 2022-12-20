/**
 * WordPress dependencies
 */
import {Button, Dashicon} from "@wordpress/components";
import classnames from "classnames";

/**
 * Internal dependencies
 */
import "./editor.scss";

const ControllerButtons = ({state, setState, options}) => {
    return (
        <div className="package-component-controller-buttons">
            {options?.map((option, index) => (
                <Button
                    className={
                        classnames(
                            'button-tab',
                            {'is-active': option.tab === state}
                        )
                    }
                    onClick={() => setState(option.tab)}
                    key={index}
                >
                    <span>
                        <Dashicon icon={option.icon}/>
                        <p>{option.label}</p>
                    </span>
                </Button>
            ))}
        </div>
    )
}

export default ControllerButtons;
