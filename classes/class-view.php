<?php
/**
 * TablePress Base View with members and methods for all views
 *
 * @package TablePress
 * @subpackage TablePress Base View
 * @author Tobias Bäthge
 * @since 1.0.0
 */

// Prohibit direct script loading
defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

/**
 * TablePress Base View class
 *
 * @since 1.0.0
 */
abstract class TablePress_View {

	/**
	 * @var array Data for the view
	 *
	 * @since 1.0.0
	 */
	protected $data = array();

	/**
	 * @var int Number of screen columns for post boxes
	 *
	 * @since 1.0.0
	 */
	protected $screen_columns = 0;

	/**
	 * @var string User action for this screen
	 *
	 * @since 1.0.0
	 */	
	protected $action = '';

	/**
	 * @var object Instance of the Admin Page Helper Class, with necessary functions
	 *
	 * @since 1.0.0
	 */	
	protected $admin_page;

	/**
	 * @var array List of text boxes (similar to post boxes, but just with text and without extra functionality)
	 *
	 * @since 1.0.0
	 */	
	protected $textboxes = array();

	/**
	 * @var List of messages that are to be displayed as boxes below the page title
	 *
	 * @since 1.0.0
	 */	
	protected $header_messages = array();

	/**
	 * @var bool Whether there are post boxes registered for this screen
	 *
	 * @since 1.0.0
	 */	
	protected $has_meta_boxes = false; // is automatically set to true, when a meta box is added

	/**
	 * Initialize the View class, by setting the correct screen columns and adding help texts 
	 *
	 * @since 1.0.0
	 */	
	public function __construct() {
		$screen = get_current_screen();
		if ( 0 != $this->screen_columns )
			$screen->add_option( 'layout_columns', array( 'max' => $this->screen_columns ) );
		add_filter( "get_user_option_screen_layout_{$screen->id}", array( &$this, 'set_current_screen_layout_columns' ) ); // enable two column layout

		// add help tab
		$screen->add_help_tab( array(
			'id' => 'tablepress-help', // This should be unique for the screen.
			'title' => __( 'TablePress Help', 'tablepress' ),
			'content' => '<p>' . $this->help_tab_content() . '</p>'
		) );
		// "sidebar" in the help tab
		$screen->set_help_sidebar( '<p><strong>' . __( 'For more information:', 'tablepress' ) . '</strong></p><p><a href="http://tobias.baethge.com/wordpress/plugins/tablepress/" target="_blank">TablePress Website</a></p><p><a href="http://tobias.baethge.com/wordpress/plugins/tablepress/faq/" target="_blank">TablePress FAQ</a></p><p><a href="http://tobias.baethge.com/wordpress/plugins/tablepress/documentation/" target="_blank">TablePress Documentation</a></p><p><a href="http://tobias.baethge.com/wordpress/plugins/tablepress/support/" target="_blank">TablePress Support</a></p>' );
	}

	/**
	 * Change the value of the user option "screen_layout_{$screen->id}" through a filter
	 *
	 * @since 1.0.0
	 *
	 * @param int|bool Current value of the user option
	 * @return int New value for the user option
	 */	
	public function set_current_screen_layout_columns( $result ) {
		if ( false === $result )
			// the user option does not yet exist
			$result = $this->screen_columns;
		elseif ( $result > $this->screen_columns )
			// the value of the user option is bigger than what is possible on this screen (e.g. because the number of columns was reduced in an update)
			$result = $this->screen_columns;
		return $result;
	}

	/**
	 * Set up the view with data and do things that are necessary for all views
	 *
	 * @since 1.0.0
	 *
	 * @param string $action Action for this view
	 * @param array $data Data for this view
	 */
	public function setup( $action, $data ) {
		$this->action = $action;
		$this->data = $data;

		// Set page <title>
		$GLOBALS['title'] = sprintf( __( '%s &lsaquo; TablePress', 'tablepress' ), $this->data['view_actions'][ $action ]['page_title'] );

		// admin page helpers, like script/style loading, could be moved to view
		$this->admin_page = TablePress::load_class( 'TablePress_Admin_Page', 'class-admin-page-helper.php', 'classes' );
		$this->admin_page->enqueue_style( 'common' );
		$this->admin_page->enqueue_script( 'common', array( 'jquery', 'postbox' ) );
		$this->admin_page->add_admin_footer_text();
		
		// necessary fields for all views
		$this->add_text_box( 'default_nonce_fields', array( &$this, 'default_nonce_fields' ), 'header', false );
		$this->add_text_box( 'action_nonce_field', array( &$this, 'action_nonce_field' ), 'header', false );
		$this->add_text_box( 'action_field', array( &$this, 'action_field' ), 'header', false );
	}

