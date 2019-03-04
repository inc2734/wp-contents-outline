<?php
/**
 * @package inc2734/wp-contents-outline
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Inc2734\WP_Contents_Outline;

class Bootstrap {

	public function __construct() {
		load_textdomain( 'inc2734-wp-contents-outline', __DIR__ . '/languages/' . get_locale() . '.mo' );

		$includes = array(
			'/shortcode',
		);
		foreach ( $includes as $include ) {
			foreach ( glob( __DIR__ . $include . '/*.php' ) as $file ) {
				if ( false !== strpos( basename( $file ), '_' ) ) {
					continue;
				}

				require_once( $file );
			}
		}

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
		$relative_path = '/vendor/inc2734/wp-contents-outline/src/assets/packages/jquery.contents-outline/dist/jquery.contents-outline.min.js';
		$src  = get_template_directory_uri() . $relative_path;
		$path = get_template_directory() . $relative_path;

		wp_enqueue_script(
			'jquery.contents-outline',
			$src,
			[ 'jquery' ],
			filemtime( $path ),
			true
		);

		$relative_path = '/vendor/inc2734/wp-contents-outline/src/assets/js/app.min.js';
		$src  = get_template_directory_uri() . $relative_path;
		$path = get_template_directory() . $relative_path;

		wp_enqueue_script(
			'wp-contents-outline',
			$src,
			[ 'jquery.contents-outline' ],
			filemtime( $path ),
			true
		);
	}
}
