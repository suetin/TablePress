<?php
/**
 * CSSTidy Printing PHP Class
 *
 * @package TablePress
 * @subpackage CSS
 * @author Florian Schmitz, Brett Zamir, Nikolay Matsievsky, Cedric Morin, Christopher Finke, Mark Scherer, Tobias Bäthge
 * @since 1.0.0
 */

// Prohibit direct script loading.
defined( 'ABSPATH' ) || die( 'No direct script access allowed!' );

/**
 * CSSTidy - CSS Parser and Optimiser
 *
 * CSS Printing class
 * This class prints CSS data generated by CSSTidy.
 *
 * Copyright 2005, 2006, 2007 Florian Schmitz
 *
 * This file is part of CSSTidy.
 *
 *  CSSTidy is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation; either version 2.1 of the License, or
 *  (at your option) any later version.
 *
 *  CSSTidy is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @license https://opensource.org/licenses/lgpl-license.php GNU Lesser General Public License
 * @package CSSTidy
 * @author Florian Schmitz (floele at gmail dot com) 2005-2007
 * @author Brett Zamir (brettz9 at yahoo dot com) 2007
 * @author Cedric Morin (cedric at yterium dot com) 2010-2012
 */

/**
 * CSS Printing class
 *
 * This class prints CSS data generated by CSSTidy.
 *
 * @package CSSTidy
 * @author Florian Schmitz (floele at gmail dot com) 2005-2006
 * @version 1.1.0
 */
class TablePress_CSSTidy_print {

	/**
	 * TablePress_CSSTidy instance.
	 *
	 * @since 1.0.0
	 * @var TablePress_CSSTidy
	 */
	public $parser;

	/**
	 * The parsed CSS.
	 *
	 * @since 1.0.0
	 * @var array
	 */
	public $css = array();

	/**
	 * The output templates.
	 *
	 * @since 1.0.0
	 * @var array
	 */
	public $template = array();

	/**
	 * The raw parsed CSS.
	 *
	 * @since 1.0.0
	 * @var array
	 */
	public $tokens = array();

	/**
	 * The CSS charset.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public $charset = '';

	/**
	 * All @import URLs.
	 *
	 * @since 1.0.0
	 * @var array
	 */
	public $import = array();

	/**
	 * The namespace.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public $namespace = '';

	/**
	 * Saves the input CSS string.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public $input_css = '';

	/**
	 * Saves the formatted CSS string.
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public $output_css = '';

	/**
	 * Saves the formatted CSS string (plain text).
	 *
	 * @since 1.0.0
	 * @var string
	 */
	public $output_css_plain = '';

	/**
	 * Constructor.
	 *
	 * @since 1.0
	 *
	 * @param TablePress_CSSTidy $css Instance of the TablePress_CSSTidy class.
	 */
	public function __construct( $css ) {
		$this->parser = $css;
		$this->css = &$css->css;
		$this->template = &$css->template;
		$this->tokens = &$css->tokens;
		$this->charset = &$css->charset;
		$this->import = &$css->import;
		$this->namespace = &$css->namespace;
	}

	/**
	 * Resets output_css and output_css_plain (new css code).
	 *
	 * @since 1.0
	 */
	public function _reset() {
		$this->output_css = '';
		$this->output_css_plain = '';
	}

	/**
	 * Returns the CSS code as plain text.
	 *
	 * @since 1.0
	 *
	 * @param string $default_media Optional. Default @media to add to selectors without any @media.
	 * @return string Plain CSS.
	 */
	public function plain( $default_media = '' ) {
		$this->_print( true, $default_media );
		return $this->output_css_plain;
	}

	/**
	 * Returns the formatted CSS code.
	 *
	 * @since 1.0
	 *
	 * @param string $default_media Optional. Default @media to add to selectors without any @media.
	 * @return string Formatted CSS.
	 */
	public function formatted( $default_media = '' ) {
		$this->_print( false, $default_media );
		return $this->output_css;
	}

