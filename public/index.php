<?php
// require autoloader
require __DIR__ . DIRECTORY_SEPARATOR . '..'. DIRECTORY_SEPARATOR .'vendor' . DIRECTORY_SEPARATOR .'autoload.php';

// start server session
session_start();

use Appbudget\Application;
use Symfony\Component\VarDumper\VarDumper;


$dumper = new VarDumper();

// require and instanciate application
$app = new Application();
$app->run();

// $app->run();