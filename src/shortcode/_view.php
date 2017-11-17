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

<div class="wpco" aria-hidden="true" id="<?php echo esc_attr( $wpco_id ); ?>">
	<?php
	$move_to = 'true';
	if ( isset( $attributes['move_to_before_1st_heading'] ) && 'false' === $attributes['move_to_before_1st_heading'] ) {
		$move_to = 'false';
	}
	?>
	<script>
	jQuery(function($) {
		$('#<?php echo esc_js( $wpco_id ); ?>').wpContentsOutline({
			headings: $('<?php echo esc_js( $post_class ); ?> <?php echo esc_js( $attributes['selector'] ); ?>').children('<?php echo esc_js( $attributes['headings'] ); ?>'),
			moveToBefore1stHeading: <?php echo esc_js( $move_to ); ?>
		});
	});
	</script>
	<h2 class="wpco__title"><?php esc_html_e( 'Outline', 'inc2734-wp-contents-outline' ); ?></h2>
	<div class="wpco__body"></div>
</div>
