<?php
/**
 * @package inc2734/wp-contents-outline
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Inc2734\WP_Contents_Outline;

class Bootstrap {

	/**
	 * Constructor
	 */
	public function __construct() {
		load_textdomain( 'inc2734-wp-contents-outline', __DIR__ . '/languages/' . get_locale() . '.mo' );

		include_once( __DIR__ . '/shortcode/wp-contents-outline.php' );

		if ( apply_filters( 'inc2734_wp_contents_outline_enqueue_js', true ) ) {
			add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ] );
		}
	}

	/**
	 * Enqueue assets
	 *
	 * @return void
	 */
	public function _wp_enqueue_scripts() {
		wp_enqueue_script(
			'contents-outline',
			get_template_directory_uri() . '/vendor/inc2734/wp-contents-outline/src/assets/packages/@inc2734/contents-outline/dist/index.js',
			[],
			filemtime( get_template_directory() . '/vendor/inc2734/wp-contents-outline/src/assets/packages/@inc2734/contents-outline/dist/index.js' ),
			true
		);

		wp_enqueue_script(
			'wp-contents-outline',
			get_template_directory_uri() . '/vendor/inc2734/wp-contents-outline/src/assets/js/app.js',
			[ 'contents-outline' ],
			filemtime( get_template_directory() . '/vendor/inc2734/wp-contents-outline/src/assets/js/app.js' ),
			true
		);
	}
}
