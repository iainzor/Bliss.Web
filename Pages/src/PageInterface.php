<?php
namespace Pages;

use Config\PublicConfigInterface;

interface PageInterface
{
	/**
	 * @param string $title
	 * @return string
	 */
	public function title($title = null);
	
	/**
	 * @param string $path
	 * @return string
	 */
	public function path($path = null);
	
	/**
	 * @param array $pages
	 * @param boolean $merge
	 * @return \Pages\PageInterface
	 */
	public function pages(array $pages = null, $merge = false);
}