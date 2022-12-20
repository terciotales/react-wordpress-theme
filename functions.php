<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/inc/helpers.php';
require_once __DIR__ . '/inc/constants.php';

try {
    RTW_Application::get_instance()->init();
} catch (Exception $e) {
    echo $e->getMessage();
}
