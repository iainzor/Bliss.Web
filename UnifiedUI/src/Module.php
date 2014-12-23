<?php
namespace UnifiedUI;

use Bliss\Module\AbstractModule,
	View\Partial\Partial,
	View\Decorator\PartialWrapper,
	View\Decorator\ProviderInterface as DecoratorProvider,
	View\Partial\InjectableTrait,
	View\Partial\InjectorInterface,
	View\Partial\InjectableInterface,
	Router\ProviderInterface as RouteProvider,
	Config\PublicConfigInterface;

class Module extends AbstractModule implements DecoratorProvider, InjectorInterface, InjectableInterface, RouteProvider, PublicConfigInterface
{
	use InjectableTrait;
	
	const AREA_HEADER_WIDGETS = "area.header.widgets";
	const AREA_MENU = "area.menu";
	
	public function initViewDecorator(\View\Decorator\Registry $registry) 
	{
		$partial = new Partial($this->resolvePath("layouts/main.phtml"), $this->app); 
		$registry->add(new PartialWrapper($partial));
	}
	
	public function compileInjectables() 
	{
		$this->app->log("Compiling injectables");
		
		foreach ($this->app->modules() as $module) {
			if ($module instanceof InjectorInterface) {
				$this->app->log("----Initializing injector for module '". $module->name() ."'");
				
				$module->initPartialInjector($this);
			}
		}
	}
	
	public function initPartialInjector(InjectableInterface $injectable) 
	{
		$injectable->inject(self::AREA_MENU, new Partial($this->resolvePath("layouts/partials/navigation.phtml")));
	}
	
	public function initRouter(\Router\Module $router) 
	{
		$router->when("/^((?:[a-z0-9-]\/?)+)?$/i", [], [
			"module" => $this->name(),
			"controller" => "view",
			"action" => "render"
		]);
	}
	
	public function publicConfig() 
	{
		return new \Config\Config([
			"theme" => [
				"className" => "theme-business-casual"
			]
		]);
	}
}