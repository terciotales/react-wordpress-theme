<?php

if (!function_exists('get_version_block')) {
    function get_version_block(string $block_name): string {
		
        $block = file_get_contents(THEME_SRC_BLOCKS_DIRECTORY . $block_name . '/block.json');
        $block_obj = json_decode($block);

        return $block_obj->version ?? '1.0.0';
    }
}