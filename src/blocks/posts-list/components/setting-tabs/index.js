/**
 * WordPress dependencies
 */
import {Button, Dashicon} from "@wordpress/components";
import classnames from "classnames";

/**
 * Internal dependencies
 */
import "./index.scss";

const SettingTabs = ({state, setState, options}) => {
    return (
        <div className="component-setting-tabs">
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

export default SettingTabs;
