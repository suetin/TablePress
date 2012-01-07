<?php
/**
 * Admin Page Helper Class for TablePress with functions needed in the admin area
 *
 * @package TablePress
 * @subpackage Admin Page Helper
 * @author Tobias Bäthge
 * @since 1.0.0
 */

// Prohibit direct script loading
defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

/**
 * Admin Page class
 *
 * @since 1.0.0
 */
class TablePress_Admin_Page {

	/**
	 * Enqueue a CSS file
	 *
	 * @since 1.0.0
	 *
	 * @param string $name Name of the CSS file, without extension(s)
	 */
	public function enqueue_style( $name ) {
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '.dev' : '';
		$css_file = "admin/{$name}{$suffix}.css";
		$css_url = plugins_url( $css_file, TABLEPRESS__FILE__ );
		wp_enqueue_style( "tablepress-{$name}", $css_url, array(), TablePress::version );
	}

	/**
	 * Enqueue a JavaScript file, possibility with dependencies and extra information
	 *
	 * @since 1.0.0
	 *
	 * @param string $name Name of the JS file, without extension(s)
	 * @param array $dependencies List of names of JS scripts that this script depends on, and which need to be included before this one
	 * @param bool|array $localize_script (optional) An array with strings that gets transformed into a JS object and is added to the page before the script is included
	 */
	public function enqueue_script( $name, $dependencies, $localize_script = false ) {
		$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '.dev' : '';
		$js_file = "admin/{$name}{$suffix}.js";
		$js_url = plugins_url( $js_file, TABLEPRESS__FILE__ );
		wp_enqueue_script( "tablepress-{$name}", $js_url, $dependencies, TablePress::version, true );
		if ( $localize_script )
			wp_localize_script( "tablepress-{$name}", "tablepress_{$name}", $localize_script );
	}

	/**
	 * Register a filter hook on the admin footer
	 *
	 * @since 1.0.0
	 */
	public function add_admin_footer_text() {
		// show admin footer message (only on pages of TablePress)
		add_filter( 'admin_footer_text', array( &$this, '_admin_footer_text' ) );
	}

	/**
	 * Add a TablePress "Thank You" message to the admin footer content
	 *
	 * @since 1.0.0
	 *
	 * @param string $content Current admin footer content
	 * @return string New admin footer content
	 */
	public function _admin_footer_text( $content ) {
		$content .= ' &bull; ' . __( 'Thank you for using <a href="http://tobias.baethge.com/wordpress/plugins/tablepress/">TablePress</a>.', 'tablepress' );
		$content .= ' ' . sprintf( __( 'Support the plugin with your <a href="%s">donation</a>!', 'tablepress' ), 'http://tobias.baethge.com/donate-message/' );
		return $content;
	}

} // class TablePress_Admin_Page