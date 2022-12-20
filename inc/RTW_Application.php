<?php

class RTW_Application {
    public function __construct() {
        add_action('init', [$this, 'init_classes']);
    }

    public function init_classes() {
        new RTW_Scripts();
        new RTW_Blocks();
    }
}