<?php

namespace Appbudget\Controllers;

use Appbudget\Application;
use League\Plates\Engine as Plates;

abstract class CoreController {

    protected $templateEngine;

    public function __construct(Application $application) {
        $config = $application->getConfig();

        // instantiate Template Engine and set app/Views as template folder
        $this->templateEngine = new Plates(__DIR__ .'/../Views');

        // add default variables to all templates
        $this->templateEngine->addData(
            [
                // may be used later to create dynamic navigation
                'basePath' => $config['BASE_PATH'],
                // will be dynamic later on the project
                'isConnected' => true,
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
  
}