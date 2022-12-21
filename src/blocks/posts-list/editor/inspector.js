import {
    PanelBody,
    ToggleControl,
    BaseControl,
    __experimentalInputControl as InputControl,
    SelectControl,
    QueryControls,
    TextControl
} from "@wordpress/components";

import { __ } from '@wordpress/i18n';

import {InspectorControls} from "@wordpress/block-editor";

import {useState} from "@wordpress/element";

import {useSelect} from "@wordpress/data";

import SettingTabs from "../components/setting-tabs";

const Inspector = ({attributes, setAttributes, args}) => {
    const {postType, order, orderBy, perPage, categories, offset} = args;

    const [tab, setTab] = useState('settings');

    const {postTypes, categoriesList} = useSelect(select => {
        const {getEntityRecords, getPostTypes} = select('core');

        return {
            postTypes: getPostTypes(),
            categoriesList:getEntityRecords( 'taxonomy', 'category', { per_page: 100, context: 'view' })
        };
    }, [postTypes, categories, order, orderBy, perPage]);

    const categorySuggestions = categoriesList?.reduce(
        ( accumulator, category ) => ({
            ...accumulator,
            [ category.name ]: category
        }),
        {}
    );

    const selectedCategories = attributes.categories ? attributes.categories.map( category => {
        const cat = categoriesList?.find( cat => cat.id === Number( category.id ) );
        return {
            id: category.id,
            name: cat?.name || cat?.slug || ''
        };
    }) : [];

    const selectedCategoryId = ( 'object' === typeof attributes.categories ) ?
        1 <= attributes.categories.length ? attributes.categories[0].id : undefined :
        attributes.categories;

    const selectCategories = value => {
        let categories;

        if ( 'object' === typeof value ) {
            if ( 0 < value.length ) {
                categories = value.map( name => {
                    if ( 'object' === typeof name ) {
                        return name;
                    }

                    const category = categoriesList?.find( e => e.name === name );
                    if ( category ) {
                        return {
                            id: category.id,
                            name
                        };
                    }
                }).filter( e => undefined !== e );
            }
        } else if ( '' !== value ) {
            categories = [{
                id: value,
                name: categoriesList?.find( e => e.id === Number( value ) ).name
            }];
        }

        setAttributes({ categories });
    };

    return (
        <InspectorControls>
            <PanelBody>
                <SettingTabs
                    state={tab}
                    setState={setTab}
                    options={[
                        {tab: 'settings', icon: 'admin-generic', label: 'Configurações'},
                        {tab: 'layout', icon: 'layout', label: 'Layout'}
                    ]}
                />
                <div className="container-controllers">
                    {tab === 'settings' &&
                        <>
                            <SelectControl
                                label="Tipo de Postagem"
                                value={postType}
                                onChange={(value) => value && setAttributes({postType: value})}
                                options={
                                    postTypes?.map(item => ({
                                        label: item.name,
                                        value: item.slug
                                    }))
                                }
                            />

                            <QueryControls
                                order={ order }
                                orderBy={ orderBy }
                                onOrderChange={ value => setAttributes({ order: value }) }
                                onOrderByChange={ value => setAttributes({ orderBy: value }) }
                                numberOfItems={ perPage }
                                maxItems={20}
                                onNumberOfItemsChange={ value => setAttributes({ perPage: value }) }
                                categorySuggestions={ categorySuggestions }
                                selectedCategoryId={ selectedCategoryId }
                                selectedCategories={ selectedCategories }
                                onCategoryChange={ selectCategories }
                            />

                            <TextControl
                                label={__('Offset')}
                                help={ __( 'Número de posts para deslocar ou passar.' ) }
                                type="number"
                                value={ offset }
                                min={ 0 }
                                onChange={ value => setAttributes({ offset: Number( value ) }) }
                            />
                        </>
                    }
                </div>
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
