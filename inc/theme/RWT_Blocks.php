<?php

class RWT_Blocks extends RTW_Setup {
    public function setup() {
	    global $wp_version;
	    $block_hook = version_compare( $wp_version, '5.8', '<' ) ? 'block_categories' : 'block_categories_all';
	    add_action( $block_hook, [ $this, '_register_blocks_categories' ] );
        add_action( 'after_setup_theme', [ $this, '_register_blocks' ] );
    }

	public function _register_blocks_categories( $categories ): array {
		return array_merge( [
			[
				'slug'  => get_stylesheet(),
				'title' => __( wp_get_theme()->get( 'Name' ) ),
			],
		],
			$categories
		);
	}
    public function _register_blocks() {
        $blocks = [
            "RTW_Block_Posts_List",
        ];

        foreach ( $blocks as $value ) {
            if ( class_exists( $value ) ) {
                $value::get_instance()->init();
            }
        }
    }
}