	/**
	 * Returns the formatted CSS code to make a complete webpage.
	 *
	 * @since 1.4
	 *
	 * @param string  $doctype     Optional. Shorthand for the document type.
	 * @param bool    $externalcss Optional. Indicates whether styles to be attached internally or as an external stylesheet.
	 * @param string  $title       Optional. Title to be added in the head of the document.
	 * @param string  $lang        Optional. Two-letter language code to be added to the output.
	 * @return string Formatted CSS for a full page.
	 */
	public function formatted_page( $doctype = 'html5', $externalcss = true, $title = '', $lang = 'en' ) {
		switch ( $doctype ) {
			case 'html5':
				$doctype_output = '<!DOCTYPE html>';
				break;
			case 'xhtml1.0strict':
				$doctype_output = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
				break;
			case 'xhtml1.1':
			default:
				$doctype_output = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">';
				break;
		}

		$output = '';
		$this->output_css_plain = &$output;

		$output .= $doctype_output . "\n" . '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="' . $lang . '"';
		$output .= ( 'xhtml1.1' === $doctype ) ? '>' : ' lang="' . $lang . '">';
		$output .= "\n<head>\n\t<title>{$title}</title>";

		if ( $externalcss ) {
			$output .= "\n\t<style type=\"text/css\">\n";
			$output .= file_get_contents( 'cssparsed.css' ); // Adds an invisible BOM or something, but not in css_optimised.php
			$output .= "\n</style>";
		} else {
			$output .= "\n" . '<link rel="stylesheet" type="text/css" href="cssparsed.css" />';
		}
		$output .= "\n</head>\n<body><code id=\"copytext\">";
		$output .= $this->formatted();
		$output .= '</code>' . "\n" . '</body></html>';
		return $this->output_css_plain;
	}

	/**
	 * Returns the formatted CSS Code and saves it into $this->output_css and $this->output_css_plain.
	 *
	 * @since 2.0
	 *
	 * @param bool   $plain         Optional. Plain text or not.
	 * @param string $default_media Optional. Default @media to add to selectors without any @media.
	 */
	protected function _print( $plain = false, $default_media = '' ) {
		if ( $this->output_css && $this->output_css_plain ) {
			return;
		}

		$output = '';
		if ( ! $this->parser->get_cfg( 'preserve_css' ) ) {
			$this->_convert_raw_css( $default_media );
		}

		$template = &$this->template;

		if ( $plain ) {
			$template = array_map( 'strip_tags', $template );
		}

		if ( $this->parser->get_cfg( 'timestamp' ) ) {
			array_unshift( $this->tokens, array( COMMENT, ' CSSTidy ' . $this->parser->version . ': ' . date( 'r' ) . ' ' ) );
		}

		if ( ! empty( $this->charset ) ) {
			$output .= $template[0] . '@charset ' . $template[5] . $this->charset . $template[6] . $template[13];
		}

		if ( ! empty( $this->import ) ) {
			for ( $i = 0, $size = count( $this->import ); $i < $size; $i++ ) {
				$import_components = explode( ' ', $this->import[ $i ] );
				if ( 'url(' === substr( $import_components[0], 0, 4 ) && ')' === substr( $import_components[0], -1, 1 ) ) {
					$import_components[0] = '\'' . trim( substr( $import_components[0], 4, -1 ), "'\"" ) . '\'';
					$this->import[ $i ] = implode( ' ', $import_components );
					$this->parser->log( 'Optimised @import : Removed "url("', 'Information' );
				} elseif ( ! preg_match( '/^".+"$/', $this->import[ $i ] ) ) {
					// Fixes a bug for @import ".." instead of the expected @import url("..")/
					// If it comes in due to @import ".." the "" will be missing and the output will become @import .. (which is an error)/
					$this->import[ $i ] = '"' . $this->import[ $i ] . '"';
				}
				$output .= $template[0] . '@import ' . $template[5] . $this->import[ $i ] . $template[6] . $template[13];
			}
		}

		if ( ! empty( $this->namespace ) ) {
			if ( false !== ( $p = strpos( $this->namespace, 'url(' ) ) && ')' === substr( $this->namespace, -1, 1 ) ) {
				$this->namespace = substr_replace( $this->namespace, '"', $p, 4 );
				$this->namespace = substr( $this->namespace, 0, -1 ) . '"';
				$this->parser->log( 'Optimised @namespace : Removed "url("', 'Information' );
			}
			$output .= $template[0] . '@namespace ' . $template[5] . $this->namespace . $template[6] . $template[13];
		}

		$in_at_out = array();
		$out = &$output;
		$indent_level = 0;

		foreach ( $this->tokens as $key => $token ) {
			switch ( $token[0] ) {
				case AT_START:
					if ( $this->parser->get_cfg( 'preserve_css' ) ) {
						$token[1] = str_replace( ',', ",\n", $token[1] );
					}
					$out .= $template[0] . $this->_htmlsp( $token[1], $plain ) . $template[1];
					$indent_level++;
					if ( ! isset( $in_at_out[ $indent_level ] ) ) {
						$in_at_out[ $indent_level ] = '';
					}
					$out = &$in_at_out[ $indent_level ];
					break;
				case SEL_START:
					if ( $this->parser->get_cfg( 'lowercase_s' ) ) {
						$token[1] = strtolower( $token[1] );
					}
					if ( $this->parser->get_cfg( 'preserve_css' ) ) {
						$token[1] = str_replace( ',', ",\n", $token[1] );
					}
					$out .= ( '@' !== $token[1][0] ) ? $template[2] . $this->_htmlsp( $token[1], $plain ) : $template[0] . $this->_htmlsp( $token[1], $plain );
					$out .= $template[3];
					break;
				case PROPERTY:
					if ( 2 === $this->parser->get_cfg( 'case_properties' ) ) {
						$token[1] = strtoupper( $token[1] );
					} elseif ( 1 === $this->parser->get_cfg( 'case_properties' ) ) {
						$token[1] = strtolower( $token[1] );
					}
					$out .= $template[4] . $this->_htmlsp( $token[1], $plain ) . ':' . $template[5];
					break;
				case VALUE:
					$out .= $this->_htmlsp( $token[1], $plain );
					if ( SEL_END === $this->_seeknocomment( $key, 1 ) && $this->parser->get_cfg( 'remove_last_;' ) ) {
						$out .= str_replace( ';', '', $template[6] );
					} else {
						$out .= $template[6];
					}
					if ( $this->parser->get_cfg( 'preserve_css' ) ) {
						$out .= ( COMMENT === $this->tokens[ $key + 1 ][0] ) ? ' ' : "\n";
					}
					break;
				case SEL_END:
					$out .= $template[7];
					if ( AT_END !== $this->_seeknocomment( $key, 1 ) ) {
						$out .= $template[8];
					}
					break;
				case AT_END:
					if ( strlen( $template[10] ) ) {
						// Indent the block we are closing.
						$out = str_replace( "\n\n", "\r\n", $out ); // Don't fill empty lines.
						$out = str_replace( "\n", "\n" . $template[10], $out );
						$out = str_replace( "\r\n", "\n\n", $out );
					}
					if ( $indent_level > 1 ) {
						$out = &$in_at_out[ $indent_level - 1 ];
					} else {
						$out = &$output;
					}
					$out .= $template[10] . $in_at_out[ $indent_level ];
					if ( AT_END !== $this->_seeknocomment( $key, 1 ) ) {
						$out .= $template[9];
					} else {
						$out .= rtrim( $template[9] );
					}
					unset( $in_at_out[ $indent_level ] );
					$indent_level--;
					break;
				case IMPORTANT_COMMENT:
				case COMMENT:
					$out .= $template[11] . '/*' . $this->_htmlsp( $token[1], $plain ) . '*/' . $template[12];
					break;
			}
		}

		if ( ! $this->parser->get_cfg( 'preserve_css' ) ) {
			$output = str_replace( ' !important', '!important', $output );
		}

		$output = trim( $output );

		if ( ! $plain ) {
			$this->output_css = $output;
			$this->_print( true );
		} else {
			// If using spaces in the template, don't want these to appear in the plain output.
			$this->output_css_plain = str_replace( '&#160;', '', $output );
		}
	}

