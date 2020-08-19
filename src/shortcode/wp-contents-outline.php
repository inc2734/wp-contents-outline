<?php
/**
 * @package inc2734/wp-contents-outline
 * @author inc2734
 * @license GPL-2.0+
 */

use Inc2734\WP_Contents_Outline\App\View;

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
				'title'                      => __( 'Outline', 'inc2734-wp-contents-outline' ),
				'selector'                   => null,
				'headings'                   => 'h2,h3,h4,h5,h6',
				'post_id'                    => get_the_ID(),
				'move_to_before_1st_heading' => 'false',
				'id'                         => 'wpco-' . uniqid( rand() ),
				'class'                      => null,
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
		$post_class = '.post-' . $post_id;

		ob_start();

		View::render(
			'wp-contents-outline',
			null,
			[
				'wpco_id'    => $attributes['id'],
				'wpco_class' => $attributes['class'],
				'post_class' => $post_class,
				'attributes' => $attributes,
			]
		);

		return ob_get_clean();
	}
);
