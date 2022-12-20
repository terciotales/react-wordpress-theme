<?php

class RTW_Block_Posts_List extends RTW_Setup {

    protected string $name = 'posts-list';
    protected string $version;
    public function setup() {
        add_action( 'init', [ $this, '_register_blocks' ] );
        add_action( 'wp_enqueue_scripts', [ $this, '_enqueue_style' ] );
        add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_style_editor' ] );
    }

    public function _register_blocks() {
        register_block_type(
            THEME_SRC_BLOCKS_DIRECTORY . $this->name,
            [ 'render_callback' => [ $this, '_render_block' ] ]
        );
    }

    public function _enqueue_style_editor() {
        wp_register_style(
            get_stylesheet() . '-style-editor-' . $this->name,
            BLOCKS_BUNDLE_DIRECTORY . $this->name . '.css',
            false,
            $this->version
        );
    }

    public function _enqueue_style() {
        wp_register_style(
            get_stylesheet() . '-style-' . $this->name,
            BLOCKS_BUNDLE_DIRECTORY . $this->name . '.css',
            false,
            $this->version
        );

        wp_register_script(
            get_stylesheet() . '-script-' . $this->name,
            BLOCKS_BUNDLE_DIRECTORY . $this->name . '.js',
            [ 'wp-hooks' ],
            $this->version
        );
    }

    public function _render_block( $attributes, $content, $block ) {

        $wrapper_attributes = get_block_wrapper_attributes( [] );

        $args = [
            'post_type'      => 'galerias',
            'posts_per_page' => $attributes['perPage'] ?? 5,
            'post_status'    => 'publish',
            'orderby'        => 'date',
            'order'          => 'DESC',
            'paged'          => !empty($_GET['pg']) ? $_GET['pg'] : 1
        ];


        $query = new WP_Query( $args );

        ob_start(); ?>
        <section <?= $wrapper_attributes ?>>
            <?php
            if ( $query->have_posts() ) { ?>
                <div class="galleries-list">
                    <?php while ( $query->have_posts() ) {
                        $query->the_post();
                        load_static_patterns( 'feed-gallery' );
                    } ?>
                </div>
            <?php }

            if ( $attributes['usePagination'] ) { ?>
                <div class="pagination-wrapper">
                    <?php load_static_patterns( 'pagination', [
                        'total'  => $query->max_num_pages,
                        'format' => '?pg=%#%',
                        'current' => !empty($_GET['pg']) ? $_GET['pg'] : 1
                    ] ); ?>
                </div>
            <?php } ?>
        </section>
        <?php
        return ob_get_clean();
    }
}