<?php
/*
Plugin Name: Widgets Area Chooser
Plugin URI: http://shaunandrews.com/wordpress/wp-widget-area-chooser/
Description: No more reliance on drag-and-drop for placing new widgets into sidebars.
Version: 0.4
Author: Shaun Andrews
Author URI: http://automattic.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// Enqueue some new styles and drop in a few lines of js
add_action( 'admin_print_styles', 'wac_add_style' );
function wac_add_style() {
	wp_enqueue_style( 'wp-widget-area-chooser', plugins_url( 'style.css', __FILE__ ) );
}

add_action( 'admin_enqueue_scripts', 'wac_add_scripts' );
function wac_add_scripts() {
	wp_enqueue_script( 'jquery-effects-highlight' );
	wp_enqueue_script( 'wp-widget-area-chooser', plugins_url( 'scripts.js', __FILE__ ), array( 'jquery' ) );
}