	/**
	 * Register a header message for the view
	 *
	 * @since 1.0.0
	 *
	 * @param string $text Text for the header message
	 * @param string $class (optional) Additional CSS class for the header message
	 */	
	public function add_header_message( $text, $class = 'updated' ) {
		$this->header_messages[] = "<div class=\"{$class}\"><p>{$text}</p></div>\n";
	}

	/**
	 * Register a text box for the view
	 *
	 * @since 1.0.0
	 *
	 * @param string $id Unique HTML ID for the text box container (only visible with $wrap = true)
	 * @param string $callback Callback that prints the contents of the text box
	 * @param string $context (optional) Context/position of the text box (normal, side, additional, header, submit)
	 * @param bool $wrap Whether the content of the text box shall be wrapped in a <div> container
	 */
	public function add_text_box( $id, $callback, $context = 'normal', $wrap = true ) {
		if ( ! isset( $this->textboxes[ $context ] ) )
			$this->textboxes[ $context ] = array();

		$long_id = "tablepress_{$this->action}-{$id}";
		$this->textboxes[ $context ][ $id ] = array(
			'id' => $long_id,
			'callback' => $callback,
			'context' => $context,
			'wrap' => $wrap
		);
	}

	/**
	 * Register a post meta box for the view, that is drag/droppable with WordPress functionality
	 *
	 * @since 1.0.0
	 * @uses add_meta_box()
	 *
	 * @param string $id Unique ID for the meta box
	 * @param string $title Title for the meta box
	 * @param string $callback Callback that prints the contents of the post meta box
	 * @param string $context (optional) Context/position of the post meta box (normal, side, additional)
	 * @param string $priority (optional) Order of the post meta box for the $context position (high, default, low) 
	 * @param bool $callback_args (optional) Additional data for the callback function (e.g. useful when in different class)
	 */
	public function add_meta_box( $id, $title, $callback, $context = 'normal', $priority = 'default', $callback_args = null ) {
		$this->has_meta_boxes = true;
		add_meta_box( "tablepress_{$this->action}-{$id}", $title, $callback, null, $context, $priority, $callback_args );
	}

	/**
	 * Render all text boxes for the given context
	 *
	 * @since 1.0.0
	 *
	 * @param string $context Context (normal, side, additional, header, submit) for which registered text boxes shall be rendered
	 */
	protected function do_text_boxes( $context ) {
		if ( empty( $this->textboxes[ $context ] ) )
			return;

		foreach ( $this->textboxes[ $context ] as $box ) {
			if ( $box['wrap'] )
				echo "<div id=\"{$box['id']}\" class=\"textbox\">\n";
			call_user_func( $box['callback'], $this->data, $box );
			if ( $box['wrap'] )
				echo "</div>\n";
		}
	}

	/**
	 * Render all post meta boxes for the given context, if there are post meta boxes
	 *
	 * @since 1.0.0
	 * @uses do_meta_boxes()
	 *
	 * @param string $context Context (normal, side, additional) for which registered post meta boxes shall be rendered#
	 */
	protected function do_meta_boxes( $context ) {
		if ( ! $this->has_meta_boxes )
			return;
		do_meta_boxes( null, $context, $this->data );
	}

	/**
	 * Print hidden fields with nonces for post meta box AJAX handling, if there are post meta boxes on the screen
	 * (check is possible as this function is executed after post meta boxes have to be registered)
	 *
	 * @since 1.0.0
	 * @uses wp_nonce_field()
	 *
	 * @param array $data Data for this screen
	 * @param array $box Information about the text box
	 */
	protected function default_nonce_fields( $data, $box ) {
		if ( ! $this->has_meta_boxes )
			return;
		wp_nonce_field( 'closedpostboxes', 'closedpostboxesnonce', false ); echo "\n";
		wp_nonce_field( 'meta-box-order', 'meta-box-order-nonce', false ); echo "\n";
	}

