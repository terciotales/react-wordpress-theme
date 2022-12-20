<?php

abstract class RTW_Block extends RTW_Setup {

    protected $name;

    protected $version;

    protected static $instance_id = 0;

    protected $hook_register_block = 'init';

    protected $hook_register_editor_assets = 'enqueue_block_editor_assets';

    protected $hook_register_frontend_assets = 'wp_enqueue_scripts';

    protected function setup() {
        $this->version = get_version_block($this->name);

        add_action($this->hook_register_block, [$this, 'register_blocks']);
        add_action($this->hook_register_editor_assets, [$this, 'register_editor_assets']);
        add_action($this->hook_register_frontend_assets, [$this, 'register_frontend_assets']);
    }

    public function register_blocks(): void {
        register_block_type_from_metadata(THEME_SRC_BLOCKS_DIRECTORY . $this->name,
            ['render_callback' => [$this, 'render_block']]
        );
    }

    protected function render_block($attributes, $content, $block) {
    }

    public function register_editor_assets(): void {
        wp_register_style(
            get_stylesheet() . '-style-editor-' . $this->name,
            THEME_SRC_BLOCKS_DIRECTORY_URI . "{$this->name}/frontend/{$this->name}.css",
            false,
            $this->version
        );
    }

    public function register_frontend_assets(): void {
        wp_enqueue_style(
            get_stylesheet() . '-style-' . $this->name,
            THEME_SRC_BLOCKS_DIRECTORY_URI . "{$this->name}/frontend/{$this->name}.css",
            false,
            $this->version
        );
    }

    protected function set_inline_scripts($attributes) {
        wp_enqueue_script(
            get_stylesheet() . '-script-' . $this->name,
            THEME_SRC_BLOCKS_DIRECTORY_URI . "{$this->name}/frontend/{$this->name}.js",
            ['wp-element', 'wp-dom-ready'],
            $this->version
        );

        wp_add_inline_script(
            get_stylesheet() . '-script-' . $this->name,
            $this->get_inline_script($attributes),
            'before'
        );
    }

    /**
     * Gets the inline script for the block attributes.
     *
     * @param $attributes
     * @return string The inline script.
     */
    protected function get_inline_script($attributes): string {
        $object_name = 'RTW_' . str_replace('-', '_', $this->name);
        $script = '';

        ob_start();

        $script .= sprintf("if( 'undefined' === typeof %s) { var %s = {}; }", $object_name, $object_name);
        $script .= sprintf('%s[%s] = %s;', $object_name, esc_js(self::$instance_id), wp_json_encode($attributes));

        echo $script;

        return ob_get_clean();
    }
}
