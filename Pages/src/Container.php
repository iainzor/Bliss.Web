<?php
namespace Pages;

class Container
{
	/**
	 * @var \Pages\Page[]
	 */
	protected $pages = [];
	
	/**
	 * Clear all pages in the container
	 */
	public function clear()
	{
		$this->pages = [];
	}
	
	/**
	 * Add one or more pages to the container
	 * The $pages argument can take either an single or multi-demensional array 
	 * with [name => value] pairs
	 * 
	 * @param array|Container $pages
	 * @return void
	 */
	public function add($pages)
	{
		if (empty($pages)) {
			return;
		}
		
		if ($pages instanceof self || $pages instanceof Page) {
			$pages = $pages->toArray();
		}
		
		$keys = array_keys($pages);
		if (!is_numeric($keys[0])) {
			$pages = [$pages];
		}
		
		foreach ($pages as $data) {
			$page  = Page::factory($data);
			$this->pages[] = $page;
		}
	}
	
	/**
	 * Convert the container into an array 
	 * 
	 * @return array
	 */
	public function toArray()
	{
		$data = [];
		foreach ($this->pages as $page) {
			$data[] = $page->toArray();
		}
		return $data;
	}
}