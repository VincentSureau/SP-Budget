<?php

namespace Appbudget\Controllers;

use Appbudget\Utils\User;
use Appbudget\Application;
use League\Plates\Engine as Plates;

abstract class CoreController {

    protected $templateEngine;

    protected $basePath;

    public $router;

    public function __construct(Application $application) {
        $config = $application->getConfig();
        $this->router = $application->getRouter();
        $this->basePath = $config['BASE_PATH'];

        // instantiate Template Engine and set app/Views as template folder
        $this->templateEngine = new Plates(__DIR__ .'/../Views');

        // add default variables to all templates
        $this->templateEngine->addData(
            [
                // used to create dynamic navigation
                'router' => $this->router,
                'basePath' => $config['BASE_PATH'],
                'connectedUser' => User::getConnectedUser(),
                'isConnected' => User::isConnected(),
            ]
        );
    }

    /**
     * render a template in a views directory
     *
     * @param String $templateName
     * @param array $dataToView
     * @return void
     */
    public function render(String $templateName, Array $dataToView=[]){
        echo $this->templateEngine->render($templateName, $dataToView);
    }

    /**
     * user to show an error for not authicated users tryng to acces limited pages
     *
     * @return void
     */
    public function forbidden() {
        header("HTTP/1.0 403 Forbidden");
        $this->show('main/forbidden');
    }

    /**
     * use to send Json data for Ajax Request
     *
     * @param Array $data
     * @return void
     */
    public static function sendJson(Array $data){
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
  

    /**
     * Get the value of basePath
     */ 
    public function getBasePath()
    {
        return $this->basePath;
    }
}