<?php
/**
 * TablePress Base Model with members and methods for all models
 *
 * @package TablePress
 * @subpackage TablePress Base Model
 * @author Tobias Bäthge
 * @since 1.0.0
 */

// Prohibit direct script loading
defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

/**
 * TablePress Base Model class
 *
 * @since 1.0.0
 */
abstract class TablePress_Model {

	/**
	 * Initialize all models
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// intentionally left blank
	}

} // class TablePress_Model