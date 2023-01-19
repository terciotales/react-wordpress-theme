<?php

class RWT_Supports extends RTW_Setup {
    public function setup() {
        add_action('after_setup_theme', [$this, 'theme_supports']);
        add_action('init', [$this, 'remove_supports']);
    }

    public function theme_supports() {
        add_theme_support('post-thumbnails');
        add_theme_support('responsive-embeds');
    }

    public function remove_supports() {
        $post_type = 'post';

        register_post_meta($post_type, 'teste', [
            'auth_callback'     => function () {
                return current_user_can('edit_posts');
            },
            'sanitize_callback' => 'sanitize_text_field',
            'show_in_rest'      => true,
            'single'            => true,
            'type'              => 'string',
        ]);


        remove_theme_support('core-block-patterns');
    }
}
