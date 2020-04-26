<?php

Namespace Appbudget;

use AltoRouter;
use Appbudget\Utils\User;
use Appbudget\Models\UserModel;

class Application {

  private $router;

  private $config;

  public function __construct() {
    $this->router = new AltoRouter();

    $config = parse_ini_file(__DIR__ . '/config.ini',true);

	$this->config = $config;
    $this->router->setBasePath($config['BASE_PATH']);

    $this->defineRoutes();
  }

  /**
   * Define all application routes
   *
   * @return void
   */
	public function defineRoutes() {
		$this->router->map('GET', '/', 'MainController#home', 'main_home');
		$this->router->map('GET', '/mes-operations', 'MainController#operations', 'main_operations');
		$this->router->map('GET|POST', '/ajouter-une-operation', 'OperationController#add', 'operation_add');
		$this->router->map('POST', '/add-operation-ajax', 'OperationController#ajaxAdd', 'operation_add_ajax');
		$this->router->map('GET|POST', '/connexion', 'UserController#login', 'user_login');
		$this->router->map('GET', '/logout', 'UserController#logout', 'user_logout');
	}

	public function run() {
		$user = new UserModel();
        $user
            ->setId(1)
            ->setFirstName("Vincent")
            ->setLastName("Sureau")
            ->setEmail("vincentsureau5@gmail.com")
		;
		User::connect($user);

		$match =  $this->router->match();
		if ($match) {
			list($controllerName, $methodName) = explode('#', $match['target']);
			$controllerName = 'Appbudget\Controllers\\'. $controllerName;
			$controller = new $controllerName($this);
			$controller->$methodName($match['params']);
		} else {
			$controller = new Controllers\MainController($this);
			$controller->page404();
		}
  }

	/**
	 * Get the value of router
	 */ 
	public function getRouter()
	{
		return $this->router;
	}

	/**
	 * Set the value of router
	 *
	 * @return  self
	 */ 
	public function setRouter($router)
	{
		$this->router = $router;

		return $this;
	}

	/**
	 * Get the value of config
	 */ 
	public function getConfig()
	{
		return $this->config;
	}

	/**
	 * Set the value of config
	 *
	 * @return  self
	 */ 
	public function setConfig($config)
	{
		$this->config = $config;

		return $this;
	}
}