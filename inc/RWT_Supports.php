<?php

class RWT_Supports {
    public function __construct() {
        add_action('after_setup_theme', [$this, 'theme_supports']);
        add_action('init', [$this, 'remove_supports']);
    }

    public function theme_supports() {
        add_theme_support('post-thumbnails');
        add_theme_support('responsive-embeds');
    }

    public function remove_supports() {
        remove_theme_support('core-block-patterns');
    }
}
