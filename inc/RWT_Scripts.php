<?php

class RWT_Scripts {
    public function __construct() {
        add_action('wp_enqueue_scripts', [$this, 'load_assets']);
        add_action('after_setup_theme', [$this, 'add_support']);
    }

    public function load_assets() {
        wp_enqueue_script('ourmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
        wp_enqueue_style('ourmaincss', get_theme_file_uri('/build/index.css'));
    }

    public function add_support() {
        add_theme_support('title-tag');
        add_theme_support('post-thumbnails');
    }
}