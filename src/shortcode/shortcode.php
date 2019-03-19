<?php
/**
 * @package inc2734/wp-contents-outline
 * @author inc2734
 * @license GPL-2.0+
 */

/**
 * @param array $attributes
 *        @var string selector
 *        @var int post_id
 * @return void
 */
add_shortcode(
	'wp_contents_outline',
	function( array $attributes = [] ) {
		if ( ! is_singular() ) {
			return;
		}

		$attributes = shortcode_atts(
			[
				'selector'                   => null,
				'headings'                   => 'h2,h3,h4,h5,h6',
				'post_id'                    => get_the_ID(),
				'move_to_before_1st_heading' => 'false',
			],
			$attributes
		);

		$attributes = apply_filters( 'inc2734_wp_contents_outline_args', $attributes );

		if ( empty( $attributes['post_id'] ) ) {
			return;
		}

		$_post = get_post( $attributes['post_id'] );
		if ( ! $_post ) {
			return;
		}

		$post_id    = $_post->ID;
		$post_type  = $_post->post_type;
		$post_class = '.post-' . $post_id;
		$wpco_id    = 'wpco-' . uniqid( rand() );

		ob_start();
		include( __DIR__ . '/_view.php' );
		return ob_get_clean();
	}
);
