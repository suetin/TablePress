<?php

namespace TablePress\PhpOffice\PhpSpreadsheet\Reader\Ods;

use DOMElement;
use TablePress\PhpOffice\PhpSpreadsheet\Spreadsheet;

abstract class BaseLoader
{
	/**
	 * @var \TablePress\PhpOffice\PhpSpreadsheet\Spreadsheet
	 */
	protected $spreadsheet;

	/**
	 * @var string
	 */
	protected $tableNs;

	public function __construct(Spreadsheet $spreadsheet, string $tableNs)
	{
		$this->spreadsheet = $spreadsheet;
		$this->tableNs = $tableNs;
	}

	abstract public function read(DOMElement $workbookData): void;
}
