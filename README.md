# WP Contents Outline

[![Build Status](https://travis-ci.org/inc2734/wp-contents-outline.svg?branch=master)](https://travis-ci.org/inc2734/wp-contents-outline)
[![Latest Stable Version](https://poser.pugx.org/inc2734/wp-contents-outline/v/stable)](https://packagist.org/packages/inc2734/wp-contents-outline)
[![License](https://poser.pugx.org/inc2734/wp-contents-outline/license)](https://packagist.org/packages/inc2734/wp-contents-outline)

## Install
```
$ composer require inc2734/wp-contents-outline
```

## How to use
```
<?php
// When Using composer auto loader
require_once( get_theme_file_path( '/vendor/autoload.php' ) );
new Inc2734\WP_Contents_Outline\Contents_Outline();

// When not Using composer auto loader
// include_once( get_theme_file_path( '/vendor/inc2734/wp-contents-outline/src/wp-contents-outline.php' ) );
// new Inc2734_WP_Contents_Outline();

// Set shortcode in post
// e.g. You want to contents outline from `$('.c-entry__content').children('h2, h3, h4, h5, h6')`
[wp_contents_outline post_id="(Optional)" selector=".c-entry__content" move_to_before_1st_heading="true"]
```
