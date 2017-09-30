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

		add_shortcode( 'wp_contents_outline',[ $this, '_shortcode' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ] );
	}

	/**
	 * The view of shortcode
	 *
	 * @param array $attributes
	 *        @var string selector
	 *        @var int post_id
	 * @return void
	 */
	public function _shortcode( array $attributes = array() ) {
		if ( ! is_singular() ) {
			return;
		}

		$attributes = shortcode_atts( [
			'selector' => null,
			'post_id'  => get_the_ID(),
		], $attributes );

		if ( empty( $attributes['post_id'] ) ) {
			return;
		}

		$_post = get_post( $attributes['post_id'] );
		if ( ! $_post ) {
			return;
		}

		$post_id    = $_post->ID;
		$post_type  = $_post->post_type;
		$post_class = '.' . $post_type . '-' . $post_id;
		$wpco_id    = 'wpco-' . time();

		ob_start();
		?>
		<div class="wpco" aria-hidden="true" id="<?php echo esc_attr( $wpco_id ); ?>">
			<script>
			jQuery(function($) {
				$('#<?php echo esc_js( $wpco_id ); ?>').wpContentsOutline({
					headings: $('<?php echo esc_js( $post_class ); ?> <?php echo esc_js( $attributes['selector'] ); ?>').children('h2, h3, h4, h5, h6')
				});
			});
			</script>
			<h2 class="wpco__title"><?php esc_html_e( 'Outline', 'inc2734-wp-contents-outline' ); ?></h2>
			<div class="wpco__body"></div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Enqueue assets
	 *
	 * @return void
	 */
	public function _wp_enqueue_scripts() {
		wp_enqueue_script(
			'wp-contents-outline',
			home_url( str_replace( ABSPATH, '', __DIR__ ) . '/assets/js/wp-contents-outline.js' ),
			[ 'jquery' ],
			false,
			false
		);
	}
}
