<?php
namespace Pages;

use Bliss\Module\AbstractModule,
	Config\Config,
	Config\PublicConfigInterface;

class Module extends AbstractModule implements PublicConfigInterface
{
	public function publicConfig() {
		return new Config([
			[
				"title" => "Home",
				"path" => "",
			], [
				"title" => "Documentation",
				"path" => "docs"
			], [
				"title" => "People",
				"path" => "people",
				"pages" => [
					[
						"title" => "My Friends",
						"path" => "people/friends"
					], [
						"match" => "^/person/(.*)$",
						"pages" => [
							[
								"title" => "{{person.displayName}}",
								"path" => "./{{person.path}}"
							], [
								"title" => "Activity Feed",
								"path" => "./{{person.path}}/feed"
							]
						]
					]
				]
			]
		]);
	}
}