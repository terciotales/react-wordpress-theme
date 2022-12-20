import {PanelBody, ToggleControl, BaseControl, __experimentalInputControl as InputControl} from "@wordpress/components";

import {InspectorControls} from "@wordpress/block-editor";
const Inspector = ({attributes, setAttributes}) => {
    return (
        <InspectorControls>
            <PanelBody>
                <BaseControl
                    label={'Quantidades de galerias'}
                >
                    <InputControl
                        value={attributes.perPage}
                        type='number'
                        min={1}
                        max={10}
                        onChange={(newValue) => setAttributes({perPage: parseInt(newValue)})}
                    />
                </BaseControl>
                <ToggleControl
                    label={'Usar paginação'}
                    checked={attributes.usePagination}
                    onChange={(newValue) => setAttributes({usePagination: newValue})}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
