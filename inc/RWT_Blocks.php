<?php

class RWT_Blocks {
    public function __construct() {
        add_action('init', [$this, 'theme_block_additional_styles']);
    }

    public function theme_block_additional_styles() {
        $styled_blocks = [];

        foreach ($styled_blocks as $block_name) {
            $args = array(
                'handle' => "react-wodpress-theme-$block_name",
                'src' => get_theme_file_uri("bundle/styles/blocks/$block_name.css"),
                $args['path'] = get_theme_file_path("bundle/styles/blocks/$block_name.css"),
            );

            wp_enqueue_block_style("core/$block_name", $args);
        }
    }
}