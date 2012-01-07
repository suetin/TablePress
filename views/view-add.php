<?php
/**
 * Add Table View
 *
 * @package TablePress
 * @subpackage Add Table View
 * @author Tobias Bäthge
 * @since 1.0.0
 */

// Prohibit direct script loading
defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

/**
 * Add Table View class
 *
 * @since 1.0.0
 */
class TablePress_Add_View extends TablePress_View {

	/**
	 * Set up the view with data and do things that are specific for this view
	 *
	 * @since 1.0.0
	 *
	 * @param string $action Action for this view
	 * @param array $data Data for this view
	 */
	public function setup( $action, $data ) {
		parent::setup( $action, $data );

		//$this->admin_page->enqueue_script( 'add', array( 'jquery' ) );

		$this->add_meta_box( 'table-information', __( 'Table Information', 'tablepress' ), array( &$this, 'postbox_table_information' ), 'normal' );
		$this->add_text_box( 'head', array( &$this, 'textbox_head' ), 'normal' );
	}

	/**
	 *
	 *
	 * @since 1.0.0
	 */
	public function postbox_table_information( $data, $box ) {
		_e( 'Table Information:', 'tablepress' );
	}

	/**
	 *
	 *
	 * @since 1.0.0
	 */
	public function textbox_head( $data, $box ) {
		?>
		<p><?php _e( 'head text box', 'tablepress' ); ?></p>
		<p><?php echo $this->action; ?></p>
		<?php
	}

	/**
	 * Return the content for the help tab for this screen
	 *
	 * @since 1.0.0
	 */
	protected function help_tab_content() {
		return 'Help for the Add new Table screen';
	}

} // class TablePress_Add_View