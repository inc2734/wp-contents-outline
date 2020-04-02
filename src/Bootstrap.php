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
		wp_enqueue_script(
			'jquery.contents-outline',
			get_template_directory_uri() . '/vendor/inc2734/wp-contents-outline/src/assets/packages/jquery.contents-outline/dist/jquery.contents-outline.min.js',
			[ 'jquery' ],
			filemtime( get_template_directory() . '/vendor/inc2734/wp-contents-outline/src/assets/packages/jquery.contents-outline/dist/jquery.contents-outline.min.js' ),
			true
		);

		$asset = include( get_template_directory() . '/vendor/inc2734/wp-contents-outline/src/assets/js/app.asset.php' );
		wp_enqueue_script(
			'wp-contents-outline',
			get_template_directory_uri() . '/vendor/inc2734/wp-contents-outline/src/assets/js/app.js',
			array_merge( $asset['dependencies'], [ 'jquery.contents-outline' ] ),
			filemtime( get_template_directory() . '/vendor/inc2734/wp-contents-outline/src/assets/js/app.js' ),
			true
		);
	}
}
