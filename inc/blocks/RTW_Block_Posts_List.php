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
}
