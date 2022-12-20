<?php

class RTW_Block_Posts_List extends RTW_Block {

	protected $name = 'posts-list';
	protected $version = '1.0.0';
	public static $instance_id = 0;

	public function setup() {
//		$this->version = get_version_block( $this->name );

		add_action( 'init', [ $this, '_register_blocks' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_enqueue_style' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_style_editor' ] );
	}

	public function _register_blocks() {


		register_block_type(
			get_template_directory() . '/bundle/blocks/' . $this->name,
			[
				'render_callback' => [
					$this,
					'_render_block'
				]
			]
		);
	}

	public function _enqueue_style_editor() {
		wp_register_style(
			get_stylesheet() . '-style-editor-' . $this->name,
			THEME_SRC_BLOCKS_DIRECTORY . $this->name . '.css',
			false,
			$this->version
		);
	}

	public function _enqueue_style() {
		wp_enqueue_style(
			get_stylesheet() . '-style-' . $this->name,
			THEME_SRC_BLOCKS_DIRECTORY . $this->name . '.css',
			false,
			$this->version
		);
	}

	public function _render_block( $attributes, $content, $block ) {

		self::$instance_id ++;

		wp_enqueue_script(
			get_stylesheet() . '-script-' . $this->name,
			THEME_SRC_BLOCKS_DIRECTORY . $this->name . '.js',
			['wp-element'],
			$this->version
		);

		wp_add_inline_script(
			get_stylesheet() . '-script-' . $this->name,
			$this->get_inline_script( $attributes ),
			'before'
		);

		$wrapper_attributes = get_block_wrapper_attributes(
			[ 'data-block-instance' => esc_attr( self::$instance_id ) ]
		);

		ob_start(); ?>
        <div <?= $wrapper_attributes ?>>

        </div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Gets the inline script for the block attributes.
	 *
	 * @param array $props The props to add to the variable.
	 *
	 * @return string The inline script.
	 */
	private function get_inline_script( $props ) {
		ob_start();
		?>
        if ( 'undefined' === typeof postsList ) {
        var postsList = {};
        }

        postsList[ <?php echo esc_js( self::$instance_id ); ?> ] = <?php echo wp_json_encode( $props ); ?>;
		<?php
		return ob_get_clean();
	}
}