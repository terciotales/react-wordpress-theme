import {
    PanelBody,
    ToggleControl,
    BaseControl,
    Button,
    __experimentalInputControl as InputControl,
    Dropdown,
    SelectControl,
    QueryControls,
    TextControl, Dashicon, Placeholder, Flex
} from "@wordpress/components";

import {__} from '@wordpress/i18n';

import {InspectorControls} from "@wordpress/block-editor";

import {useState} from "@wordpress/element";

import {useSelect} from "@wordpress/data";

import SettingTabs from "../components/setting-tabs";

const Inspector = ({attributes, setAttributes, args}) => {
    const {postType, order, orderBy, perPage, categories, offset} = args;

    const [tab, setTab] = useState('settings');

    const {categoriesList, postTypes} = useSelect(select => {
        const {getEntityRecords, getPostTypes} = select('core');

        return {
            postTypes: getPostTypes(),
            categoriesList: getEntityRecords('taxonomy', 'category', {per_page: 100, context: 'view'})
        };
    }, [postType, order, orderBy, perPage, categories, offset]);

    const categorySuggestions = categoriesList?.reduce(
        (accumulator, category) => ({
            ...accumulator,
            [category.name]: category
        }),
        {}
    );

    const selectedCategories = attributes.categories ? attributes.categories.map(category => {
        const cat = categoriesList?.find(cat => cat.id === Number(category.id));
        return {
            id: category.id,
            name: cat?.name || cat?.slug || ''
        };
    }) : [];

    const selectedCategoryId = ('object' === typeof attributes.categories) ?
        1 <= attributes.categories.length ? attributes.categories[0].id : undefined :
        attributes.categories;

    console.log(Object.entries(postTypes ?? {}));

    const selectCategories = value => {
        let categories;

        if ('object' === typeof value) {
            if (0 < value.length) {
                categories = value.map(name => {
                    if ('object' === typeof name) {
                        return name;
                    }

                    const category = categoriesList?.find(e => e.name === name);
                    if (category) {
                        return {
                            id: category.id,
                            name
                        };
                    }
                }).filter(e => undefined !== e);
            }
        } else if ('' !== value) {
            categories = [{
                id: value,
                name: categoriesList?.find(e => e.id === Number(value)).name
            }];
        }

        setAttributes({categories});
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
                <div className="container-controllers height-100">
                    {tab === 'settings' &&
                        <>
                            <SelectControl
                                label="Tipo de Postagem"
                                value={postType}
                                onChange={(value) => value && setAttributes({postType: value})}
                                options={
                                    [RTW_Object.postTypes]?.map(item => ({
                                        label: item.name,
                                        value: item.slug
                                    }))
                                }
                            />

                            <QueryControls
                                order={order}
                                orderBy={orderBy}
                                onOrderChange={value => setAttributes({order: value})}
                                onOrderByChange={value => setAttributes({orderBy: value})}
                                numberOfItems={perPage}
                                maxItems={20}
                                onNumberOfItemsChange={value => setAttributes({perPage: value})}
                                categorySuggestions={categorySuggestions}
                                selectedCategoryId={selectedCategoryId}
                                selectedCategories={selectedCategories}
                                onCategoryChange={selectCategories}
                            />

                            <TextControl
                                label={__('Offset')}
                                help={__('Número de posts para deslocar ou passar.')}
                                type="number"
                                value={offset}
                                min={0}
                                onChange={value => setAttributes({offset: Number(value)})}
                            />

                            <div className="floating-controls">
                                <Dropdown
                                    position="bottom center"
                                    expandOnMobile={true}
                                    renderToggle={({isOpen, onToggle}) => (
                                        <BaseControl label="Paginação" className='item-container' help="Divida os posts em páginas separadas.">
                                            <div className="dropdow-click-area">
                                                <Button className='dropdown-item' onClick={onToggle}
                                                        text={"Configurar"}/>
                                                <Dashicon icon={isOpen ? 'arrow-up-alt2' : 'arrow-down-alt2'}
                                                          className='arrow-down-alt2' onClick={onToggle}/>
                                            </div>
                                        </BaseControl>
                                    )}
                                    renderContent={() => (
                                        <div className="floating-controls-popover-settings">
                                            <Flex>
                                                <BaseControl label={__('Paginação')}/>
                                                <ToggleControl
                                                    checked={attributes.pagination}
                                                    onChange={value => setAttributes({pagination: value})}
                                                />
                                            </Flex>

                                            <Placeholder
                                                label="Navegação"
                                                instructions="Configure os botões de navegação"
                                                icon="leftright"
                                            >
                                                <Flex direction="column" gap="4">
                                                    <Flex>
                                                        <InputControl
                                                            label="Primeira"
                                                            disabled={!attributes.pagination}
                                                            value={attributes.paginationFirstText}
                                                            onChange={value => setAttributes({paginationFirstText: value})}
                                                            size="small"
                                                            style={{textAlign: 'center'}}
                                                        />
                                                        <InputControl
                                                            label="Última"
                                                            disabled={!attributes.pagination}
                                                            value={attributes.paginationLastText}
                                                            onChange={value => setAttributes({paginationLastText: value})}
                                                            size="small"
                                                            style={{textAlign: 'center'}}
                                                        />
                                                    </Flex>
                                                    <Flex>
                                                        <InputControl
                                                            label="Anterior"
                                                            disabled={!attributes.pagination}
                                                            value={attributes.paginationPrevText}
                                                            onChange={value => setAttributes({paginationPrevText: value})}
                                                            size="small"
                                                            style={{textAlign: 'center'}}
                                                        />

                                                        <InputControl
                                                            label="Elipse"
                                                            disabled={!attributes.pagination}
                                                            value={attributes.paginationEllipsis}
                                                            onChange={value => setAttributes({paginationEllipsis: value})}
                                                            size="small"
                                                            style={{textAlign: 'center'}}
                                                        />

                                                        <InputControl
                                                            label="Próxima"
                                                            disabled={!attributes.pagination}
                                                            value={attributes.paginationNextText}
                                                            onChange={value => setAttributes({paginationNextText: value})}
                                                            size="small"
                                                            style={{textAlign: 'center'}}
                                                        />
                                                    </Flex>
                                                </Flex>
                                            </Placeholder>
                                        </div>
                                    )}
                                />
                            </div>
                        </>
                    }
                </div>
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
