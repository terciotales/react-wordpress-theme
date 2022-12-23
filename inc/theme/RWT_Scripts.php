<?php

class RWT_Scripts extends RTW_Setup {

    protected $theme_version = '1.0.0';

    public function setup() {
        add_action( 'wp_enqueue_scripts', [$this, '_enqueue_public_scripts'] );
        add_action( 'admin_enqueue_scripts', [$this, '_enqueue_admin_scripts'] );
        add_action( 'enqueue_block_editor_assets', [$this, '_enqueue_editor_assets'], 1 );
    }

    /**
     * Estilos e scripts para as páginas públicas.
     *
     * Obs. Os scripts do admin estão no seu arquivo de configuração.
     */
    public function _enqueue_public_scripts() {
        wp_enqueue_style(
            get_stylesheet() . '-style',
            THEME_BUNDLE_DIRECTORY_URI . '/public.css',
            false,
            $this->theme_version,
            'all'
        );

        wp_enqueue_script(
            get_stylesheet() . '-script',
            THEME_BUNDLE_DIRECTORY_URI . '/public.js',
            ['wp-hooks', 'jquery',],
            $this->theme_version,
            true
        );
    }

    public function _enqueue_admin_scripts() {
        wp_enqueue_style(
            get_stylesheet() . '-style-admin',
            THEME_BUNDLE_DIRECTORY_URI . '/admin.css',
            ['wp-components', 'code-editor'],
            $this->theme_version,
            'all'
        );

        wp_add_inline_script(
            'wp-codemirror',
            'window.CodeMirror = wp.CodeMirror;'
        );

        # Script from block
        $script_asset_path = THEME_BUNDLE_DIRECTORY . "/admin.asset.php";

        if ( ! is_readable( $script_asset_path ) ) {
            throw new Error(
                'You need to run `npm start` or `npm run build` for the "create-block/register-block-type" block first.'
            );
        }

        $script_asset = require( $script_asset_path );
        wp_enqueue_script(
            get_stylesheet() . '-script-admin',
            THEME_BUNDLE_DIRECTORY_URI . '/admin.js',
            array_merge( $script_asset['dependencies'], ['wp-hooks', 'csslint', 'code-editor'] ),
            $script_asset['version'],
            true
        );
    }

    /**
     * Load Gutenberg assets.
     */
    public function _enqueue_editor_assets() {
        wp_add_inline_script(
            'wp-codemirror',
            'window.CodeMirror = wp.CodeMirror;'
        );

        # Script from block
        $script_asset_path = THEME_BUNDLE_DIRECTORY . "/editor.asset.php";

        if ( ! is_readable( $script_asset_path ) ) {
            throw new Error(
                'You need to run `npm start` or `npm run build` for the "create-block/register-block-type" block first.'
            );
        }

        $script_asset = require( $script_asset_path );

        wp_enqueue_script(
            get_stylesheet() . '-script-editor',
            THEME_BUNDLE_DIRECTORY_URI . '/editor.js',
            array_merge( $script_asset['dependencies'], ['code-editor', 'csslint'] ),
            $script_asset['version'],
            true
        );

        wp_localize_script(
            get_stylesheet() . '-script-editor',
            'RTW_Object',
            [
                'postTypes' => array_map(function ($post_type) {
                    return $post_type->name = $post_type->labels->singular_name;
                }, get_post_types([], 'objects'))
            ]
        );

        wp_enqueue_style(
            get_stylesheet() . '-style-blocks',
            THEME_BUNDLE_DIRECTORY_URI . '/editor.css',
            ['code-editor'],
            $this->theme_version,
            'all'
        );

        wp_enqueue_style(
            get_stylesheet() . '-style',
            THEME_BUNDLE_DIRECTORY_URI . '/public.css',
            false,
            $this->theme_version,
            'all'
        );
    }
}
