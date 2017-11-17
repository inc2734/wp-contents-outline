<?php
/**
 * @package inc2734/wp-contents-outline
 * @author inc2734
 * @license GPL-2.0+
 */

/**
 * Display contents outline
 */
class Inc2734_WP_Contents_Outline {

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

		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ] );
	}

	/**
	 * Enqueue assets
	 *
	 * @return void
	 */
	public function _wp_enqueue_scripts() {
		$relative_path = '/inc2734/wp-contents-outline/src/assets/js/wp-contents-outline.js';
		$src  = get_theme_file_uri( '/vendor' . $relative_path );
		$path = get_theme_file_path( '/vendor' . $relative_path );

		if ( ! file_exists( $path ) ) {
			return;
		}

		wp_enqueue_script(
			'wp-contents-outline',
			$src,
			[ 'jquery' ],
			filemtime( $path ),
			false
		);
	}
}
