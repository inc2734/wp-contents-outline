# WP Contents Outline

![CI](https://github.com/inc2734/wp-contents-outline/workflows/CI/badge.svg)
[![Latest Stable Version](https://poser.pugx.org/inc2734/wp-contents-outline/v/stable)](https://packagist.org/packages/inc2734/wp-contents-outline)
[![License](https://poser.pugx.org/inc2734/wp-contents-outline/license)](https://packagist.org/packages/inc2734/wp-contents-outline)

## Install
```
$ composer require inc2734/wp-contents-outline
```

## How to use
```
<?php
new \Inc2734\WP_Contents_Outline\Bootstrap();

// Set shortcode in post
// e.g. You want to contents outline from `$('.c-entry__content').children('h2, h3, h4, h5, h6')`
[wp_contents_outline title="(Optional)" post_id="(Optional)" selector=".c-entry__content" move_to_before_1st_heading="true"]
```

## Filter hooks

### inc2734_wp_contents_outline_enqueue_js
```
/**
 * If you don't need js enqueue, you can cancel enqueue.
 */
add_filter( 'inc2734_wp_contents_outline_enqueue_js', '__return_false' );
```

### inc2734_wp_contents_outline_args
```
/**
 * Customize args.
 *
 * @param array $attributes
 * @return array
 */
add_filter(
	'inc2734_wp_contents_outline_args',
	function( $attributes ) {
		return $attributes;
	}
);
```

### inc2734_wp_contents_outline_view_args
```
/**
 * @param array $args
 *  @var string $slug
 *  @var string $name
 *  @var array $vars
 * @param array
 */
add_filter(
	'inc2734_wp_contents_outline_view_args',
	function( $args ) {
		return $args;
	}
);
```

### inc2734_wp_contents_outline_view_render
```
/**
 * @param string $html
 * @param string $slug
 * @param string $name
 * @param array $vars
 * @return string
 */
add_filter(
	'inc2734_wp_contents_outline_view_render',
	function( $html, $slug, $name, $vars ) {
		return $html;
	},
	10,
	4
);
```

## Action hooks
```
/**
 * Add HTML before .wpco
 *
 * @param array $attributes
 * @return array
 */
add_action(
	'inc2734_wp_contents_outline_before',
	function( $attributes ) {
		?>
		HTML
		<?php
	}
);
```

### inc2734_wp_contents_outline_view_pre_render
```
/**
 * @param array $args
 *  @var string $slug
 *  @var string $name
 *  @var array $vars
 */
add_action(
	'inc2734_wp_contents_outline_view_pre_render',
	function( $args ) {
	}
);
```

### inc2734_wp_contents_outline_view_post_render
```
/**
 * @param array $args
 *  @var string $slug
 *  @var string $name
 *  @var array $vars
 */
add_action(
	'inc2734_wp_contents_outline_view_post_render',
	function( $args ) {
	}
);
```

### inc2734_wp_contents_outline_view_&lt;slug&gt;
```
/**
 * @param string $name
 * @param array $vars
 */
add_action(
	'inc2734_wp_contents_outline_view_<slug>',
	function( $name, $vars ) {
		?>
		HTML
		<?php
	},
	10,
	2
);
```

### inc2734_wp_contents_outline_view_&lt;slug&gt;-&lt;name&gt;
```
/**
 * @param array $vars
 */
add_action(
	'inc2734_wp_contents_outline_view_<slug>-<name>',
	function( $vars ) {
		?>
		HTML
		<?php
	}
);
```