	/**
	 * Gets the next token type which is $move away from $key, excluding comments.
	 *
	 * @since 1.0
	 *
	 * @param int $key  Current position.
	 * @param int $move Move this far.
	 * @return mixed A token type.
	 */
	protected function _seeknocomment( $key, $move ) {
		$go = ( $move > 0 ) ? 1 : -1;
		for ( $i = $key + 1; abs( $key - $i ) - 1 < abs( $move ); $i += $go ) {
			if ( ! isset( $this->tokens[ $i ] ) ) {
				return;
			}
			if ( COMMENT === $this->tokens[ $i ][0] ) {
				$move += 1;
				continue;
			}
			return $this->tokens[ $i ][0];
		}
	}

	/**
	 * Converts $this->css array to a raw array ($this->tokens).
	 *
	 * @since 1.0.0
	 *
	 * @param string $default_media Optional. Default @media to add to selectors without any @media.
	 */
	protected function _convert_raw_css( $default_media = '' ) {
		$this->tokens = array();
		$sort_selectors = $this->parser->get_cfg( 'sort_selectors' );
		$sort_properties = $this->parser->get_cfg( 'sort_properties' );

		// Important comment section?
		if ( isset( $this->css['!'] ) ) {
			$this->parser->_add_token( IMPORTANT_COMMENT, rtrim( $this->css['!'] ), true );
			unset( $this->css['!'] );
		}

		foreach ( $this->css as $medium => $val ) {
			if ( $sort_selectors ) {
				ksort( $val );
			}
			if ( (int) $medium < DEFAULT_AT ) {
				// un medium vide (contenant @font-face ou autre @) ne produit aucun conteneur
				if ( strlen( trim( $medium ) ) ) {
					$parts_to_open = explode( '{', $medium );
					foreach ( $parts_to_open as $part ) {
						$this->parser->_add_token( AT_START, $part, true );
					}
				}
			} elseif ( $default_media ) {
				$this->parser->_add_token( AT_START, $default_media, true );
			}

			foreach ( $val as $selector => $vali ) {
				if ( $sort_properties ) {
					ksort( $vali );
				}
				$this->parser->_add_token( SEL_START, $selector, true );

				$invalid = array(
					'*' => array(), // IE7 hacks first
					'_' => array(), // IE6 hacks
					'/' => array(), // IE6 hacks
					'-' => array(), // IE6 hacks
				);
				foreach ( $vali as $property => $valj ) {
					if ( 0 !== strncmp( $property, '//', 2 ) ) {
						$matches = array();
						if ( $sort_properties && preg_match( '/^(\*|_|\/|-)(?!(ms|moz|o\b|xv|atsc|wap|khtml|webkit|ah|hp|ro|rim|tc)-)/', $property, $matches ) ) {
							$invalid[ $matches[1] ][ $property ] = $valj;
						} else {
							$this->parser->_add_token( PROPERTY, $property, true );
							$this->parser->_add_token( VALUE, $valj, true );
						}
					}
				}
				foreach ( $invalid as $prefix => $props ) {
					foreach ( $props as $property => $valj ) {
						$this->parser->_add_token( PROPERTY, $property, true );
						$this->parser->_add_token( VALUE, $valj, true );
					}
				}
				$this->parser->_add_token( SEL_END, $selector, true );
			}

			if ( (int) $medium < DEFAULT_AT ) {
				// un medium vide (contenant @font-face ou autre @) ne produit aucun conteneur
				if ( strlen( trim( $medium ) ) ) {
					$parts_to_close = explode( '{', $medium );
					foreach ( array_reverse( $parts_to_close ) as $part ) {
						$this->parser->_add_token( AT_END, $part, true );
					}
				}
			} elseif ( $default_media ) {
				$this->parser->_add_token( AT_END, $default_media, true );
			}
		}
	}

