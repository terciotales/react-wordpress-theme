<?php

class RWT_Supports {
    public function __construct() {
        add_action('init', [$this, 'theme_supports']);
    }

    public function theme_supports() {
        add_theme_support('post-thumbnails');
        add_theme_support('responsive-embeds');
    }
}