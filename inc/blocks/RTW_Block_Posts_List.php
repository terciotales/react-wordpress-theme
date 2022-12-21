<?php

class RTW_Block_Posts_List extends RTW_Block {
    public function on_create() {
        $this->name = 'posts-list';
    }

    public function render_block($attributes, $content, $block) {
        self::$instance_id++;

        $this->set_inline_scripts($attributes);

        $wrapper_attributes = get_block_wrapper_attributes(
            ['data-block-instance' => esc_attr(self::$instance_id)]
        );

        ob_start(); ?>
        <div <?= $wrapper_attributes ?>></div>
        <?php
        return ob_get_clean();
    }

    public function register_editor_assets(): void {
        wp_register_style(
            get_stylesheet() . '-style-editor-' . $this->name,
            THEME_SRC_BLOCKS_DIRECTORY_URI . "{$this->name}/frontend/{$this->name}.css",
            false,
            $this->version
        );

        wp_localize_script(
            get_stylesheet() . '-script-editor-' . $this->name,
            'RTW_' . str_replace('-', '_', $this->name),
            [
                'postTypes' => array_map(function ($post_type) {
                    return $post_type->name = $post_type->labels->singular_name;
                }, get_post_types([], 'objects'))
            ]
        );
    }
}
