<?php

namespace Appbudget\Utils;

use PDO;

/**
 * Singleton to prevent from getting several PDO instance
 */
class Database {
    /** @var PDO */
    private $dbh;
    private static $_instance;
    private function __construct() {
        try {
            $config = parse_ini_file(__DIR__ . '/../config.ini',true);
            $pdoConnexionLink =  'mysql:host=' . $config['DB_HOST'] . ';dbname=' . $config['DB_NAME'] . ';charset=utf8';
            $this->dbh = new PDO(
                $pdoConnexionLink,
                $config['DB_USERNAME'],
                $config['DB_PASSWORD'],
                array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING)
            );
        }
        catch(Exception $exception) {
            die('Erreur de connexion...' . $exception->getMessage());
        }
    }
    
    /**
     * Create a new PDO instance if no instance exists
     * Return existing PDO instance if exists
     * @return void
     */
    public static function getPDO() {
        if (empty(self::$_instance)) {
            self::$_instance = new Database();
        }
        return self::$_instance->dbh;
    }
}