	/**
	 * Same as htmlspecialchars, only that chars are not replaced if $plain is true. This makes print_code() cleaner.
	 *
	 * @since 1.0
	 *
	 * @see CSSTidy_print::_print()
	 *
	 * @param string $string String.
	 * @param bool   $plain  Print plain?
	 * @return string [return value]
	 */
	protected function _htmlsp( $string, $plain ) {
		if ( ! $plain ) {
			return htmlspecialchars( $string, ENT_QUOTES, 'utf-8' );
		}
		return $string;
	}

	/**
	 * Get compression ratio.
	 *
	 * @since 1.2
	 *
	 * @return double Compression ratio.
	 */
	public function get_ratio() {
		if ( ! $this->output_css_plain ) {
			$this->formatted();
		}
		return round( ( strlen( $this->input_css ) - strlen( $this->output_css_plain ) ) / strlen( $this->input_css ), 3 ) * 100;
	}

	/**
	 * Get difference between the old and new code in bytes and prints the code if necessary.
	 *
	 * @since 1.1
	 *
	 * @return string Size difference.
	 */
	public function get_diff() {
		if ( ! $this->output_css_plain ) {
			$this->formatted();
		}

		$diff = strlen( $this->output_css_plain ) - strlen( $this->input_css );

		if ( $diff > 0 ) {
			return '+' . $diff;
		} elseif ( 0 === $diff ) {
			return '+-' . $diff;
		}

		return $diff;
	}

	/**
	 * Get the size of either input or output CSS in kilobytes (KB).
	 *
	 * @since 1.0
	 *
	 * @param string $loc Optional. Location of the CSS.
	 * @return int Size of the CSS.
	 */
	public function size( $loc = 'output' ) {
		if ( 'output' === $loc && ! $this->output_css ) {
			$this->formatted();
		}

		if ( 'input' === $loc ) {
			return strlen( $this->input_css ) / 1000;
		} else {
			return strlen( $this->output_css_plain ) / 1000;
		}
	}

} // class TablePress_CSSTidy_print
