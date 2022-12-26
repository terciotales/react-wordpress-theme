import {registerBlockType} from '@wordpress/blocks';
import edit from './editor/edit';
import metadata from './block.json';

registerBlockType(metadata, {
    icon: {
        src: 'schedule',
        foreground: '#007cba',
    },
    keywords: [],
    edit,
    save: () => {
        return null;
    }
});
