<?php
/**
 * @package inc2734/wp-contents-outline
 * @author inc2734
 * @license GPL-2.0+
 */

if ( empty( $attributes['headings'] ) ) {
	return;
}
?>

<div
	class="wpco-wrapper <?php echo esc_attr( $wpco_class ); ?>"
	aria-hidden="true"
	id="<?php echo esc_attr( $wpco_id ); ?>"
	data-wpco-post-class="<?php echo esc_attr( $post_class ); ?>"
	data-wpco-selector="<?php echo esc_attr( $attributes['selector'] ); ?>"
	data-wpco-headings="<?php echo esc_attr( $attributes['headings'] ); ?>"
	data-wpco-move="<?php echo esc_attr( $attributes['move_to_before_1st_heading'] ); ?>"
	>
	<?php
	do_action( 'inc2734_wp_contents_outline_before', $attributes );
	?>

	<div class="wpco">
		<?php if ( $attributes['title'] ) : ?>
			<h2 class="wpco__title"><?php echo esc_html( $attributes['title'] ); ?></h2>
		<?php endif; ?>

		<div class="contents-outline"></div>
	</div>
</div>