	/**
	 * Print hidden field with a nonce for the screen's action, to be transmitted in HTTP requests
	 *
	 * @since 1.0.0
	 * @uses wp_nonce_field()
	 *
	 * @param array $data Data for this screen
	 * @param array $box Information about the text box
	 */
	protected function action_nonce_field( $data, $box ) {
		wp_nonce_field( TablePress::nonce( $this->action ) ); echo "\n";
	}

	/**
	 * Print hidden field with the screen action
	 *
	 * @since 1.0.0
	 *
	 * @param array $data Data for this screen
	 * @param array $box Information about the text box
	 */
	protected function action_field( $data, $box ) {
		echo "<input type=\"hidden\" name=\"action\" value=\"tablepress_{$this->action}\" />\n";
	}

	/**
	 * Render the current view
	 *
	 * @since 1.0.0
	 */
	public function render() {
		?>
		<div id="tablepress-page" class="wrap">
		<?php screen_icon( 'tablepress' ); ?>
		<?php
			$this->print_nav_tab_menu();
			// print all header messages
			foreach ( $this->header_messages as $message ) {
				echo $message;
			}
		?>
		<form action="<?php echo admin_url( 'admin-post.php' ); ?>" method="post" enctype="multipart/form-data">
			<?php
			$this->do_text_boxes( 'header' );
			?>
			<div id="poststuff" class="metabox-holder<?php echo ( 2 == $GLOBALS['screen_layout_columns'] ) ? ' has-right-sidebar' : ''; ?>">
				<div id="side-info-column" class="inner-sidebar">
				<?php
					// print all boxes in the sidebar
					$this->do_text_boxes( 'side' );
					$this->do_meta_boxes( 'side' );
				?>
				</div>
				<div id="post-body">
					<div id="post-body-content">
					<?php
					$this->do_text_boxes( 'normal' );
					$this->do_meta_boxes( 'normal' );

					$this->do_text_boxes( 'additional' );
					$this->do_meta_boxes( 'additional' );

					// print all submit buttons
					$this->do_text_boxes( 'submit' );
					?>
					</div>
				</div>
				<br class="clear" />
			</div>
		</form>
		</div>
		<?php
	}

	/**
	 * Render the navigation menu with links to the possible actions, highlighting the current one,
	 *
	 * @since 1.0.0
	 */
	protected function print_nav_tab_menu() {
		?>
		<h2 id="tablepress-nav" class="nav-tab-wrapper">
			<?php
			echo __( 'TablePress', 'tablepress' ) . '<span class="separator"></span>';
			foreach ( $this->data['view_actions'] as $action => $entry ) {
				if ( '' == $entry['nav_tab_title'] )
					continue;
				if ( ! current_user_can( $entry['min_access_cap'] ) )
					continue;
				
				// special case: Add separators before "Plugin Options" for some spacing
				if ( 'options' == $action )
					echo '<span class="separator"></span><span class="separator"></span>';

				$url = esc_url( TablePress::url( array( 'action' => $action ) ) );
				$active = ( $action == $this->action ) ? ' nav-tab-active' : '';
				echo "<a class=\"nav-tab{$active}\" href=\"{$url}\">{$entry['nav_tab_title']}</a>";
			}
			?>
		</h2>
		<?php
	}

	/**
	 * Print a submit button (only done when function is used as a callback for a text box)
	 *
	 * @since 1.0.0
	 */
	protected function textbox_submit_button( $data, $box ) {
		$caption = isset( $data['submit_button_caption'] ) ? $data['submit_button_caption'] : __( 'Save Changes', 'tablepress' );
		?>
		<p class="submit"><input type="submit" value="<?php echo esc_attr( $caption ); ?>" class="button-primary" name="submit" /></p>
		<?php
	}

	/**
	 * Create HTML code for an AJAXified link
	 *
	 * @since 1.0.0
	 *
	 * @param array $params Parameters for the URL
	 * @param string $text Text for the link
	 * @return string HTML code for the link
	 */
	protected function ajax_link( $params = array( 'action' => 'list', 'item' => '' ), $text ) {
		$url = TablePress::url( $params, true, 'admin-post.php' );
		$action = esc_attr( $params['action'] );
		return "<a class=\"ajax-link {$action}\" href=\"{$url}\">{$text}</a>";
	}

	/**
	 * Return the content for the help tab for this screen
	 *
	 * Has to be implemented in every derived class of this base class!
	 *
	 * @since 1.0.0
	 */
	abstract protected function help_tab_content();
	
} // class TablePress_View